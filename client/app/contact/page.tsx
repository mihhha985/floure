import Link from 'next/link';
import { IoCallOutline, IoMailOutline, IoLocationOutline, IoTimeOutline } from 'react-icons/io5';

const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim();
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const address = process.env.NEXT_PUBLIC_CONTACT_ADDRESS?.trim();
const hours = process.env.NEXT_PUBLIC_CONTACT_HOURS?.trim();

export default function Page() {
  const contacts = [
    { title: 'Телефон', value: phone, href: phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined, icon: IoCallOutline },
    { title: 'Электронная почта', value: email, href: email ? `mailto:${email}` : undefined, icon: IoMailOutline },
    { title: 'Адрес', value: address, icon: IoLocationOutline, href: undefined },
    { title: 'Часы работы', value: hours, icon: IoTimeOutline, href: undefined },
  ].filter(item => item.value);
  return (
    <main className="store-page">
      <div className="store-shell">
        <nav className="store-breadcrumb" aria-label="Хлебные крошки"><Link href="/" className="hover:text-gold-100">Главная</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-gold-100">Контакты</span></nav>
        <p className="store-eyebrow">Внимание к вашим пожеланиям</p>
        <h1 className="store-title mt-3">Контакты</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-stone-300">Поможем уточнить состав композиции, размер и оформление ленты. Выберите удобный способ связи или оставьте заявку на выбранные товары.</p>
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {contacts.map(({ title, value, href, icon: Icon }) => <section key={title} className="store-panel min-w-0 p-6">
              <Icon className="mb-5 text-2xl text-gold-200" aria-hidden="true" />
              <h2 className="text-sm text-stone-400">{title}</h2>
              {href ? <a href={href} className="mt-3 block break-words text-xl text-gold-100 underline decoration-gold-200/50 underline-offset-4 hover:decoration-gold-100">{value}</a> : <p className="mt-3 whitespace-pre-line text-xl leading-relaxed text-gold-100">{value}</p>}
            </section>)}
            {!phone && !email && <section className="store-panel p-6 sm:col-span-2">
              <IoMailOutline className="mb-5 text-2xl text-gold-200" aria-hidden="true" />
              <h2 className="text-2xl text-gold-100">Связаться по поводу заказа</h2>
              <p className="mt-3 leading-relaxed text-stone-300">Прямые контакты пока не опубликованы. Вы можете выбрать товар в каталоге и оставить контактные данные при оформлении заявки.</p>
              <Link href="/catalog" className="btn mt-6 inline-flex min-h-[44px] items-center px-6">Выбрать композицию</Link>
            </section>}
          </div>
          <aside className="store-panel p-6 sm:p-8">
            <p className="store-eyebrow">Перед обращением</p>
            <h2 className="mt-3 text-2xl text-gold-100">Важные детали</h2>
            <ul className="mt-5 space-y-4 text-stone-300">
              <li className="border-b border-gold-200/20 pb-4">Укажите название или артикул понравившейся композиции.</li>
              <li className="border-b border-gold-200/20 pb-4">Подготовьте пожелания к размеру, цвету и надписи на ленте.</li>
              <li>Для примеров под заказ состав и стоимость согласуются отдельно.</li>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-stone-400">Заявка не является оплатой. Наличие и условия выполнения уточняются до подтверждения заказа.</p>
            <Link href="/cart" className="mt-6 inline-block text-gold-100 underline underline-offset-4">Перейти в корзину →</Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
