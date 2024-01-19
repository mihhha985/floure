import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import Providers from '@/component/Provaider'
import { headers } from 'next/headers'
const inter = Playfair_Display({ 
	subsets: ['cyrillic'],
	weight: ['400', '500', '700', '800'], 
	style: ['normal', 'italic'],
	variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Вечная Память - Ритуальные услуги, венки под заказ',
  description: 'Вечная Память - Ритуальные услуги, венки под заказ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
				<Providers>
					{children}
				</Providers>
      </body>
    </html>
  )
}
