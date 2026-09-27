"use client"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter, usePathname } from 'next/navigation';
import { useMemo } from 'react';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function ButtonAppBar() {
	const router = useRouter();
	const pathname = usePathname();
	
	const head = useMemo(() => {
		switch(pathname){
			case '/main':
				return {
					title: 'Главная',
					icon: <OtherHousesIcon fontSize='large' />
				};
			case '/category':
				return {
					title: 'Категории',
					icon: <MenuBookIcon fontSize='large' />
				};
			case '/product':
				return {
					title:'Товары',
					icon: <StorefrontIcon fontSize='large' />
				};
			case '/orders':
				return {
					title:'Заказы',
					icon: <AddShoppingCartIcon fontSize='large' />
				};
			default:
				return {
					title: 'Главная',
					icon: <OtherHousesIcon fontSize='large'/>
				};
		}
	}, [pathname]);

  return (
    <Box
			sx={{ 
			flexGrow: 1,
		}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
					  <span style={{position:'relative', top:'5px', paddingRight:'20px'}}>
							{head.icon}
						</span>
            <span>
							{head.title}
						</span>
          </Typography>
          <Button 
					onClick={async () => { await fetch('/api/logout', { method: 'POST' }); router.replace('/'); router.refresh(); }}
						color="inherit"
					>
						<ExitToAppIcon />
						<span style={{position:'relative', top:'1px', left:'1px'}}>Выход</span>
					</Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
