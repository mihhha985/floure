import { ICategory } from "@/types/category";

const getData = async () => {
  try{
    const result = await fetch(process.env.API_URL + '/category');
    const data = await result.json();
    return data;
  } catch(err) {  
		throw err;
  }
}

async function CategoryList() {

	const data = await getData();
	
	return ( 
		<div className="flex flex-nowrap gap-x-5 w-max h-20 items-center">
			{data && data.map((item:ICategory) =>
				<div key={item.id}
					className="flex justify-center items-center bg-[#26252a] text-gold-200 text-xl px-5 py-2 rounded-xl">
					{item.name}
				</div>
			)}
		</div>

	);
}

export default CategoryList;