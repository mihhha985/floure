function Page() {
	return ( 
		<section className="section">
			<div className="w-full md:w-1/2 lg:w-1/3 p-10 rounded-lg border-2 border-base mx-auto my-10 lg:my-20">
				<h1 className="text-4xl text-gold-100 font-bold text-center mb-5">Спасибо за заказ!</h1>
				<h4 className="text-xl text-gold-200 text-center mb-2">
					В ближайшее время нам менеджер свяжется с Вами для уточнения деталей заказа<br />
					Время работы магазина с 9:00 до 20:00 без выходных, по всем вопросам пишите на почту: 
					<span className="ml-5 text-gradient-link">123@mail.ru</span>
				</h4>
				<h5 className="text-gold-200 text-center mt-10">С уважение администрация интернет-магазина 
				<br /><span className="text-2xl text-gradient-logo">Вечная Память</span></h5>
			</div>
		</section>
	 );
}

export default Page;