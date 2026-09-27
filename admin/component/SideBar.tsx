"use client"
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function SideBar() {
	const router = useRouter();
	
	return ( 
		<Box sx={{ 
			width: '100%', 
			bgcolor: 'background.paper', 
			borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
			<nav aria-label="main mailbox folders">
				<List>
					<ListItem 
					onClick={() => router.push('/main')}	
					disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<OtherHousesIcon />
							</ListItemIcon>
							<ListItemText primary="Главная" />
						</ListItemButton>
					</ListItem>
					<ListItem 
					onClick={() => router.push('/category')}
					disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<MenuBookIcon />
							</ListItemIcon>
							<ListItemText primary="Категории" />
						</ListItemButton>
					</ListItem>
					<ListItem 
					onClick={() => router.push('/product')}
					disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<StorefrontIcon />
							</ListItemIcon>
							<ListItemText primary="Товары" />
						</ListItemButton>
					</ListItem>
					<ListItem 
					onClick={() => router.push('/orders')}
					disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<AddShoppingCartIcon />
							</ListItemIcon>
							<ListItemText primary="Заказы" />
						</ListItemButton>
					</ListItem>
				</List>
			</nav>
			<Divider />
		</Box>
	);
}

export default SideBar;
