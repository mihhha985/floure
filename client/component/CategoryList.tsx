import Link from "next/link";
import { ICategory } from "@/types/category";

const getData = async () => {
  try{
    const result = await fetch(process.env.API_URL + '/category', { cache: 'no-store' });
    const data = await result.json();
    return data;
  } catch(err) {  
		throw err;
  }
}

async function CategoryList({category}: {category:number}) {

	const data = await getData();
	return ( 
		<div className="flex flex-nowrap gap-x-5 w-max h-20 items-center">
			<Link
				href={'/catalog'}
				className={`
					${category === 0 ? 'bg-gold-200 text-white' : 'bg-[#26252a] text-gold-200'}
					flex justify-center items-center text-xl px-5 py-2 rounded-xl cursor-pointer`
				}>
				Все категории
			</Link>
			{data && data.map((item:ICategory) =>
				<Link key={item.id}
					href={`/catalog/${item.id}`}
					className={`
						${item.id === category ? 'bg-gold-200 text-white' : 'bg-[#26252a] text-gold-200'}
						flex justify-center items-center text-xl px-5 py-2 rounded-xl cursor-pointer`
					}>
					{item.name}
				</Link>
			)}
		</div>

	);
}

export default CategoryList;