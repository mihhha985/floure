"use client"
import {useEffect, useState, useMemo} from "react";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { show } from '@/store/features/alertsSlice';
import { getAll } from "@/store/features/productsSlice";
import Helpers from '@/helpers';
import Link from 'next/link';
import { IProduct } from '@/types/product';
import ProductItem from "@/component/ProductItem";
import SortedProducts from "@/component/SortedProducts";

function Page() {
	const dispatch = useAppDispatch();
	const {total, products} = useAppSelector(state => state.products);
	const [page, setPage] = useState<number>(1);
	const [loadError, setLoadError] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function getData() {
			const result = await fetch('/api/backend/catalog');

			if(result.ok){
				const data = await result.json();
				let sorted = Helpers.sortedItems(data);
				dispatch(getAll(sorted));
			}else{
				dispatch(show({
					text:'Ошибка при получении продуктов! Перезагрузите страницу и попробуйте снова!',
					type:'error',
				}));
			}
		}
		
		getData().catch(() => setLoadError(true)).finally(() => setLoading(false));
	}, [dispatch]);

	const pages = useMemo(() => {
		return Math.ceil(total / 10);
	}, [total]);

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
				<Typography color="text.primary">Товары</Typography>
			</Breadcrumbs>
			<SortedProducts />
			<Stack spacing={2} mt={4}>
				{products.length > 0
					?			
					products.slice((Math.min(page, pages || 1) - 1) * 10, Math.min(page, pages || 1) * 10).map((item:IProduct) =>
						<ProductItem key={item.id} item={item} />
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
			{products.length > 10 &&
				<Stack spacing={2} style={{marginTop:'auto', paddingTop:"40px"}}>
					<Pagination 
						page={page} 
						onChange={(e, value) => setPage(value)}
						count={pages} 
						color="primary" />
				</Stack>
			}
			<Link 
				style={{ position: 'fixed', bottom: 16, right: 16 }}
				href="/product/create">
				<SpeedDial
					ariaLabel="SpeedDial basic example"
					icon={<SpeedDialIcon />}
				>
				</SpeedDial>
			</Link>
		</>
	);
	
}

export default Page;