import { Product } from '../entities/product.entity';

export interface CreateOrderDto {
	fio: string;
	phone: string;
	email: string;
	adres: string;
	comment: string;
	date: string;
	products: Product[];
}