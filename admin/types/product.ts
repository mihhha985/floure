import { ICategory } from "./category";

export interface IProduct{
	id:number;
	title:string;
	description:string;
	price:number;
	articule:number;
	photo?:string;
	isActive:boolean;
	category:ICategory;
	parametrs:InfoType[];
}

export interface ICreateProduct{
	title:string;
	description:string;
	articule:number;
	photo?:string;
	categoryId:number;
}

export type InfoType = {
	id?:number;
	size:string;
	cost:string;
}
