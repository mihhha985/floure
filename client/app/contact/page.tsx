"use client"
import { Suspense } from 'react';

function Page() {
	return ( 
		<section className='relative top-24 h-screen lg:h-[1080px] bg-[url("/fon_contact.png")] bg-center bg-contain bg-no-repeat 
		flex items-center justify-center px-[5%] lg:px-0'>
			<div className='grid grid-cols-1 sm:grid-cols-2 w-auto mx-auto gap-5 sm:gap-10 p-5 border-2 border-base rounded relative bg-[#0f0e10]/80
			after:absolute after:w-full after:h-full after:bg-[url("/map_contact.jpg")] after:bg-cover after:bg-center after:-z-10'>
				<div className='sm:col-span-2 text-center text-4xl text-gold-100'>Контакты</div>
				<div className='text-center sm:text-left text-gold-200'>
					<p className='text-2xl'>Адрес:</p>
					<p className='text-lg italic mt-2'>Железноводская улица, 58, <br />Минеральные Воды, Ставропольский край</p>
				</div>
				<div className='text-center sm:text-right text-gold-200'>
					<p className='text-2xl'>Email:</p>
					<p className='text-xl italic mt-2'>123@mail.ru</p>
				</div>
				<div className='text-center sm:text-left text-gold-200'>
					<p className='text-2xl'>Телефон:</p>
					<p className='text-xl italic mt-2'>8-800-555-77-77</p>
				</div>
				<div className='text-center sm:text-right text-gold-200'>
					<p className='semibold text-xl text-gradient-link'>ИП Смирнова Д.Е</p>
					<p className='semibold text-xl text-gradient-link mt-2'>ИНН: 23145678</p>
				</div>
			</div>
		</section>
	);
}

export default Page;