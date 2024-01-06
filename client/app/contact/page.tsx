"use client"
import { Suspense } from 'react';

function Page() {
	return ( 
		<section className="section">
			<h1 className="text-5xl text-gold-100 font-bold text-center mb-10">Контакты</h1> 
			<div className="container mx-auto grid grid-cols-4">
				<div className="flex flex-col gap-y-10 col-span-1 pb-40">
					<div>
						<h3 className="text-2xl text-gold-100 font-bold">Адрес:</h3> 
						<p className="text-xl text-gold-200">г. Москва, ул. Ленина, д. 1</p>
					</div>
					<div>
						<h3 className="text-2xl text-gold-100 font-bold">Телефон:</h3> 
						<p className="text-xl text-gold-200">8-800-445-17-43</p>
					</div>
					<div>
						<h3 className="text-2xl text-gold-100 font-bold">Email:</h3> 
						<p className="text-xl text-gold-200">123@mail.ru</p>
					</div>
					<div>
						<h4 className="text-xl text-gradient-link">ИП Смирнова Д.Е.</h4>
						<h4 className="text-xl text-gradient-link">ИНН 123456789012</h4>
					</div>
				</div>
				<div className="col-span-3">
					<Suspense fallback={<div className='text-xl text-gold-200'>Загрузка...</div>}>
					 <iframe src="https://yandex.ru/map-widget/v1/?from=api-maps&ll=43.110353%2C44.204990&mode=whatshere&origin=jsapi_2_1_79&whatshere%5Bpoint%5D=43.110796%2C44.205312&whatshere%5Bzoom%5D=17&z=17.8" width="100%" height="100%" frameBorder="1" allowFullScreen={true}></iframe>
					</Suspense>
				</div>
			</div>
			<h2 className="text-4xl text-gold-100 font-bold text-center mt-10">Остались вопросы?</h2>
			<h3 className="text-2xl text-gold-100 font-bold text-center mb-10">Просто заполните форму</h3>
			<div className="container mx-auto">
				<div className="mx-auto flex flex-col p-5 rounded-xl border-4 border-base w-fit gap-y-10">
					<input type="text" placeholder="Введите ваше имя" className="input w-[400px] h-12" />
					<input type="text" placeholder="Введите ваш номер" className="input w-[400px] h-12" />
					<textarea placeholder="Введите ваш вопрос" className="input w-[400px] h-[180px] resize-none" />
					<button className="btn w-[200px] mt-10">Отправить</button>
				</div>
			</div>
		</section>
	);
}

export default Page;