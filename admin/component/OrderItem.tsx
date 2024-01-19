"use client"
import {useState} from "react";
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MessageIcon from '@mui/icons-material/Message';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import type {IOrder, OrderStatusType, IOrderProduct} from "@/types/order";
import { useAppDispatch } from '@/store/hooks';
import { show } from '@/store/features/alertsSlice';
import { Card, Box, Grid } from "@mui/material";

function OrderItem({item}: {item:IOrder}) {
	const dispatch = useAppDispatch();
	const [status, setStatus] = useState<OrderStatusType>(item.status);
	const [open, setOpen] = useState<boolean>(false);
	const [openComment, setOpenComment] = useState<boolean>(false);
	const [comment, setComment] = useState<string>(item.comment);
	//console.log(item);
	const handleChange = async (event: SelectChangeEvent) => {
		const result = await fetch(process.env.serverUrl + '/order/status/' + item.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				status: event.target.value
			})
		});

		if(result.ok){
			setStatus(event.target.value as OrderStatusType);
			dispatch(show({
				text:'Статус успешно изменен!',
				type:'success',
			}))
		}else{
			dispatch(show({
				text:'Ошибка! Перезагрузите страницу и попробуйте снова!',
				type:'error',
			}))
		}
  };

	const handleComment = async (e:InputEvent) => {
		const result = await fetch(process.env.serverUrl + '/order/comment/' + item.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				comment: comment
			})
		});

		if(result.ok){
			dispatch(show({
				text:'Коментарий успешно сохранен!',
				type:'success',
			}))
		}else{
			dispatch(show({
				text:'Ошибка! Перезагрузите страницу и попробуйте снова!',
				type:'error',
			}))
		}

		setOpenComment(false);
	}

	return ( 
		<>
		<Grid 
			p={2}
			columnGap={2}
			direction={"row"} 
			container>
			<Grid
				display={"flex"}
				flexDirection={"column"} 
				item>
				<Typography variant="h5" fontWeight={"bold"} mb={0}>
					Заказ №{item.id}
				</Typography>
				<Typography variant="h6" mt={2} mb={0}>
					<span style={{fontWeight:"bold"}}>ФИО:</span> {item.fio}
				</Typography>
				<Typography variant="h6" mb={0}>
					<span style={{fontWeight:"bold"}}>Телефон:</span> {item.phone}
				</Typography>
			</Grid>
			<Grid 
				display={"flex"}
				flexDirection={"column"} 
				flexGrow={1} 
				item>
				<Typography variant="h6" gutterBottom>
					<span style={{fontWeight:"bold"}}>Адрес:</span>
				</Typography>
				<Typography variant="body1" gutterBottom>
					{item.adres}
				</Typography>
				<Typography variant="body2" color={"GrayText"} mt={"auto"}>
					<span>Дата:</span> {item.date}
				</Typography>
			</Grid>
			<Grid 
				display={"flex"}
				flexDirection={"column"} 
				item>
				<Typography variant="h6" gutterBottom>
					<span style={{fontWeight:"bold"}}>Коментарий:</span>
				</Typography>
				<Typography variant="body1" gutterBottom>
					{comment}
				</Typography>
			</Grid>
			<Grid
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"space-between"} 
				item>
				<Box sx={{ width: 160 }}>
					<FormControl fullWidth>
						<InputLabel>Статуc:</InputLabel>
						<Select
							sx={{color:"gray"}}
							size="small"
							defaultValue={status}
							value={status}
							label={status}
							onChange={handleChange}
						>
							<MenuItem value={"start"} selected>Start</MenuItem>
							<MenuItem value={"confirmed"}>Confirmed</MenuItem>
							<MenuItem value={"cancelled"}>Cancelled</MenuItem>
							<MenuItem value={"completed"}>Completed</MenuItem>
							<MenuItem value={"refusal"}>Refusal</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<ButtonGroup variant="contained" sx={{marginTop:"20px"}}>
					<Button>
						<EditIcon sx={{color:"white"}} />
					</Button>
					<Button onClick={() => setOpen(true)}>
						<RemoveRedEyeIcon sx={{color:"white"}} />	
					</Button>
					<Button onClick={() => setOpenComment(true)}>
						<MessageIcon sx={{color:"white"}} />
					</Button>
				</ButtonGroup>
			</Grid>
		</Grid>
		<Dialog onClose={() => setOpen(false)} open={open}>
			<DialogTitle>Заказ №{item.id}</DialogTitle>
			<Grid
				p={2} 
				container>
				{item.products.map((product:IOrderProduct) =>
					<Grid key={product.id} item>
						<Card sx={{padding:"5px"}}>
							<Grid display={"flex"}>
								<Box>
									<Typography variant="h6" gutterBottom>
										{product.title}
									</Typography>
									<Typography variant="body1" gutterBottom>
										Цена: {product.price} руб.
									</Typography>
									<Typography variant="body1" gutterBottom>
										Количество: {product.quantity} шт.
									</Typography>
								</Box>
								{product.lent &&
									<Box>
										<Typography variant="h5" gutterBottom>
											Лента
										</Typography>
										<Typography variant="body1" gutterBottom>
											Цвет: {product.color}
										</Typography>
										<Typography variant="body2" gutterBottom>
											Тест: {product.text}
										</Typography>
									</Box>
								}
							</Grid>
						</Card>
					</Grid>
				)}
			</Grid>
		</Dialog>
		<Dialog onClose={handleComment} open={openComment}>
			<DialogTitle>Заказ №{item.id}</DialogTitle>
			<Box padding={2} width={'380px'}>
				<TextField
					fullWidth
					onChange={(e) => setComment(e.target.value)}
					value={comment}
          id="filled-multiline-flexible"
          label="Коментарий"
          multiline
          rows={4}
        />
			</Box>
		</Dialog>
		</>
	);
}

export default OrderItem;