import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import Providers from '@/component/Provaider'
const inter = Playfair_Display({ 
	subsets: ['cyrillic'],
	weight: ['400', '500', '700', '800'], 
	style: ['normal', 'italic'],
	variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Вечная Память — траурные венки и цветочные композиции',
  description: 'Каталог траурных венков с указанной стоимостью и примеры цветочных композиций под заказ. Посмотрите фотографии, состав и варианты оформления.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
				<Providers>
					{children}
				</Providers>
      </body>
    </html>
  )
}
