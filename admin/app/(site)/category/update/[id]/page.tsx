"use client"
import {useState, useEffect} from "react";
import Link from 'next/link';
import { useRouter, useParams } from "next/navigation";
import {Box, Card, Grid, Button, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {ICreateCategory, ICategory} from "@/types/category";
import { useAppDispatch } from '@/store/hooks';
import { show } from '@/store/features/alertsSlice';

function Page() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {id} = useParams();
	const [title, setTitle] = useState<string>('');
	const [order, setOrder] = useState<number>(0);

	useEffect(() => {
		async function getData() {
			const result = await fetch('/api/backend/category/' + id);

			if(result.ok){
				const data = await result.json();
				setTitle(data.name);
				setOrder(data.order);
			}else{
				router.push('/category');
				dispatch(show({
					text:'Ошибка при получении категории! Перезагрузите страницу и попробуйте снова!',
					type:'error',
				}));
			}
		}

		getData();
	}, [id, router, dispatch]);


	const create = async () => {

		const data:ICreateCategory = {
			name:title,
			order:order
		}
		
		let result = await fetch('/api/backend/category/' + id, {
			method:'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body:JSON.stringify(data)
		});


		if(result.ok){
			router.push('/category');
			dispatch(show({
				text:'Категория успешно отредактированна!',
				type:'success',
			}));
		}else{
			dispatch(show({
				text:'Ошибка при редактировании категории! Перезагрузите страницу и попробуйте снова!',
				type:'error',
			}));
		}
	}

	return ( 
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Link href="/category">Категории</Link>
				<Typography color="text.primary">Редактировать</Typography>
			</Breadcrumbs>
			<Box
				component="form" 
				maxWidth={"600px"} 
				marginTop={4}>
      	<Card variant="outlined">
					<Grid 
						container
						flexDirection="column" 
						rowGap={4}
						p={2}
					>
						<TextField 
							onChange={e => setTitle(e.target.value)}
							value={title}
							label="Наименование" 
							variant="standard"
							required 
						/>
						<TextField
							focused
							onChange={e => setOrder(Number(e.target.value))}
							value={order}
							type="number" 
							label="Порядок" 
							variant="standard" 
						/>
						<Grid mt={2}>
							<Button 
								onClick={create}
								variant="contained">
								Сохранить
							</Button>
						</Grid>
					</Grid>
				</Card>
    	</Box>
		</>
	);
}

export default Page;