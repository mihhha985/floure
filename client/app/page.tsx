import Image from 'next/image';
import Link from 'next/link';
import Material from '@/component/Material';
import ProductCard from '@/component/ProductCard';
import type { IProduct } from '@/types/product';

type FeaturedProduct = IProduct;

async function catalogProducts(): Promise<FeaturedProduct[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/catalog`, { cache: 'no-store' });
    if (!response.ok) return [];
    const products = await response.json() as FeaturedProduct[];
    return products;
  } catch { return []; }
}

export const dynamic = 'force-dynamic';

export default async function Page() {
  const catalog = await catalogProducts();
  const products = catalog.filter(product => product.isActive && product.price > 0).slice(0, 3);
  const examples = catalog.filter(product => product.price === 0).slice(0, 3);
  return (
    <main>
      <section className="relative flex min-h-[680px] items-end bg-[url('/header.jpg')] bg-cover bg-center px-5 pb-16 pt-44 sm:pt-52">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e10] via-[#0f0e10]/75 to-[#0f0e10]/20" />
        <div className="store-shell relative">
          <p className="mb-5 text-sm uppercase tracking-[0.22em] text-gold-100">Вечная Память · ритуальные композиции</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-gold-100 sm:text-5xl lg:text-6xl">Цветы, которые помогают выразить память и уважение</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-200">В каталоге представлены траурные венки с указанной ценой и примеры композиций под заказ. Посмотрите фотографии и описания, чтобы выбрать подходящее оформление.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link className="btn px-7 py-3" href="/catalog">Смотреть каталог</Link>
            <Link className="rounded-2xl border border-gold-200 px-7 py-3 text-gold-100 transition hover:bg-gold-200/20" href="/contact">Как связаться</Link>
          </div>
        </div>
      </section>

      <section className="store-shell py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-gold-200">Каталог</p>
            <h2 className="mt-3 store-title">Выберите композицию</h2>
            <p className="mt-3 max-w-2xl text-stone-300">Венки с указанной стоимостью. Состав и условия выполнения уточняются при подтверждении заказа.</p>
          </div>
          <Link className="text-gold-100 underline underline-offset-4" href="/catalog">Все товары →</Link>
        </div>
        {products.length > 0 ? (
          <div className="store-grid mt-8">
            {products.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : <p className="mt-8 text-stone-300">Товары временно недоступны. Попробуйте открыть каталог позже.</p>}
      </section>

      {examples.length > 0 && <section className="border-y border-gold-200/30 bg-[#1b1a1d] py-16 sm:py-20">
        <div className="store-shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-gold-200">Под заказ</p>
              <h2 className="mt-3 store-title">Идеи для личного оформления</h2>
              <p className="mt-3 max-w-2xl text-stone-300">Эти изображения показывают возможное оформление. Готовых изделий в наличии нет; состав, размер и стоимость согласуются отдельно.</p>
            </div>
            <Link className="text-gold-100 underline underline-offset-4" href="/catalog">Открыть каталог →</Link>
          </div>
          <div className="store-grid mt-8">
            {examples.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>}

      <section className="relative overflow-hidden bg-[#1b1a1b]">
        <Image src="/memorial-flowers.png" alt="Белые цветы и траурная лента" fill sizes="100vw" className="object-cover object-center opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b1a1b] via-[#1b1a1b]/80 to-transparent" />
        <div className="relative store-shell py-20 sm:py-28">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-widest text-gold-200">О выборе</p>
            <h2 className="mt-3 store-title">Внимание к деталям</h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-200">В каталоге собраны композиции разных оттенков. Если для товара с указанной ценой нужна траурная лента, укажите это при оформлении заказа. Состав и доступность конкретного оформления уточняются при подтверждении.</p>
            <Link className="mt-7 inline-block text-gold-100 underline underline-offset-4" href="/catalog">Перейти к выбору →</Link>
          </div>
        </div>
      </section>

      <section className="store-shell py-16 sm:py-24">
        <p className="text-sm uppercase tracking-widest text-gold-200">Полезно знать</p>
        <h2 className="mt-3 store-title">Как оформить заказ</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ['01', 'Выберите товар', 'Откройте карточку, посмотрите описание и доступные размеры.'],
            ['02', 'Укажите детали', 'Добавьте товар в корзину, задайте количество и при необходимости выберите ленту.'],
            ['03', 'Отправьте заявку', 'Оставьте контактные данные. Мы уточним состав, наличие и условия выполнения до подтверждения заказа.'],
          ].map(([number, title, description]) => (
            <div key={number} className="store-panel p-6">
              <span className="text-3xl text-gold-200">{number}</span>
              <h3 className="mt-5 text-xl text-gold-100">{title}</h3>
              <p className="mt-3 leading-relaxed text-stone-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-gold-200/30 py-16">
        <div className="store-shell">
          <h2 className="store-title">Цветы в композиции</h2>
          <p className="mt-3 max-w-2xl text-stone-300">Оттенок и фактура цветов помогают подобрать сдержанное, личное оформление. Фотографии товаров и их описания находятся в каталоге.</p>
          <Material />
        </div>
      </section>
    </main>
  );
}
