import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProductView from '@/component/ProductView';
import type { IProduct } from '@/types/product';

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(`${process.env.API_URL}/catalog/${params.id}`, { cache: 'no-store' });
  if (response.status === 404) notFound();
  if (!response.ok) throw new Error('Не удалось загрузить товар');
  const data: IProduct = await response.json();
  if (!data) notFound();
  return (
    <main className="store-page">
      <div className="store-shell">
        <nav className="store-breadcrumb" aria-label="Хлебные крошки">
          <Link href="/" className="hover:text-gold-100">Главная</Link><span aria-hidden="true">/</span>
          <Link href="/catalog" className="hover:text-gold-100">Каталог</Link><span aria-hidden="true">/</span>
          <span className="text-gold-100" aria-current="page">{data.title}</span>
        </nav>
        <p className="store-eyebrow">{data.price > 0 ? 'Ритуальная композиция' : 'Индивидуальное оформление'}</p>
        <h1 className="store-title mb-8 mt-3">{data.title}</h1>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <div className="store-panel flex min-h-80 items-center justify-center bg-gradient-radial from-gold-200/10 p-6 sm:p-10">
            <Image width={600} height={600} priority sizes="(max-width: 1024px) 90vw, 550px" className="max-h-[600px] w-full object-contain" alt={data.title} src={data.photo ? `${process.env.API_URL}/${data.photo}` : '/default.png'} />
          </div>
          <ProductView key={data.id} data={data} />
          <section className="store-panel p-6 sm:p-8 lg:col-span-2">
            <h2 className="text-2xl text-gold-100">О композиции</h2>
            <p className="mt-4 max-w-3xl whitespace-pre-line leading-relaxed text-stone-300">{data.description || 'Детали оформления можно уточнить при подтверждении заказа.'}</p>
            <Link href="/catalog" className="mt-6 inline-block text-sm text-gold-100 underline underline-offset-4">← Вернуться в каталог</Link>
          </section>
        </div>
      </div>
    </main>
  );
}
