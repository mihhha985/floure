import Link from 'next/link'
 
export default function NotFound() {
  return (
    <section className='section pb-32'>
			<h2 className='text-center text-4xl text-gold-200 mt-20'>Ошибка 404!!!</h2>
			<h4 className='text-center text-2xl text-gold-200 mt-2'>Страница не существует или была удаленна вернитесь на главную!</h4>
			<div className='flex items-center justify-center mt-10'>
				<Link className="btn px-5" href={'/'}>Главная</Link>
			</div>
		</section>
  )
}