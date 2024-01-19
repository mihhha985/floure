export interface IOrder{
	id:number;
	fio:string;
	phone:string;
	email:string;
	adres:string;
	status:OrderStatusType;
	comment:string;
	date:string;
	products:IOrderProduct[];
}

export interface IOrderProduct{
	id:number;
	title:string;
	articule:number;
	price:number;
	size:number;
	quantity:number;
	lent:boolean;
	color:ColorType;
	text:string;
}

export type OrderStatusType =  "start" | "confirmed" | "cancelled" | "completed" | "refusal";

export type ColorType = 'white' | 'black' | 'lime' | 'sky' | 'purple' | 'pink' | 'rose' | 'gray';