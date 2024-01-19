import Link from "next/link";
import Image from "next/image";
import ProductView from "@/component/ProductView";

const getData = async (id:string) => {
    const result = await fetch(process.env.API_URL + `/catalog/${id}`);
		if(!result.ok) return null;
    return await result.json();
}

async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
	console.log(data);
	if(data){
  	return (
			<section className="section">
				<div className="container px-5">
					<div className="hidden sm:flex text-2xl mb-5">
						<Link className="text-gold-200 hover:text-gold-200" href="/catalog">Каталог</Link>
						<span className="mx-2 text-gold-200">/</span>
						<h1 className="text-gold-200">{data.title}</h1>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
						<div className="flex items-center justify-center h-full bg-gradient-radial from-gold-200/20 border-2 border-gold-200">
							<Image width={600} height={600} alt={data.title} src={process.env.API_URL + '/' + data.photo} />
						</div>
						<ProductView data={data} />
						<div className="col-span-full mt-5">
							<h3 className="text-4xl text-gold-200 font-bold mb-5">Описание</h3> 
							<p className="text-xl text-base">{data.description}</p>
						</div>
					</div>
				</div>
			</section>
  	);
	}else{
		throw new Error('Not found');
	}
}

export default Page;