import Material from "@/component/Material";
import ToggleCategory from "@/component/ToggleCategory";
import Image from "next/image";

function Page() {
	return ( 
		<>
		<section className="flex flex-col w-full h-screen bg-[url('/header.jpg')] bg-cover bg-center">
			<div className="bg-gradient-to-t from-[#0f0e10] w-full mt-auto py-10 px-2">
				<h3 className="mb-40 xl:mb-0 text-4xl md:text-5xl lg:text-6xl text-gold-200 font-semibold text-center shadow-local">
					Авторские траурные венки<br /> в наличии и под заказ
				</h3>
				<ToggleCategory />
			</div>
		</section>
		<section className="flex flex-col w-full bg-[#0f0e10] py-10 px-5 xl:py-20 xl:px-40">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2">
				<div className=" flex flex-col">
					<h4 className="text-4xl text-gold-100">Наши услуги</h4>
					<div className="border-t-2 border-base pt-5 mt-5">
						<h5 className="text-2xl text-gold-200">Траурные венки под заказ</h5>
						<p className="text-xl text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum dolore non, laboriosam nam assumenda ut sit! 
						Reiciendis eos pariatur nisi exercitationem! Numquam dolore a minus dolores laboriosam labore adipisci totam autem nemo!</p>
					</div>
					<div className="border-t-2 border-base pt-5 mt-5">
						<h5 className="text-2xl text-gold-200">Траурные венки готовые</h5>
						<p className="text-xl text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum dolore non, laboriosam nam assumenda ut sit! 
						Reiciendis eos pariatur nisi exercitationem! Numquam dolore a minus dolores laboriosam labore adipisci totam autem nemo!</p>
					</div>
				</div>
				<div className="lg:col-span-2 flex items-center justify-center radial-gradient">
					<Image className="opacity-80 mix-blend-lighten" src={"/grob.jpg"} alt="" width={600} height={400}/>
				</div>
			</div>
		</section>
		<section className="relative">
				<h3 className="text-3xl lg:text-4xl text-gold-200 font-semibold text-center m-5 lg:m-10">Материалы для изготовления венков</h3>
				<Material />
		</section>	
		</>
	 );
}

export default Page;