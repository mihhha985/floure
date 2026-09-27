"use client"
import {useState} from "react";
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ICategory } from '@/types/category';
import { useAppDispatch } from '@/store/hooks';
import { show } from '@/store/features/alertsSlice';

function CategoryItem({item} : {item:ICategory}) {
	const dispatch = useAppDispatch();
	const [status, setStatus] = useState<boolean>(item.isActive);
	
	const statusHeandler = async () => {
			let data = await fetch(`/api/backend/category/${item.id}?status=${status}` , {
				method: "PUT"
			});

			if(data.ok){
				setStatus(prev => !prev);
				dispatch(show({
					text:`Категория "${item.name}" - ${!status ? 'активна' : 'не активна'}`,
					type: 'info'
				}))
			}else{
				dispatch(show({
					text:'Ошибка! Перезагрузите страницу и попробуйте снова!',
					type:'error',
				}))
			}
	}

	return ( 
		<Card 
			sx={{display:"flex", alignItems:"center", columnGap:"10px", padding:"10px 20px"}}
		>
			<Typography variant="h6" mr={'auto'} mb={0} gutterBottom>
				{item.name}
			</Typography>
			<Link href={`/category/update/${item.id}`}>
				<Tooltip title="Редактировать">
					<IconButton>
						<EditIcon />
					</IconButton>
				</Tooltip>
			</Link>
			<Switch 
				checked={status}
				onChange={statusHeandler}
			/>
		</Card>
	);
}

export default CategoryItem;