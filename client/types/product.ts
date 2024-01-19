import {ICategory} from "@/types/category";

export type ColorType = 'white' | 'black' | 'lime' | 'sky' | 'purple' | 'pink' | 'rose' | 'gray';

export interface IOrderProduct  {
  id: number,
	title: string,
	photo: string,
	articule:number,
	price: number,
	size: number,
	quantity: number,
	lent: boolean,
	color?: ColorType | null,
	text?: string,
}

export interface IProduct {
	id:number;
	title:string;
	description:string;
	articule:number;
	price:number;
	photo:string;
	isActive:boolean;
	category:ICategory;
	parametrs:IParameters[] | [];
	images?: string[] | [];
}

export interface IParameters {
	id:number;
	size:number;
	cost:number
}