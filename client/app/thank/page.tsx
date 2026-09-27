import Link from 'next/link';

export default function Page() {
  return (
    <main className="store-page px-5">
      <div className="store-panel mx-auto max-w-xl p-8 text-center sm:p-12">
        <h1 className="store-title">Спасибо за заявку</h1>
        <p className="mt-5 leading-relaxed text-stone-300">Мы получили ваш заказ. Состав композиции, наличие и условия выполнения уточняются до подтверждения.</p>
        <Link href="/catalog" className="btn mt-8 inline-flex min-h-[44px] items-center px-6">Вернуться в каталог</Link>
      </div>
    </main>
  );
}
