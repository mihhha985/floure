import Link from 'next/link';
import ProductCard from '@/component/ProductCard';
import type { IProduct } from '@/types/product';

export const dynamic = 'force-dynamic';

export default async function Page() {
  let products: IProduct[] = [];
  try {
    const response = await fetch(`${process.env.API_URL}/catalog`, { cache: 'no-store' });
    if (response.ok) products = await response.json() as IProduct[];
  } catch {
    // Keep a useful empty state if the API is temporarily unavailable.
  }

  return products.length ? (
    <div>

      <div className="store-grid">
        {products.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  ) : (
    <div className="store-panel px-5 py-16 text-center">
      <h2 className="text-3xl text-gold-100">Каталог пока недоступен</h2>
      <p className="mt-3 text-stone-300">Попробуйте открыть страницу позже или вернитесь на главную.</p>
      <Link className="btn mt-8 inline-block px-6" href="/">На главную</Link>
    </div>
  );
}
