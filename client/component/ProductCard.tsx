import Image from 'next/image';
import Link from 'next/link';
import CatalogButton from '@/component/CatalogButton';
import type { IProduct } from '@/types/product';

export default function ProductCard({ product }: { product: IProduct }) {
  const isExample = product.price <= 0;

  return (
    <article className="store-card">
      <Link href={`/product/${product.id}`} className="group relative flex h-72 items-center justify-center bg-[#19181b] p-4">
        <Image
          src={product.photo ? `${process.env.API_URL}/${product.photo}` : '/default.png'}
          alt={product.title}
          width={300}
          height={300}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 350px"
          className="max-h-full w-auto object-contain transition-transform group-hover:scale-105"
        />
        {isExample && <span className="absolute bottom-3 left-3 rounded-md bg-[#0f0e10]/90 px-3 py-1 text-xs text-gold-100">Иллюстративный пример</span>}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-widest text-stone-400">Артикул {product.articule}</p>
        <h2 className="mt-2 text-xl leading-snug text-gold-100"><Link href={`/product/${product.id}`}>{product.title.trim()}</Link></h2>
        <p className="mt-3 text-lg text-gold-200">{isExample ? 'Стоимость по запросу' : `${product.price.toLocaleString('ru-RU')} ₽`}</p>
        {isExample && <p className="mt-2 text-sm leading-relaxed text-stone-300">Состав и стоимость уточняются. Онлайн-заказ недоступен.</p>}
        <div className="mt-auto pt-5">
          {isExample ? (
            <Link href={`/product/${product.id}`} className="btn block px-4 py-3 text-center">Посмотреть пример</Link>
          ) : (
            <CatalogButton
              id={product.id}
              title={product.title}
              price={product.parametrs?.[0]?.cost ?? product.price}
              size={product.parametrs?.[0]?.size ?? 0}
              photo={product.photo}
              articule={product.articule}
            />
          )}
        </div>
      </div>
    </article>
  );
}
