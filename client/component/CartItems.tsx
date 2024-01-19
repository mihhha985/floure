"use client";
import { useState } from "react";
import Image from "next/image";
import {BsTrash} from 'react-icons/bs';
import {changeQuantity, removeProduct} from "@/store/features/orderSlice";
import type { IOrderProduct } from "@/types/product";
import {useAppDispatch} from "@/store/hooks";
import {motion} from "framer-motion";

function CartItems({item}: {item: IOrderProduct}) {
	const dispatch = useAppDispatch();
	const [quantity, setQuantity] = useState<number>(item.quantity);

	const handleRemove = () => {
		dispatch(removeProduct(item.id));
		const order = localStorage.getItem("order");
		if (order) {
			const orderJson = JSON.parse(order);
			const newOrder = orderJson.filter((product:IOrderProduct) => product.id !== item.id);
			localStorage.setItem("order", JSON.stringify(newOrder));	
		}
	}

	const quantityHandler = (num:number):void => {
		console.log(num);
		if(num > 0) {
			setQuantity(num);
			dispatch(changeQuantity({id: item.id, quantity: num}));
		}
	}

	return ( 
		<div className="w-full grid grid-cols-12 items-center rounded border border-gold-200/60 p-2 gap-5 mb-5">
			<Image 
				className="col-span-4 md:col-span-2" 
				src={process.env.API_URL + '/' + item.photo} 
				width={100} 
				height={100} 
				alt={'photo'} 
			/>
			<div className="col-span-8 w-full h-full flex flex-col">
				<h4 className="text-lg text-gold-200">{item.title}</h4>
				<h5 className="font-bold text-lg text-gold-100">Размер: {item.size} см - Цена: {item.price} ₽</h5>
				<h5 className="font-bold text-lg text-gold-200">Артикул: {item.articule}</h5>	
			</div>
			<input
				onChange={(e) => quantityHandler(Number(e.target.value))} 
				type="number" 
				value={quantity} 
				className="col-span-6 md:col-span-1 w-10 h-10 bg-gold-100 text-2xl rounded p-2 ml-5 md:ml-0" 
			/>
			<motion.button 
				whileTap={{ scale: 0.8 }} 
				onClick={handleRemove}
				className="col-span-6 md:col-span-1 flex items-center justify-end md:justify-center mr-5 md:mr-0">
				<BsTrash className="text-2xl text-gold-200" />
			</motion.button>
		</div>
	 );
}

export default CartItems;