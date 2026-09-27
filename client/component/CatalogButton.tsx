"use client";
import {useState, useEffect} from "react";
import { IoIosCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import {motion} from "framer-motion";
import { addProduct, removeProduct} from "@/store/features/orderSlice";
import { IOrderProduct, IProduct} from "@/types/product";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
type ButtonProps = Omit<IProduct, 'description' | 'isActive' | 'parametrs' | 'category'> & { size?: number };
function CatalogButton({id, title, price, photo, articule, size = 0}:ButtonProps) {
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
		size,
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


		setIsAdded(false);
	}

	const handleRemove = () => {
		dispatch(removeProduct(id));


		setIsAdded(true);
	}

	return (
		<div className="flex items-center justify-between gap-x-10">
			{isAdded
				?
				<motion.button
					onClick={handleAdd}
					whileTap={{ scale: 0.98 }}
					className="flex min-h-[44px] w-full items-center justify-center gap-2 btn px-4"
				>
					<IoIosCheckmarkCircleOutline className="text-xl text-gold-100" />
					<span >В корзину</span>
				</motion.button>
				:
				<motion.button
					onClick={handleRemove}
					whileTap={{ scale: 0.98 }}
					className="flex min-h-[44px] w-full items-center justify-center gap-2 btn px-4"
				>
					<IoMdCloseCircleOutline className="text-xl text-gold-100" />
					<span >Убрать из корзины</span>
				</motion.button>
			}
		</div>
	);
}

export default CatalogButton;
