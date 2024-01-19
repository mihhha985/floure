import CatalogButton from "@/component/CatalogButton";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {

  try{
    const result = await fetch(process.env.API_URL + '/catalog', { next: { revalidate: 3600 } });
    const data = await result.json();
    return data;
  } catch(err) {  
		throw err;
  }
}

export default async function Page() {
  const data = await getData();
	console.log(data);
	if(data && data.length > 0){
  	return (
    	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-5">
          {data.map((item:IProduct, key:number) => 
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
								<h5 className="font-bold text-2xl text-gold-200 my-2">Артикул: {item.articule}</h5>
                <CatalogButton 
									id={item.id} 
									title={item.title} 
									price={item.price} 
									photo={item.photo} 
									articule={item.articule}
								/>
              </div>
            </div>
          )}
    	</div>
  	)
	}else{
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
	}
}
