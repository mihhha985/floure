"use client"
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearOrder } from "@/store/features/orderSlice";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {IOrder} from '@/types/order';
import { useForm, SubmitHandler } from "react-hook-form";

type InputsType  = {
	fio: string,
	phone: string,
	email: string,
	adres: string,
}

function OrderForm({hidden, }: {hidden: () => void}) {
	const { products } = useAppSelector((state) => state.order);
	const dispatch = useAppDispatch();
	const router = useRouter();
	console.log(new Date().toISOString())
	const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>()

	const sendOrder = async (data:InputsType) => {
		const order:IOrder = {
			fio: data.fio,
			phone: data.phone,
			email: data.email,
			adres: data.adres,
			comment: "",
			date: new Date().toISOString(),
			products: products,
		}

		const response = await fetch(process.env.API_URL + '/order', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(order),
		})

		if(response.ok){
			dispatch(clearOrder());
			localStorage.removeItem("order");
			router.push('/thank');
		}else{
			throw new Error("Ошибка при отправке заказа");
		}
	}

	const onSubmit: SubmitHandler<InputsType> = (data) => console.log(data);
	console.log(errors);

	return ( 
		<div className='flex flex-col'>

			<div className='flex justify-between items-center mb-5'>
				<h5 className='text-gold-200 text-2xl'>Шаг 2:</h5>
				<span
					onClick={hidden} 
					className='text-gold-200 text-2xl cursor-pointer'>
					<MdOutlineKeyboardArrowDown />
				</span>
			</div>

			<form
				onSubmit={handleSubmit(sendOrder)} 
				className="grid grid-cols-1 lg:grid-cols-2 w-full gap-y-5">
				<div className='flex flex-col gap-y-1'>
					<div className="relative pb-5">
						<input
							type="text" 
							placeholder="Введите ваше имя" 
							className="input w-full sm:w-[400px] h-12" 
							{...register('fio', { required: true, minLength: 10, maxLength:60 })}
						/>
						{errors.fio?.type === 'required' && <span className="absolute bottom-0 left-1 text-red-500 text-sm">Поле обязательно для заполнения!</span>}
						{errors.fio?.type === 'minLength' && <span className="absolute bottom-0 left-1 text-red-500 text-sm">Минимум 10 символов</span>}
						{errors.fio?.type === 'maxLength' && <span className="absolute bottom-0 left-1 text-red-500 text-sm">Максимум 60 символов</span>}
					</div>
					<div className="relative pb-5">
						<input
							{...register('phone', {required:true, pattern: /^\+?([0-9]{11})$/})}
							type="text" 
							placeholder="Введите ваш номер" className="input w-full sm:w-[400px] h-12" 
						/>
						{errors.phone?.type === 'required' && <span className="absolute bottom-0 left-1 text-red-500 text-sm">Поле обязательно для заполнения!</span>}
						{errors.phone?.type === 'pattern' && <span className="absolute bottom-0 left-1 text-red-500 text-sm">Не корректный номер телефона(только цифры)</span>}
					</div>
					<div className="relative pb-5">
						<input 
							{...register('email', {required:true, pattern: /^([a-z0-9\_\-\.]+)@([a-z]+)\.([a-z]+)$/})}
							type="text" 
							placeholder="Введите ваш email" 
							className="input w-full sm:w-[400px] h-12" 
						/>
						{errors.email?.type === 'required' && <span className="absolute bottom-0 left-1 text-red-500 text-sm">Поле обязательно для заполнения!</span>}
						{errors.email?.type === 'pattern' && <span className="absolute bottom-0 left-1 text-red-500 text-sm">Не корректный email</span>}
					</div>
				</div>
				<div className="relative pb-5">
					<textarea 
						{...register('adres', { required: true, minLength: 20, maxLength:150 })}
						placeholder="Введите ваш адрес" className="input w-full sm:w-[400px] h-full resize-none" 
					/>
					{errors.adres?.type === 'required' && <span className="absolute bottom-0 left-1 text-red-500 text-sm">Поле обязательно для заполнения!</span>}
					{errors.adres?.type === 'minLength' && <span className="absolute bottom-0 left-1 text-red-500 text-sm">Минимум 20 символов</span>}
					{errors.adres?.type === 'maxLength' && <span className="absolute bottom-0 left-1 text-red-500 text-sm">Максимум 150 символов</span>}
				</div>
				<div className="flex items-center">
					<button type="submit" className="btn w-[200px] mt-10">Отправить</button>
				</div>
			</form>
		</div>
	);
}

export default OrderForm;