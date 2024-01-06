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

const getData = async () => {
  try{
    const result = await fetch(process.env.API_URL + '/catalog');
    const data = await result.json();
    return data;
  } catch(err) {  
		throw err;
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <section className="section"> 
      <div className="container xl:px-[6%] 2xl:px-[12%]">
        <h1 className="text-4xl text-gold-100 font-bold text-center mb-5">Каталог товаров</h1> 
				<div className="scroll w-auto overflow-auto mb-5"> 
					<CategoryList />
				</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-5">
          {data && data.map((item:Item, key:number) => 
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
      </div>
    </section>
  )
}
