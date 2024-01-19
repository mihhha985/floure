"use client"
import { useState } from 'react';
import CartItems from '@/component/CartItems';
import {useAppSelector} from '@/store/hooks';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IOrderProduct } from '@/types/product';
import OrderForm from '@/component/OrderForm';

const variantsBox = {
	open: { opacity: 1, height: "auto" },
	closed: { opacity: 0, height: 0 }
};

const variantsArrow = {
	open: { rotate: 180 },
	closed: { rotate: 0 }
};

function Page() {
	const {products, totalPrice} = useAppSelector(state => state.order);
	const [isVisible, setIsVisible] = useState(false);
	
  return ( 
    <section className="section">
      <h1 className="text-4xl text-gold-100 font-bold text-center mb-5">Корзина</h1>
			{products.length > 0 
				?
				<div className="container px-5">
					{!isVisible &&
						<div className='flex flex-col'>
							<div className='flex justify-between items-center mb-5'>
								<h5 className='text-gold-200 text-2xl'>Шаг 1:</h5>
								<span 
									className='text-gold-200 text-2xl'>
									<MdOutlineKeyboardArrowDown />
								</span>
							</div>
							<div>
								{products.map((item:IOrderProduct, key:number) => 
									<CartItems item={item} key={key} />
								)}
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-5 mt-10">
									<button
										onClick={() => setIsVisible(true)} 
										className="btn w-[200px]">
										Оформить заказ
									</button>
									<h4 className="text-2xl text-gold-200">Итого: {totalPrice} руб.</h4>
								</div>
							</div>
						</div>
					}
					{isVisible &&
						<OrderForm hidden={() => setIsVisible(false)} />
					}
				</div>
				:
				<div className="w-full sm:w-1/2 lg:w-1/3 p-10 rounded-lg border-2 border-base mx-auto my-20">
					<h3 className="text-2xl text-center text-gold-200">Корзина пуста</h3>
					<h4 className="text-xl text-center text-base mt-5">Чтобы сделать заказ добавьте понравившиеся товары в корзину</h4>
				</div>
			}
    </section>
  );
}

export default Page;