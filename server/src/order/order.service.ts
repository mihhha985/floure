import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, ChangeStatusDto } from './dto/update-order.dto';

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

	async create(dto: CreateOrderDto):Promise<void> {
		try{
			const order =  this.orderRepository.create(dto);
			await this.orderRepository.save(order);
			dto.products.forEach(async (product) => {
				await this.productRepository.insert({...product, order: order});
			})

		}catch(e:any){
			throw new Error(e.message);
		}
	}

	async update(id: number, dto: UpdateOrderDto):Promise<void> {
		try{
			await this.orderRepository.update(id, dto);
		}catch(e:any){
			throw new Error(e.message);
		}
	}

	async changeStatus(id: number, dto:ChangeStatusDto):Promise<void> {
		try{
			await this.orderRepository.update(id, dto);
		}catch(e:any){
			throw new Error(e.message);
		}
	}

	async changeComment(id: number, dto:{comment:string}):Promise<void> {
		try{
			await this.orderRepository.update(id, dto);
		}catch(e:any){
			throw new Error(e.message);
		}
	}
}
