"use client"
import {useState} from "react";
import {useAppDispatch} from "@/store/hooks";
import {addProduct} from "@/store/features/orderSlice";	
import type { IProduct, IParameters, ColorType, IOrderProduct } from "@/types/product";
import {IoCartOutline} from 'react-icons/io5';
import { GiCheckMark } from "react-icons/gi";

function ProductView({data}:{data:IProduct}) {
	//console.log(data.parametrs);
	const dispatch = useAppDispatch();
	const [quantity, setQuantity] = useState<number>(1);
	const [price, setPrice] = useState<IParameters>(data.parametrs[0]);
	const [color, setColor] = useState<ColorType | null>(null);
	const [text, setText] = useState<string>('');
	const [add, setAdd] = useState<boolean>(false);

	const quantityHandler = (num:number):void => {
		if(num > 0) setQuantity(num);
	}

	const addProductHeandler = ():void => {
		const product:IOrderProduct = {
			id: data.id,
			title: data.title,
			photo: data.photo as string,
			articule: data.articule,
			price: price.cost,
			size: price.size,
			quantity:quantity,
			lent: add,
			color: color,
			text: text,
		}
		
		dispatch(addProduct(product));
		const order = localStorage.getItem("order");
		if (order) {
			const orderJson = JSON.parse(order);
			const newOrder = [...orderJson, product];
			localStorage.setItem("order", JSON.stringify(newOrder));	
		}else{
			localStorage.setItem("order", JSON.stringify([product]));
		}
	}

	return ( 
		<div className="h-full flex flex-col gap-y-5">
							<h2 className="text-4xl font-bold text-gold-100">Цена: {price.cost} ₽</h2>
							<h2 className="text-2xl text-gold-200 font-bold">Артикул: {data.articule}</h2> 
							<div className="w-full h-12 flex items-center justify-around bg-[#26252a] mb-5 font-bold text-lg text-gold-100 mt-5">
								{data.isActive ? 'В наличии' : 'Под заказ'}
							</div>
							<div className="flex flex-col">
								<h4 className="text-gold-200 text-xl mb-1">Выберите размер венка:</h4>
								<div className="flex gap-x-2">
									{data.parametrs && data.parametrs.map((param:any, index:number) =>
										<div 
											onClick={() => setPrice(param)}
											className={`${(param.size === price.size) ? 'border-4 border-white' : 'border-4 border-gold-100/90'}
											bg-gold-100/90 hover:bg-gold-100 text-black/60 text-xl font-bold rounded-lg p-2 cursor-pointer`} 
											key={index}>
											{param.size} см
										</div>
									)}
								</div>
							</div>

							<div className="flex flex-col mt-5 text-xl text-gold-200">
								<div>
									<input onClick={() => setAdd(false)} type="radio" name="add" defaultChecked/>
									<span className="ml-2">Без траурной ленты</span>	
								</div>
								<div>
									<input onClick={() => setAdd(true)} type="radio" name="add"/>
									<span className="ml-2">Добавить траурную ленту</span>	
								</div>
							</div>

							{add &&
							<div className="grid grid-cols-2">
								<div className="flex flex-col">
									<h4 className="text-gold-200">Выберите цвет ленты:</h4>
									<div className="grid grid-cols-4 gap-1">
										<div 
											onClick={() => setColor('white')} 
											className={`w-10 h-10 bg-white border border-gold-100 flex items-center justify-center`}>
											{color === 'white' && <GiCheckMark className="text-xl font-bold"/>}
										</div>
										<div
											onClick={() => setColor('black')} 
											className="w-10 h-10 bg-black border border-gold-100 flex items-center justify-center">
											{color === 'black' && <GiCheckMark className="text-white text-xl font-bold"/>}	
										</div>
										<div
											onClick={() => setColor('lime')} 
											className="w-10 h-10 bg-lime-500 border border-gold-100 flex items-center justify-center">
											{color === 'lime' && <GiCheckMark className="text-white text-xl font-bold"/>}	
										</div>
										<div 
											onClick={() => setColor('sky')}
											className="w-10 h-10 bg-sky-500 border border-gold-100 flex items-center justify-center">
											{color === 'sky' && <GiCheckMark className="text-white text-xl font-bold"/>}
										</div>
										<div
											onClick={() => setColor('purple')} 
											className="w-10 h-10 bg-purple-500 border border-gold-100 flex items-center justify-center">
											{color === 'purple' && <GiCheckMark className="text-white text-xl font-bold"/>}
											</div>
										<div
											onClick={() => setColor('pink')} 
											className="w-10 h-10 bg-pink-500 border border-gold-100 flex items-center justify-center">
											{color === 'pink' && <GiCheckMark className="text-white text-xl font-bold"/>}
										</div>
										<div
											onClick={() => setColor('rose')} 
											className="w-10 h-10 bg-rose-500 border border-gold-100 flex items-center justify-center">
											{color === 'rose' && <GiCheckMark className="text-white text-xl font-bold"/>}
										</div>
										<div
											onClick={() => setColor('gray')} 
											className="w-10 h-10 bg-gray-500 border border-gold-100 flex items-center justify-center">
											{color === 'gray' && <GiCheckMark className="text-white text-xl font-bold"/>}
										</div>
									</div>		
								</div>
								<div className="flex flex-col">
									<h4 className="text-gold-200">Напишите ваше пожелание:</h4>
									<textarea 
										onChange={e => setText(e.target.value)}
										className="w-full h-full bg-transparent border border-base rounded resize-none outline-none text-base italic p-2">{text}</textarea>
								</div>
							</div>		
							}

							<div className="w-full h-24 flex items-center justify-around mt-auto bg-[#26252a]">
								<div className="flex items-center gap-x-2">
									<label className="text-gold-200 text-2xl">Кол-во:</label>
									<input
										className="w-12 bg-gold-100 text-black text-xl rounded p-2"
										type="number"
										value={quantity}
										onChange={e => quantityHandler(+e.target.value)} 
									/>
								</div>
								<button
									onClick={addProductHeandler} 
									className="flex items-center justify-center btn w-[160px] px-2">
									<span>В корзину</span>
									<IoCartOutline className="ml-2" />
								</button>
							</div>
						</div>
	 );
}

export default ProductView;