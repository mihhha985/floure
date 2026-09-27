import './globals.css'
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Providers from '@/component/Provider';

const roboto = Roboto({
  weight: ['300','400','500','700'],
  style: ['normal', 'italic'],
  subsets: ['cyrillic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Админ панель',
  description: 'моя админ панель',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
				<Providers>
					{children}
				</Providers>
			</body>
    </html>
  )
}
