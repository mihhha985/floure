export default function DashboardLayout({
  children,
	category
}: {
  children: React.ReactNode,
	category: React.ReactNode
}) {
  return (
		<section className="section"> 
			<div className="container xl:px-[6%] 2xl:px-[12%]">
				<h1 className="text-4xl text-gold-100 font-bold text-center mb-5">Каталог товаров</h1> 
				<div className="scroll w-auto overflow-auto mb-5"> 
					{category}
				</div>
				{children}
			</div>
		</section>
	)
}