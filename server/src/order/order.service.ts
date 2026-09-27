import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, ChangeStatusDto } from './dto/update-order.dto';
import { Catalog } from '../catalog/entities/catalog.entity';

@Injectable()
export class OrderService {
	constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>, 
		@InjectRepository(Product) 
		private productRepository: Repository<Product>
  ) {}

	async findAll():Promise<Order[]> {
		try{
			return await this.orderRepository.find({
				relations: ['products']
			});
		}catch(e:any){
			throw new Error(e.message);
		}
	}

	async findOne(id: number):Promise<Order> {
		try{
			return await this.orderRepository.findOneOrFail({
				where: {id: id},
				relations: ['products']
			});
		}catch(e:any){
			throw new Error(e.message);
		}
	}

	async create(dto: CreateOrderDto) {
    for (const field of ['fio', 'phone', 'email', 'adres', 'date'] as const) {
      if (typeof dto[field] !== 'string' || !dto[field].trim()) throw new BadRequestException(`Обязательное поле: ${field}`);
    }
    if (!Array.isArray(dto.products) || !dto.products.length) throw new BadRequestException('Корзина пуста');
    if (dto.products.length > 30) throw new BadRequestException('Слишком много позиций');
    return this.orderRepository.manager.transaction(async manager => {
      const products = [];
      for (const product of dto.products) {
        if (!Number.isSafeInteger(product.id) || !Number.isSafeInteger(product.size) ||
            !Number.isSafeInteger(product.quantity) || product.quantity < 1 || product.quantity > 100) {
          throw new BadRequestException('Некорректная позиция заказа');
        }
        const catalog = await manager.findOne(Catalog, { where: { id: product.id }, relations: { parametrs: true } });
        if (!catalog || catalog.price <= 0) throw new BadRequestException('Товар недоступен для заказа');
        const selected = catalog.parametrs?.find(param => param.size === product.size);
        if (catalog.parametrs?.length && !selected) throw new BadRequestException('Размер товара изменился');
        const expectedPrice = selected?.cost ?? catalog.price;
        if (expectedPrice <= 0 || product.price !== expectedPrice) throw new BadRequestException('Цена товара изменилась. Обновите корзину');
        if (product.color != null && !['white','black','lime','sky','purple','pink','rose','gray'].includes(product.color)) throw new BadRequestException('Некорректный цвет');
        if (product.text && (typeof product.text !== 'string' || product.text.length > 500)) throw new BadRequestException('Текст ленты слишком длинный');
        // Names, articles and prices come from the database, never from the browser.
        products.push({ title: catalog.title, articule: catalog.articule, price: expectedPrice,
          size: selected?.size ?? 0, quantity: product.quantity, lent: Boolean(product.lent),
          color: product.lent ? (product.color ?? null) : null, text: product.lent ? (product.text || '') : '' });
      }
      const order = await manager.save(Order, manager.create(Order, {
        fio: dto.fio, phone: dto.phone, email: dto.email, adres: dto.adres,
        comment: dto.comment || '', date: dto.date,
      }));
      await manager.insert(Product, products.map(product => ({ ...product, order: { id: order.id } })));
      return manager.findOne(Order, { where: { id: order.id }, relations: ['products'] });
    });
	}

	async update(id: number, dto: UpdateOrderDto):Promise<void> {
		try{
			await this.orderRepository.update(id, dto);
		}catch(e:any){
			throw new Error(e.message);
		}
	}

	async changeStatus(id: number, dto:ChangeStatusDto):Promise<void> {
		if (!['start','confirmed','cancelled','completed','refusal'].includes(dto.status)) throw new BadRequestException('Некорректный статус');
		if (!(await this.orderRepository.update(id, { status: dto.status })).affected) throw new NotFoundException('Заказ не найден');
	}

	async changeComment(id: number, dto:{comment:string}):Promise<void> {
		if (typeof dto.comment !== 'string' || dto.comment.length > 2000) throw new BadRequestException('Некорректный комментарий');
		if (!(await this.orderRepository.update(id, { comment: dto.comment })).affected) throw new NotFoundException('Заказ не найден');
	}
}
