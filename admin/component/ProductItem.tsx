"use client"
import Image from "next/image";
import {useState} from "react";
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { IProduct } from '@/types/product';
import { useAppDispatch } from '@/store/hooks';
import { show } from '@/store/features/alertsSlice';
import { Box, Skeleton, Stack } from "@mui/material";

function ProductItem({item}:{item:IProduct}) {
	const dispatch = useAppDispatch();
	const [status, setStatus] = useState<boolean>(item.isActive);
	
	const statusHeandler = async () => {
			let data = await fetch(`/api/backend/catalog/${item.id}?status=${status}` , {
				method: "PUT"
			});

			if(data.ok){
				setStatus(prev => !prev);
				dispatch(show({
					text:`Товар "${item.title}" - ${!status ? 'активен' : 'не активен'}`,
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
			key={item.id}
			sx={{display:"flex", alignItems:"center", columnGap:"10px", padding:"10px 20px"}}
		>
			<Box>
				{item.photo
				 ?
				 <Image src={`${process.env.serverUrl}/${item.photo}`} height={80} width={80} alt={item.title} />
				 :
				 <Skeleton variant="rectangular" width={60} height={80} />
				}
			</Box>
			<Stack spacing={2}>
				<Typography variant="body1" mr={'auto'} mb={0} gutterBottom>
					{item.title}
				</Typography>
				<Typography variant="h6" mr={'auto'} mb={0} gutterBottom>
					Цена: {item.price} руб.
				</Typography>
			</Stack>
			<Stack sx={{ml:'auto'}} direction='row' spacing={2}>
				<Link href={`/product/update/${item.id}`}>
					<Tooltip title="Редактировать">
						<IconButton>
							<EditIcon />
						</IconButton>
					</Tooltip>
				</Link>
				<Switch  
				checked={status}
				onChange={statusHeandler}/>
			</Stack>
		</Card> 
	);
}

export default ProductItem;