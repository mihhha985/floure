import Link from 'next/link';
import ProductCard from '@/component/ProductCard';
import type { IProduct } from '@/types/product';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
  let products: IProduct[] = [];
  try {
    const response = await fetch(`${process.env.API_URL}/catalog/category/${params.id}`, { cache: 'no-store' });
    if (response.ok) products = await response.json() as IProduct[];
  } catch {
    // An empty state is clearer than a server error while the API is unavailable.
  }

  return products.length ? (
    <div className="store-grid">
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  ) : (
    <div className="store-panel px-5 py-16 text-center">
      <h2 className="text-3xl text-gold-100">В этой категории пока нет товаров</h2>
      <p className="mt-3 text-stone-300">Посмотрите другие композиции в каталоге.</p>
      <Link className="btn mt-8 inline-block px-6" href="/catalog">Все товары</Link>
    </div>
  );
}
