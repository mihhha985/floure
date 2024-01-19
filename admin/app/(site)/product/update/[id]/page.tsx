"use client"
import {useState, useEffect} from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from "next/navigation";
import {Box, Card, Grid, Button, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Input, InputLabel, InputAdornment, FormControl} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { InfoType } from "@/types/product";
import { useAppDispatch } from '@/store/hooks';
import { show } from '@/store/features/alertsSlice';
import { ICategory, ICategorySelected } from '@/types/category';

function Page() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {id} = useParams();

	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [articule, setArticule] = useState<string>('');
	const [price, setPrice] = useState<string>('');
	const [photo, setPhoto] = useState<string>('');
	const [file, setFile] = useState<File | null>(null);
	const [categories, setCategories] = useState<ICategorySelected[] | []>([]);
	const [category, setCategory] = useState<ICategorySelected>({});
	const [info, setInfo] = useState<InfoType[] | []>([]);

	useEffect(() => {
		async function getData() {
			const result = await fetch(process.env.serverUrl + '/catalog/' + id);
			console.log(result);
			if(result.ok){
				const data = await result.json();
				console.log(data);
				setTitle(data.title);
				setDescription(data.description);
				setPrice(data.price);
				setPhoto(data.photo);
				setArticule(data.articule)
				setCategory({id:data.category.id, label:data.category.name});
				setInfo(data.parametrs);
			}else{
				router.push('/product');
				dispatch(show({
					text:'Ошибка при получении продукта! Перезагрузите страницу и попробуйте снова!',
					type:'error',
				}));
			}
		}

		getData();
	}, [id, router, dispatch]);

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

	const create = async () => {
		let formData = new FormData();
		if(category && category.id !== undefined){
			formData.append('category', category.id.toString());
			formData.append('title', title);
			formData.append('description', description);
			formData.append('articule', articule);
			formData.append('price', price);
			formData.append('info', JSON.stringify(info));
			if(file) formData.append('file', file as File);
			const result = await fetch(process.env.serverUrl + '/catalog/' + id, {
				method: 'PATCH',
				body: formData
			})

			if(result.ok){
				router.push('/product');
				dispatch(show({
					text:'Товар успешно отредактирован!',
					type:'success',
				}));
			}else{
				dispatch(show({
					text:'Ошибка при редактировании товара! Перезагрузите страницу и попробуйте снова!',
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

	return ( 
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Link href="/product">Товары</Link>
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
							
							value={category}
							onChange={(event: any, newValue: any) => {
								setCategory(newValue);
							}}
							
							options={categories}
							sx={{ width: 300 }}
							renderInput={(params) => <TextField {...params} label="Категории" />}
						/>
						{photo
							? 
							<Box sx={{
								p:"10px", 
								mr:'20px',
								border:"1px solid #ccc",
								textAlign:"center",
								position:"relative",
							}}>
								<Box 
								onClick={() => setPhoto('')}
								sx={{
									position:"absolute",
									top:"10px",
									right:"10px",
									cursor:"pointer",
									opacity:"0.8",
								}}>
									<HighlightOffIcon color="warning"/>
								</Box>
								<Image src={process.env.serverUrl + '/' + photo} alt={title} width={200}  height={200}/>
							</Box>
							:	
							<Input type="file" onChange={handleFileInputChange}/>
						}
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
										label="Название" 
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
										label="Значение" 
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