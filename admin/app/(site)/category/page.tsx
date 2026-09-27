"use client"
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch } from '@/store/hooks';
import { show } from '@/store/features/alertsSlice';

import Link from 'next/link';
import { ICategory } from '@/types/category';
import Helpers from '@/helpers';
import CategoryItem from '@/component/CategoryItem';

function Page() {
	const dispatch = useAppDispatch();
	const [category, setCategory] = useState<ICategory[] | []>([]);
	const [loadError, setLoadError] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);
	
	useEffect(() => {
		async function getData() {
			const result = await fetch('/api/backend/category');

			if(result.ok){
				const data = await result.json();
				let sorted = Helpers.sortedItems(data);
				setLoading(false);
				setCategory(sorted);
			}else{
				dispatch(show({
					text:'Ошибка при получении категорий! Перезагрузите страницу и попробуйте снова!',
					type:'error',
				}));
			}
		}

		getData().catch(() => setLoadError(true)).finally(() => setLoading(false));
	}, [dispatch]);

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
				<Typography color="text.primary">Категории</Typography>
			</Breadcrumbs>
			<Stack spacing={2} mt={4}>
				{category.length > 0
					?			
					category.map((item:ICategory) => 
						<CategoryItem key={item.id} item={item} />
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
			<Link 
				style={{ position: 'fixed', bottom: 16, right: 16 }}
				href="/category/create">
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