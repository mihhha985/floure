import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
	constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    this.validate(dto);
    const category = this.categoryRepository.create({ name: dto.name.trim(), order: dto.order ?? 0 });
		return this.categoryRepository.save(category);
  }

  findAll():Promise<Category[]> {
    return this.categoryRepository.find({ order: { order: 'ASC', id: 'ASC' } });
  }

  async findOne(id: number):Promise<Category> {
    const category = await this.categoryRepository.findOneBy({id});
    if (!category) throw new NotFoundException('Категория не найдена');
    return category;
  }
	
  async update(id: number, dto: UpdateCategoryDto) {
    await this.findOne(id);
    this.validate(dto);
    return await this.categoryRepository.update(id, { name: dto.name.trim(), order: dto.order ?? 0 });
  }

	async setStatus(id: number, status: boolean):Promise<void>{
		await this.findOne(id);
		await this.categoryRepository.update(id, {isActive: !status});
	}

  private validate(dto: CreateCategoryDto) {
    if (typeof dto.name !== 'string' || !dto.name.trim() || dto.name.length > 500) throw new BadRequestException('Укажите название категории');
    if (dto.order !== undefined && !Number.isSafeInteger(dto.order)) throw new BadRequestException('Порядок должен быть целым числом');
  }
}
