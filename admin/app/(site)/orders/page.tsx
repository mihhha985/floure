"use client"
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Card from "@mui/material/Card"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import type {IOrder} from "@/types/order";
import OrderItem from "@/component/OrderItem";


function Page() {
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [loadError, setLoadError] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function getData() {
			const result = await fetch('/api/backend/order');

			if(result.ok){
				const data = await result.json();
				setOrders(data);
				console.log(data);
			}else{
				setLoadError(true);
			}
		}
		
		getData().catch(() => setLoadError(true)).finally(() => setLoading(false));
	}, []);

	if (loadError) return <Typography role="alert">Не удалось загрузить данные. Обновите страницу.</Typography>;
	if(loading){
		return(
			<Box sx={{ 
				position: "absolute", 
				top: "50%", 
				left: "50%", 
				transform:"translate(-50%, -50%)"}}>
      	<CircularProgress />
    	</Box>
		);
	}
	
	return ( 
		<>
			<Breadcrumbs>
				<Typography color="text.primary">Заказы</Typography>
			</Breadcrumbs>
			<Stack spacing={2} mt={4}>
				{orders.length > 0
					?			
					orders.map((item:IOrder, index:number) => 
						<Card key={item.id}>
							<OrderItem	item={item} />
						</Card>
					)
					:
					<Typography
						textAlign={'center'}
						color={'text.secondary'} 
						variant="h4" 
						component="h4" 
						gutterBottom>
						Нет товаров
					</Typography>
				}
			</Stack>
		</>
	);
	
}

export default Page;