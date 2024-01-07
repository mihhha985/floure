"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { FaCartPlus } from "react-icons/fa";

function CartPage() {
	const pathname = usePathname();
	const {totalQuantity} = useAppSelector((state) => state.order);

	if(pathname !== '/cart'){
		return ( 
			<Link href="/cart" 
				className="fixed bottom-5 right-5 lg:bottom-10 lg:right-10 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-orange-100/70 
				text-base flex items-center justify-center">
				<div className="relative text-3xl lg:text-5xl z-50">
					<FaCartPlus />
				</div>
				<div className="absolute right-0 top-0 w-5 h-5 rounded-full bg-gold-200 flex items-center justify-center">
					<p className="text-white text-xl relative bottom-[2px]">
						{totalQuantity}
					</p>
				</div>
			</Link>
		);
	}
}

export default CartPage;