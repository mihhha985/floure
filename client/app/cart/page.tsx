"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CartItems from '@/component/CartItems';
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import { clearOrder } from '@/store/features/orderSlice';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const variantsBox = {
	open: { opacity: 1, height: "auto" },
	closed: { opacity: 0, height: 0 }
};

const variantsArrow = {
	open: { rotate: 180 },
	closed: { rotate: 0 }
};

function Page() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const {products, totalPrice} = useAppSelector(state => state.order);
	const [isVisible, setIsVisible] = useState(false);
	const sendOrder = () => {
		dispatch(clearOrder());
		localStorage.removeItem("order");
		router.push('/thank');
	}
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
								{products.map((item, key) => 
									<CartItems item={item} key={key} />
								)}
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-5 mt-10">
									<h4 className="text-2xl text-gold-200">Итого: {totalPrice} руб.</h4>
									<button
										onClick={() => setIsVisible(true)} 
										className="btn w-[200px]">
										Оформить заказ
									</button>
								</div>
							</div>
						</div>
					}
					{isVisible &&
						<div className='flex flex-col'>
							<div className='flex justify-between items-center mb-5'>
								<h5 className='text-gold-200 text-2xl'>Шаг 2:</h5>
								<span
									onClick={() => setIsVisible(false)} 
									className='text-gold-200 text-2xl cursor-pointer'>
									<MdOutlineKeyboardArrowDown />
								</span>
							</div>
							<div className="pb-5">
								<div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-y-5">
									<div className='flex flex-col gap-y-5'>
										<input type="text" placeholder="Введите ваше имя" className="input w-full sm:w-[400px] h-12" />
										<input type="text" placeholder="Введите ваш номер" className="input w-full sm:w-[400px] h-12" />
									</div>
									<textarea placeholder="Введите ваш адрес" className="input w-full sm:w-[400px] h-[180px] resize-none" />
									<div>
										<h5 className='text-2xl text-gold-100'>Выберите способ оплаты:</h5>
										<div className='flex gap-x-2 text-gold-200'>
											<input type="radio" name="payment" />
											<label>Оплата при получении с оплатой за доставку</label>	
										</div>
										<div className='flex gap-x-2 text-gold-200'>
											<input type="radio" name="payment" checked={true} />
											<label>Оплата онлайн с бесплатной доставкой</label>	
										</div>
									</div>
								</div>
								<button
									onClick={sendOrder} 
									className="btn w-[200px] mt-10"
								>
									Отправить
								</button>
							</div>
						</div>
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