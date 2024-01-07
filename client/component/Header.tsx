"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { LiaCrossSolid } from "react-icons/lia";
import { HiOutlineViewList } from "react-icons/hi";
import {motion, AnimatePresence} from 'framer-motion';

const variants = {
	hidden: { 
		opacity: 0.8,
		x: "-100vw" 
	},
	visible: { 
		opacity: 1,
		x: 0,
	}
};

function Header() {
	const pathname = usePathname();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	return ( 
		<>
		<header className="flex items-center justify-between w-full h-16 lg:h-20 bg-[#26252a] px-5 absolute top-8 lg:top-10 z-50">
			<Image className="hidden lg:block" src={logo} alt="logo" width={40} height={60} />
			<div className='flex items-center'>
				<Link href="/" 
					className="text-2xl lg:text-4xl font-bold upp ercase text-gradient-logo">
					Вечная Память
				</Link>
			</div>
      <nav className="hidden lg:flex items-center text-xl relative">
				<div className='header-link-box'>
					<Link className="text-gradient-link hover:scale-105 relative z-10 p-5" href="/">Главная</Link>
					{pathname === '/' && <div className='marker-box'><LiaCrossSolid /></div>}
				</div>
				<div className='header-link-box'>
					<Link className="text-gradient-link hover:scale-105 relative z-10 p-5" href="/catalog">Каталог</Link>
					{pathname === '/catalog' && <div className='marker-box'><LiaCrossSolid /></div>}
				</div>
        <div className='header-link-box'>
					<Link className="text-gradient-link hover:scale-105 relative z-10 p-5" href="/contact">Контакты</Link>
					{pathname === '/contact' && <div className='marker-box'><LiaCrossSolid /></div>}
				</div>
      </nav>
			<Image className="hidden lg:block" src={logo} alt="logo" width={40} height={60} />
			<div className='lg:hidden p-5' onClick={() => setIsVisible(true)}>
				<HiOutlineViewList className="text-4xl lg:hidden text-gold-200" />
			</div>
    </header>
		<AnimatePresence mode="wait">
			{isVisible && 
				<motion.div
					initial="hidden"
					animate="visible"
					variants={variants}
					exit="hidden" 
					transition={{duration: 0.5}}
					className="absolute top-0 left-0 w-full h-full bg-[#0f0e10] flex flex-col gap-y-10 z-50"
				>
					<div 
						onClick={() => setIsVisible(false)}
						className='flex items-center justify-between p-5 cursor-pointer'>
						<Image src={logo} alt="logo" width={40} height={60} />
						<Link href="/" 
							className="text-2xl lg:text-4xl font-bold upp ercase text-gradient-logo">
							Вечная Память
						</Link>
						<Image src={logo} alt="logo" width={40} height={60} />
					</div>
					<nav className="flex flex-col text-xl relative">
						<div className='mobile-header-link-box'>
							<Link onClick={() => setIsVisible(false)} className="text-gradient-link" href="/">Главная</Link>
							{pathname === '/' && <div className='m-marker-box'><LiaCrossSolid /></div>}
						</div>
						<div className='mobile-header-link-box'>
							<Link onClick={() => setIsVisible(false)} className="text-gradient-link" href="/catalog">Каталог</Link>
							{pathname === '/catalog' && <div className='m-marker-box'><LiaCrossSolid /></div>}
						</div>
						<div className='mobile-header-link-box'>
							<Link onClick={() => setIsVisible(false)} className="text-gradient-link" href="/contact">Контакты</Link>
							{pathname === '/contact' && <div className='m-marker-box'><LiaCrossSolid /></div>}
						</div>
					</nav>
				</motion.div>
			}
		</AnimatePresence>
		</>
	);
}

export default Header;