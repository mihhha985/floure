export class CreateCatalogDto {
	id:number;
	title:string;
	description:string;
	articule:number;
	price:number;
	photo?:string;
	isActive:boolean;
	category:number;
	categoryId?:number;
	info:string;
}
