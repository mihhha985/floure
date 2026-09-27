import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalog } from './entities/catalog.entity';
import { Parametrs } from './entities/parametrs.entity';
import { Category } from '../category/entities/category.entity';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { randomUUID } from 'crypto';
import { extname, resolve } from 'path';
import { promises as fs } from 'fs';
import { uploadsPath } from '../../config/environment';

@Injectable()
export class CatalogService {
  constructor(@InjectRepository(Catalog) private catalogRepository: Repository<Catalog>) {}

  findAll() {
    return this.catalogRepository.find({ relations: { category: true, parametrs: true }, order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const product = await this.catalogRepository.findOne({
      where: { id }, relations: { category: true, parametrs: true, images: true },
    });
    if (!product) throw new NotFoundException('Товар не найден');
    return product;
  }

  findByCategory(id: number) {
    return this.catalogRepository.find({
      where: { category: { id } }, relations: { category: true, parametrs: true }, order: { id: 'ASC' },
    });
  }

  private number(value: unknown, field: string, minimum = 0) {
    const result = Number(value);
    if (value === '' || value == null || !Number.isSafeInteger(result) || result < minimum) {
      throw new BadRequestException(`Некорректное поле: ${field}`);
    }
    return result;
  }

  private parseInfo(info: string) {
    let entries: unknown;
    try { entries = JSON.parse(info); } catch { throw new BadRequestException('Некорректные характеристики'); }
    if (!Array.isArray(entries)) throw new BadRequestException('Характеристики должны быть массивом');
    return entries.map(entry => ({
      size: this.number(entry?.size, 'size', 1),
      cost: this.number(entry?.cost, 'cost'),
    }));
  }

  private async save(dto: CreateCatalogDto | UpdateCatalogDto, file?: Express.Multer.File, id?: number) {
    const existing = id === undefined ? undefined : await this.findOne(id);
    const categoryId = dto.category ?? (dto as CreateCatalogDto).categoryId;
    const values: Partial<Catalog> = {};
    for (const field of ['title', 'description'] as const) {
      if (dto[field] !== undefined) {
        if (typeof dto[field] !== 'string' || !dto[field].trim()) throw new BadRequestException(`Некорректное поле: ${field}`);
        values[field] = dto[field].trim();
      } else if (!existing) throw new BadRequestException(`Обязательное поле: ${field}`);
    }
    for (const field of ['price', 'articule'] as const) {
      if (dto[field] !== undefined || !existing) values[field] = this.number(dto[field], field);
    }
    if (categoryId !== undefined || !existing) values.category = { id: this.number(categoryId, 'category', 1) } as Category;
    const info = dto.info === undefined ? (existing ? undefined : []) : this.parseInfo(dto.info);
    if (dto.photo === '') values.photo = null;
    let filename: string | undefined;
    if (file) {
      const extension = extname(file.originalname).toLowerCase();
      if (!['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(extension) || !file.mimetype.startsWith('image/')) {
        throw new BadRequestException('Загрузите изображение PNG, JPEG, WebP или GIF');
      }
      filename = randomUUID() + extension;
      await fs.mkdir(uploadsPath, { recursive: true });
      await fs.writeFile(resolve(uploadsPath, filename), file.buffer);
      values.photo = filename;
    }
    try {
      return await this.catalogRepository.manager.transaction(async manager => {
        if (values.category && !await manager.exists(Category, { where: { id: values.category.id } })) {
          throw new BadRequestException('Категория не найдена');
        }
        const product = await manager.save(Catalog, manager.create(Catalog, { ...(existing ? { id: existing.id } : {}), ...values }));
        if (info !== undefined) {
          await manager.delete(Parametrs, { catalog: { id: product.id } });
          if (info.length) await manager.insert(Parametrs, info.map(param => ({ ...param, catalog: { id: product.id } })));
        }
        return manager.findOne(Catalog, { where: { id: product.id }, relations: { category: true, parametrs: true } });
      });
    } catch (error) {
      if (filename) await fs.unlink(resolve(uploadsPath, filename)).catch(() => undefined);
      throw error;
    }
  }

  create(dto: CreateCatalogDto, file?: Express.Multer.File) { return this.save(dto, file); }
  update(id: number, dto: UpdateCatalogDto, file?: Express.Multer.File) { return this.save(dto, file, id); }

  async setStatus(id: number, status: boolean) {
    await this.findOne(id);
    await this.catalogRepository.update(id, { isActive: !status });
  }
}
