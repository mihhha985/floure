"use client"
import { useState } from "react";
import Image from "next/image";
import {motion} from 'framer-motion';

export type ToggleCategoryType = 'cross' | 'roses' | 'star' | 'skull' | 'gerland';

const variantsButton = {
	dufault:{
		y: 0,
	},
	chacked:{
		y: -40,
	}
}

const variantsHeadline = {
	visible:{
		opacity: 1,
		x: 0,
	},
	hidden:{
		opacity: 0,
		x: 200,
	}
}

const variantsText = {
	visible:{
		opacity: 1,
		x: 0,
	},
	hidden:{
		opacity: 0,
		x: -200,
	}
}

function ToggleCategory() {
	const [category, setCategory] = useState<ToggleCategoryType>('star');

	return ( 
		<>
			<div className="hidden xl:block w-1/2 overflow-hidden mx-auto my-10 p-5 rounded-xl border-2 border-base bg-[#0f0e10]">
				{category === 'cross' &&
				<>
					<motion.div
						variants={variantsHeadline}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.5 }}
						className="inline-flex border-b-2 border-gold-200 pb-2 mb-2">
						<h4 className="text-2xl text-gold-200">Венки стандартные, эконом</h4>
					</motion.div>
					<motion.p
						variants={variantsText}
						initial="hidden"
						animate="visible"
						exit="hidden" 
						transition={{ duration: 0.5 }}
						className="text-xl text-base">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam et nostrum beatae doloribus deleniti natus odit perferendis? 
						Natus suscipit accusantium fugit, ducimus incidunt a itaque laboriosam perspiciatis dolorum deserunt. Autem?
					</motion.p>
				</>
				}
				{category === 'roses' &&
				<>
					<motion.div
						variants={variantsHeadline}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.5 }}
						className="inline-flex border-b-2 border-gold-200 pb-2 mb-2">
						<h4 className="text-2xl text-gold-200">Венки из живых цветов, премиум</h4>
					</motion.div>
					<motion.p
						variants={variantsText}
						initial="hidden"
						animate="visible"
						exit="hidden" 
						transition={{ duration: 0.5 }}
						className="text-xl text-base">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam et nostrum beatae doloribus deleniti natus odit perferendis? 
						Natus suscipit accusantium fugit, ducimus incidunt a itaque laboriosam perspiciatis dolorum deserunt. Autem?
					</motion.p>
				</>
				}
				{category === 'star' &&
				<>
					<motion.div
						variants={variantsHeadline}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.5 }}
						className="inline-flex border-b-2 border-gold-200 pb-2 mb-2">
						<h4 className="text-2xl text-gold-200">Ритуальные венки, патриотические</h4>
					</motion.div>
					<motion.p
						variants={variantsText}
						initial="hidden"
						animate="visible"
						exit="hidden" 
						transition={{ duration: 0.5 }}
						className="text-xl text-base">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam et nostrum beatae doloribus deleniti natus odit perferendis? 
						Natus suscipit accusantium fugit, ducimus incidunt a itaque laboriosam perspiciatis dolorum deserunt. Autem?
					</motion.p>
				</>
				}
				{category === 'skull' &&
				<>
					<motion.div
						variants={variantsHeadline}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.5 }}
						className="inline-flex border-b-2 border-gold-200 pb-2 mb-2">
						<h4 className="text-2xl text-gold-200">Траурные корзины, из живых цветов</h4>
					</motion.div>
					<motion.p
						variants={variantsText}
						initial="hidden"
						animate="visible"
						exit="hidden" 
						transition={{ duration: 0.5 }}
						className="text-xl text-base">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam et nostrum beatae doloribus deleniti natus odit perferendis? 
						Natus suscipit accusantium fugit, ducimus incidunt a itaque laboriosam perspiciatis dolorum deserunt. Autem?
					</motion.p>
				</>
				}
				{category === 'gerland' &&
					<>
					<motion.div
						variants={variantsHeadline}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.5 }}
						className="inline-flex border-b-2 border-gold-200 pb-2 mb-2">
						<h4 className="text-2xl text-gold-200">Гирлянды в изголовье, из живых цветов</h4>
					</motion.div>
					<motion.p
						variants={variantsText}
						initial="hidden"
						animate="visible"
						exit="hidden" 
						transition={{ duration: 0.5 }}
						className="text-xl text-base">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam et nostrum beatae doloribus deleniti natus odit perferendis? 
						Natus suscipit accusantium fugit, ducimus incidunt a itaque laboriosam perspiciatis dolorum deserunt. Autem?
					</motion.p>
					</>
				}
			</div>
			<div className="hidden xl:flex items-center justify-center gap-x-10 pt-5">
					<div className="flex flex-col items-center justify-center gap-y-2">
						<motion.div 
							onClick={() => setCategory('cross')}
							variants={variantsButton}
							animate={category === 'cross' ? 'chacked' : 'dufault'}
							transition={{ duration: 0.3 }}
							className="rounded-[50%] overflow-hidden border-4 border-base w-[150px] h-[150px] relative cursor-pointer">
							<Image src={'/wreath_cross.png'} alt="icon" sizes="100%" fill/>
						</motion.div>
						<p className="text-xl text-gold-200 text-center">венки стандартные,<br /> эконом</p>
					</div>
					<div className="flex flex-col items-center justify-center gap-y-2">
						<motion.div
							onClick={() => setCategory('roses')}
							variants={variantsButton}
							animate={category === 'roses' ? 'chacked' : 'dufault'} 
							transition={{ duration: 0.3 }}
							className="rounded-[50%] overflow-hidden border-4 border-base w-[150px] h-[150px] relative cursor-pointer">
							<Image src={'/wreath_of_roses.png'} alt="icon" sizes="100%"fill/>
						</motion.div>
						<p className="text-xl text-gold-200 text-center">венки из живых цветов,<br /> премиум</p>
					</div>
					<div className="flex flex-col items-center justify-center gap-y-2">
						<motion.div
							onClick={() => setCategory('star')}
							initial="chacked"
							variants={variantsButton}
							animate={category === 'star' ? 'chacked' : 'dufault'} 
							transition={{ duration: 0.3 }}
							className="rounded-[50%] overflow-hidden border-4 border-base w-[150px] h-[150px] relative cursor-pointer">
							<Image src={'/wreath_star.png'} alt="icon" sizes="100%" fill/>
						</motion.div>
						<p className="text-xl text-gold-200 text-center">ритуальные венки,<br /> патриотические</p>
					</div>
					<div className="flex flex-col items-center justify-center gap-y-2">
						<motion.div 
							onClick={() => setCategory('skull')}
							variants={variantsButton}
							animate={category === 'skull' ? 'chacked' : 'dufault'}
							transition={{ duration: 0.3 }}
							className="rounded-[50%] overflow-hidden border-4 border-base w-[150px] h-[150px] relative cursor-pointer">
							<Image src={'/basket_skull.png'} alt="icon" sizes="100%" fill/>
						</motion.div>
						<p className="text-xl text-gold-200 text-center">траурные корзины,<br /> из живых цветов</p>
					</div>
					<div className="flex flex-col items-center justify-center gap-y-2">
						<motion.div 
							onClick={() => setCategory('gerland')}
							variants={variantsButton}
							animate={category === 'gerland' ? 'chacked' : 'dufault'}
							transition={{ duration: 0.3 }}
							className="rounded-[50%] overflow-hidden border-4 border-base w-[150px] h-[150px] relative cursor-pointer">
							<Image src={'/funreal_gerland.png'} alt="icon" sizes="100%" fill/>
						</motion.div>
						<p className="text-xl text-gold-200 text-center">гирлянды в изголовье,<br /> из живых цветов</p>
					</div>
			</div>	
		</>
	);
}

export default ToggleCategory;