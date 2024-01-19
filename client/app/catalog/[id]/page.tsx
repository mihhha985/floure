import CatalogButton from "@/component/CatalogButton";
import CategoryList from "@/component/CategoryList";
import Image from "next/image";
import Link from "next/link";

type Item = {
  id: number;
  title: string;
  description: string;
  price: number;
  photo: string;
  isActive: boolean;
}

const getData = async (id:string) => {
    const result = await fetch(process.env.API_URL + '/catalog/category/' + id);
		if(!result.ok) return null;
    const data = await result.json();
    return data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
	if(data && data.length > 0){
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-5">
						{data.map((item:Item, key:number) => 
							<div className="w-full flex flex-col items-center border border-gold-200/60" key={key}>
								<Link href={'/product/' + item.id} className="image-box">
									<Image 
										className="relative z-0"
										src={process.env.API_URL + '/' + item.photo} 
										width={300} 
										height={300} 
										alt={item.title} 
									/>
								</Link>
								<div className="w-full h-full flex flex-col p-5 bg-[#26252a]">
									<h4 className="self-start text-sm text-gold-200">{item.title}</h4>
									<h5 className="self-start font-bold text-gold-100">Цена: {item.price} ₽</h5>
									<CatalogButton 
										id={item.id} 
										title={item.title} 
										price={item.price} 
										photo={item.photo} 
										quantity={1}
									/>
								</div>
							</div>
						)}
			</div>
		)
	}else{
		return(
			<div>
				<h2 className='text-center text-4xl text-gold-200 mt-20'>В выбранной категории нет товаров</h2>
				<h4 className='text-center text-2xl text-gold-200 mt-2'>Пожалуйста выберите другую категории или вернитесь на главную!</h4>
				<div className='flex items-center justify-center mt-10'>
					<Link
						className="btn px-5" 
							href={'/catalog'}>
							Каталог
					</Link>
				</div>
			</div>
		);
	}
}
