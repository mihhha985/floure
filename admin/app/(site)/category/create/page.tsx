"use client"
import {useState} from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import {Box, Card, Grid, Button, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {ICreateCategory} from "@/types/category";
import { useAppDispatch } from '@/store/hooks';
import { show } from '@/store/features/alertsSlice';

function Page() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [title, setTitle] = useState<string>('');
	const [order, setOrder] = useState<number>(0);

	const create = async () => {

		const data:ICreateCategory = {
			name:title,
			order:order
		}
		
		const result = await fetch('/api/backend/category', {
			method:'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body:JSON.stringify(data)
		})

		if(result.ok){
			router.push('/category');
			dispatch(show({
				text:'Категория успешно добавленна!',
				type:'success',
			}));
		}else{
			dispatch(show({
				text:'Ошибка при добавлении категории! Перезагрузите страницу и попробуйте снова!',
				type:'error',
			}));
		}
	}

	return ( 
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Link href="/category">Категории</Link>
				<Typography color="text.primary">Создать</Typography>
			</Breadcrumbs>
			<Box maxWidth={"600px"} marginTop={4}>
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