import { Product } from '../entities/product.entity';
import { OrderStatus } from '../entities/order.entity';

export interface UpdateOrderDto {
	fio?: string;
	phone?: string;
	email?: string;
	adres?: string;
	comment?: string;
	date?: string;
	products?: Product[];
}

export interface ChangeStatusDto {
	status: OrderStatus;
}