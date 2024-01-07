"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { addProduct } from "@/store/features/orderSlice";
import Header from '@/component/Header'
import Footer from '@/component/Footer'
import CartPage from "@/component/CartPage";

export default function Template({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	console.log(process.env.API_URL);
	useEffect(() => {
		const order = localStorage.getItem("order");
		if (order) {
			const orderArr = JSON.parse(order);
			orderArr.forEach((product:any) => {
				dispatch(addProduct(product));	
				console.log(product.id);			
			});
		}
	}, [dispatch]);

  return (
		<div>
			<Header />
			{children}
			{pathname !== '/contact' && <Footer />}
			{pathname !== '/contact' && <CartPage />}
		</div>
	) 
}