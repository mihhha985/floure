import Link from "next/link";
import Image from "next/image";
import {IoCartOutline} from 'react-icons/io5';

const getData = async (id:string) => {
  console.log(id);

  try{
    const result = await fetch(process.env.API_URL + `/catalog/${id}`);
    const data = await result.json();
    return data
  } catch(err) {  
    console.log(err);
  }
}

async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  
  return (
    <section className="section">
			<div className="container px-5">
				<div className="hidden sm:flex mb-5">
					<Link className="text-gold-200 hover:text-gold-200" href="/catalog">Каталог</Link>
					<span className="mx-2 text-gold-200">/</span>
					<span className="text-gold-200">{data.title}</span>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<div className="h-full bg-gradient-radial from-gold-200 border-2 border-gold-200">
						<Image width={600} height={600} alt={data.title} src={process.env.API_URL + '/' + data.photo} />
					</div>
					<div className="h-full flex flex-col">
						<h1 className="text-2xl text-gold-200 font-bold mb-5">{data.title}</h1> 
						<div className="w-full h-12 flex items-center justify-around bg-[#26252a] mb-5 font-bold text-lg text-gold-100">
							{data.isActive ? 'В наличии' : 'Под заказ'}
						</div>
						{data.parametrs && data.parametrs.map((param:any, index:number) =>
							<div className="text-base mb-2" key={index}>
								- {param.title}: {param.description}
							</div>
						)}
					
						<div className="w-full h-24 flex items-center justify-around mt-auto bg-[#26252a]">
							<h2 className="text-xl font-bold text-gold-100">Цена: {data.price} ₽</h2>
							<button className="flex items-center justify-center btn">
								<span>В корзину</span>
								<IoCartOutline className="ml-2" />
							</button>
						</div>
					</div>
					<div className="col-span-full mt-5">
						<h3 className="text-2xl text-gold-200 font-bold mb-5">Описание</h3> 
						<p className="text-base">{data.description}</p>
					</div>
				</div>
			</div>
    </section>
  );
}

export default Page;