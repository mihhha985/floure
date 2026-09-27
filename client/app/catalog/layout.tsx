import Link from 'next/link';

export default function CatalogLayout({ children, category }: { children: React.ReactNode; category: React.ReactNode }) {
  return (
    <main className="store-page">
      <div className="store-shell">
        <nav className="store-breadcrumb" aria-label="Хлебные крошки"><Link href="/" className="hover:text-gold-100">Главная</Link><span aria-hidden="true">/</span><span className="text-gold-100">Каталог</span></nav>
        <p className="store-eyebrow">Память в каждой детали</p>
        <h1 className="store-title mt-3">Каталог композиций</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-stone-300">Венки с указанной стоимостью и примеры оформления под заказ. Для примеров состав, размер и цена согласуются индивидуально.</p>
        <div className="scroll mb-8 mt-7 overflow-x-auto border-y border-gold-200/20 py-3">{category}</div>
        {children}
      </div>
    </main>
  );
}
