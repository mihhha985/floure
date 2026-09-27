"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, TextField} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Home() {
	const router = useRouter();
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const authHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await fetch('/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: login, password }),
      });
      if (!result.ok) { setError('Неверный логин или пароль'); return; }
      router.replace('/main');
      router.refresh();
    } catch { setError('Не удалось связаться с сервером'); }
    finally { setLoading(false); }
	}

  return (
    <form onSubmit={authHandler}>
		<Card sx={{width:"380px", m:"5vh auto"}} variant='outlined'>
			<CardContent>
					<Typography variant="h3" gutterBottom>Вход</Typography>
					<TextField 
						label="Login" 
						variant="standard"
						onChange={e => setLogin(e.target.value)} 
						value={login}
						autoComplete="username"
						required
					/>
					<TextField
						label="Password"
						variant="standard" 
						type="password"
						autoComplete="current-password"
						onChange={e => setPassword(e.target.value)}
						value={password}
						required
					/>
					{error && <Typography role="alert" color="error">{error}</Typography>}
			</CardContent>
			<CardActions>
				<Button
					type='submit'
					disabled={loading}
					variant="contained">
					{loading ? 'Вход…' : 'Войти'}
				</Button>
			</CardActions>
		</Card>
    </form>
  )
}
