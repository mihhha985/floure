"use client";
import {useState, useEffect} from "react";
import { IoIosCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import {motion} from "framer-motion";
import { addProduct, removeProduct} from "@/store/features/orderSlice";
import { IOrderProduct, IProduct} from "@/types/product";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
type ButtonProps = Omit<IProduct, 'description' | 'isActive' | 'parametrs' | 'category'>;
function CatalogButton({id, title, price, photo, articule}:ButtonProps) {
	const dispatch = useAppDispatch();
	const {products} = useAppSelector(state => state.order);
	const [isAdded, setIsAdded] = useState(true);
	const product:IOrderProduct = {
		id:id, 
		title:title, 
		price:price, 
		photo:photo, 
		quantity:1, 
		articule:articule, 
		size: 60, 
		lent: false, 
		color: null, 
		text: ''
	};

	useEffect(() => {
		let product = products.find(product => product.id === id);
		if (product) {
			setIsAdded(false);
		}else{
			setIsAdded(true);
		}
	}, [id, products]);

	const handleAdd = () => {
		dispatch(addProduct(product));
		const order = localStorage.getItem("order");
		if (order) {
			const orderJson = JSON.parse(order);
			const newOrder = [...orderJson, product];
			localStorage.setItem("order", JSON.stringify(newOrder));	
		}else{
			localStorage.setItem("order", JSON.stringify([product]));
		}

		setIsAdded(false);
	}

	const handleRemove = () => {
		dispatch(removeProduct(id));
		const order = localStorage.getItem("order");
		if (order) {
			const orderJson = JSON.parse(order);
			const newOrder = orderJson.filter((product:IOrderProduct) => product.id !== id);
			localStorage.setItem("order", JSON.stringify(newOrder));	
		}
		
		setIsAdded(true);
	}

	return ( 
		<div className="flex items-center justify-between gap-x-10">		
			{isAdded 
				?
				<motion.button
					onClick={handleAdd}
					whileTap={{ scale: 0.6 }} 
					className="flex items-center justify-between btn w-[160px] px-2"
				>
					<IoIosCheckmarkCircleOutline className="text-xl text-gold-100" />
					<span className="mr-5">Добавить</span>
				</motion.button> 
				:
				<motion.button
					onClick={handleRemove}
					whileTap={{ scale: 0.6 }} 
					className="flex items-center justify-between btn w-[160px] px-2"
				>
					<IoMdCloseCircleOutline className="text-xl text-gold-100" />
					<span className="mr-5">Удалить</span>
				</motion.button> 
			}
		</div>
	);
}

export default CatalogButton;