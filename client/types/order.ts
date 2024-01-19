import { IOrderProduct } from './product';

export interface IOrder {
	fio: string;
	phone: string;
	email: string;
	adres: string;
	comment: string;
	date: string;
	products: IOrderProduct[];
}