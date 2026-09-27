"use client";
import Link from 'next/link';
import { IoBagHandleOutline } from 'react-icons/io5';
import CartItems from '@/component/CartItems';
import OrderForm from '@/component/OrderForm';
import { useAppSelector } from '@/store/hooks';

export default function Page() {
  const { products, totalPrice = 0, totalQuantity = 0 } = useAppSelector(state => state.order);
  return (
    <main className="store-page">
      <div className="store-shell">
        <nav className="store-breadcrumb" aria-label="Хлебные крошки"><Link href="/" className="hover:text-gold-100">Главная</Link><span aria-hidden="true">/</span><Link href="/catalog" className="hover:text-gold-100">Каталог</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-gold-100">Корзина</span></nav>
        <p className="store-eyebrow">Ваш выбор</p>
        <h1 className="store-title mt-3">Корзина</h1>
        {products.length ? <>
          <p className="mt-4 max-w-2xl leading-relaxed text-stone-300">Проверьте композиции и детали оформления. Оставьте контакты, чтобы согласовать заказ.</p>
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 space-y-6">
              <section aria-labelledby="cart-items-title">
                <h2 id="cart-items-title" className="mb-5 text-xl text-gold-100">01 · Выбранные композиции</h2>
                <div className="space-y-4">{products.map(item => <CartItems item={item} key={item.id} />)}</div>
                <Link href="/catalog" className="mt-5 inline-block text-sm text-gold-100 underline underline-offset-4">← Продолжить выбор</Link>
              </section>
              <OrderForm />
            </div>
            <aside className="store-panel p-6 lg:sticky lg:top-8" aria-label="Сумма заказа">
              <h2 className="text-2xl text-gold-100">Ваш заказ</h2>
              <dl className="mt-6 space-y-4 text-sm text-stone-300">
                <div className="flex justify-between gap-4"><dt>Позиций</dt><dd>{products.length}</dd></div>
                <div className="flex justify-between gap-4"><dt>Количество</dt><dd>{totalQuantity} шт.</dd></div>
                <div className="flex items-baseline justify-between gap-4 border-t border-gold-200/20 pt-5 text-gold-100"><dt>Сумма товаров</dt><dd className="text-2xl" aria-live="polite">{totalPrice.toLocaleString('ru-RU')} ₽</dd></div>
              </dl>
              <p className="mt-5 text-sm leading-relaxed text-stone-400">Стоимость ленты, доставки и дополнительных пожеланий уточняется при подтверждении. Они не включены в сумму товаров.</p>
              <a href="#order-form" className="btn mt-6 flex min-h-[44px] items-center justify-center px-4">Перейти к заявке</a>
              <Link href="/contact" className="mt-4 block text-center text-sm text-gold-100 underline underline-offset-4">Вопросы по заказу</Link>
            </aside>
          </div>
        </> : <section className="store-panel mt-8 px-6 py-16 text-center">
          <IoBagHandleOutline className="mx-auto mb-6 text-5xl text-gold-200" aria-hidden="true" />
          <h2 className="text-2xl text-gold-100">В корзине пока нет товаров</h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-stone-300">Выберите композицию в каталоге. Здесь можно будет проверить количество, оформление и оставить заявку.</p>
          <Link href="/catalog" className="btn mt-7 inline-flex min-h-[44px] items-center px-7">Смотреть каталог</Link>
        </section>}
      </div>
    </main>
  );
}
