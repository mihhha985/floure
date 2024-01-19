"use client"
import React, {useState, useEffect} from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import {Box, Card, Grid, Button, TextField} from '@mui/material';
import {Input, InputLabel, InputAdornment, FormControl} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { ICategory, ICategorySelected } from '@/types/category';
import { InfoType } from "@/types/product";
import { useAppDispatch } from '@/store/hooks';
import { show } from '@/store/features/alertsSlice';

function Page() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const create = async () => {
		let formData = new FormData();
		if(category && category.id !== undefined){
			formData.append('category', category.id.toString());
			formData.append('title', title);
			formData.append('description', description);
			formData.append('articule', articule);
			formData.append('price', price);
			formData.append('file', file as File);
			formData.append('info', JSON.stringify(info));
			//console.log(info);
			
			const result = await fetch(process.env.serverUrl + '/catalog', {
				method: 'POST',
				body: formData
			})
			
			if(result.ok){
				router.push('/product');
				dispatch(show({
					text:'Товар успешно добавлен!',
					type:'success',
				}));
			}else{
				dispatch(show({
					text:'Ошибка при добавлении товара! Перезагрузите страницу и попробуйте снова!',
					type:'error',
				}));
			}
			
		}
	}

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
		 setFile(file);
		} else {
		  setFile(null);
		}
	};

	useEffect(() => {
	  async function getData(){
			const result = await fetch(process.env.serverUrl + '/category');

			if(result.ok){
				const data = await result.json();
				const arr:ICategorySelected[] = data.map((item:ICategory) => ({id:item.id, label:item.name}))
				setCategories(arr); 
			}else{
				dispatch(show({
					text:'Ошибка при получении категорий! Перезагрузите страницу и попробуйте снова!',
					type:'error',
				}));
			}
		}

		getData();
	}, [dispatch]);

	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [articule, setArticule] = useState<string>('');
	const [price, setPrice] = useState<string>('');
	const [file, setFile] = useState<File | null>(null);
	const [categories, setCategories] = useState<ICategorySelected[] | []>([]);
	const [category, setCategory] = useState<ICategorySelected>({});
	const [info, setInfo] = useState<InfoType[] | []>([]);
	
	return ( 
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Link href="/product">Товары</Link>
				<Typography color="text.primary">Создать</Typography>
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
							onChange={e => setDescription(e.target.value)}
							value={description}
							label="Описание" 
							variant="standard"
							rows={4}
							multiline
							required 
						/>						
						<FormControl fullWidth sx={{ m: 1 }} variant="standard">
							<InputLabel htmlFor="standard-adornment-amount">Артикуль *</InputLabel>
							<Input
								value={articule}
								onChange={e => setArticule(e.target.value)}
								id="standard-adornment-amount"
								startAdornment={<InputAdornment position="start">@</InputAdornment>}
								required
							/>
						</FormControl>	
						<FormControl fullWidth sx={{ m: 1 }} variant="standard">
							<InputLabel htmlFor="standard-adornment-amount">Цена *</InputLabel>
							<Input
								value={price}
								onChange={e => setPrice(e.target.value)}
								id="standard-adornment-amount"
								startAdornment={<InputAdornment position="start">&#8381;</InputAdornment>}
								required
							/>
						</FormControl>							
						<Autocomplete
							onChange={(event: any, newValue: any) => {
								setCategory(newValue);
							}}
							disablePortal
							id="combo-box-demo"
							options={categories}
							sx={{ width: 300 }}
							renderInput={(params) => <TextField key={params.id} {...params} label="Категории" />}
						/>
						<Input 
							type="file" 
							onChange={handleFileInputChange}
						/>
						<Grid container>
						{info.map((item:InfoType, index:number) => (
								<Grid 
									width={"100%"}
									display={"flex"}
									alignItems={"center"}
									justifyContent={"space-between"}
									key={index}
									item>
									<TextField 
										onChange={e => {
											const arr = [...info];
											arr[index].size = e.target.value;
											setInfo(arr);
										}}
										value={item.size}
										label="Размер" 
										variant="standard"
										required 
									/>
									<TextField 
										onChange={e => {
											const arr = [...info];
											arr[index].cost = e.target.value;
											setInfo(arr);
										}}
										value={item.cost}
										label="Цена" 
										variant="standard"
										required 
									/>
									<Button 
										onClick={() => {
											const arr = [...info];
											arr.splice(index, 1);
											setInfo(arr);
										}}
										color="error"
										variant="outlined">
										Удалить
									</Button>
								</Grid>
							))}	
							
							<Button 
								sx={{mt:"40px"}}
								variant="contained" 
								onClick={() => setInfo([...info, {size:'', cost:''}])}>
								Добавить характеристику
							</Button>
						</Grid>					
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