'use client'

export default function Error({error, reset,}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
 
  return (
    <section className='section pb-32'>
      <h2 className='text-center text-4xl text-gold-200 mt-20'>Ошибка при получении продукта!</h2>
			<h4 className='text-center text-2xl text-gold-200 mt-2'>Попробуйте перезагрузить страницу или вернитесь на главную!</h4>
			<div className='flex items-center justify-center mt-10'>
				<button
					className='btn px-5'
					onClick={() => reset()}
				>
					Перезагрузить!
				</button>
			</div>
    </section>
  )
}