"use client";
import Image from 'next/image';
import Link from 'next/link';
import { BsTrash } from 'react-icons/bs';
import { changeQuantity, removeProduct } from '@/store/features/orderSlice';
import type { IOrderProduct, ColorType } from '@/types/product';
import { useAppDispatch } from '@/store/hooks';

const colorNames: Record<ColorType, string> = { white: 'белая', black: 'чёрная', lime: 'зелёная', sky: 'голубая', purple: 'фиолетовая', pink: 'розовая', rose: 'красная', gray: 'серая' };
export default function CartItems({ item }: { item: IOrderProduct }) {
  const dispatch = useAppDispatch();
  function updateQuantity(quantity: number) {
    if (Number.isSafeInteger(quantity) && quantity >= 1 && quantity <= 100) dispatch(changeQuantity({ id: item.id, quantity }));
  }
  return (
    <article className="store-panel p-4 sm:p-5">
      <div className="flex items-start gap-4">
        <Link href={`/product/${item.id}`} className="flex h-28 w-20 shrink-0 items-center justify-center rounded-xl bg-[#121114] p-2 sm:w-28">
          <Image src={item.photo ? `${process.env.API_URL}/${item.photo}` : '/default.png'} width={112} height={112} alt={item.title} className="max-h-full w-auto object-contain" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-stone-400">Артикул {item.articule}</p>
          <h3 className="mt-2 text-lg leading-snug text-gold-100"><Link href={`/product/${item.id}`}>{item.title}</Link></h3>
          {item.size > 0 && <p className="mt-2 text-sm text-stone-300">Размер: {item.size} см</p>}
          <p className="mt-2 text-sm text-stone-300">{item.price.toLocaleString('ru-RU')} ₽ / шт.</p>
        </div>
      </div>
      <div className="mt-4 break-words text-sm leading-relaxed text-stone-400">
        <p>{item.lent ? `Траурная лента · ${item.color ? colorNames[item.color] || 'цвет уточняется' : 'цвет уточняется'}` : 'Без траурной ленты'}</p>
        {item.lent && item.text && <p className="mt-1 whitespace-pre-wrap">Надпись: {item.text}</p>}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gold-200/20 pt-4">
        <div className="flex items-center gap-1">
          <button type="button" className="store-chip px-3 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Уменьшить количество: ${item.title}`} disabled={item.quantity <= 1} onClick={() => updateQuantity(item.quantity - 1)}>−</button>
          <input type="number" min={1} max={100} step={1} aria-label={`Количество: ${item.title}`} value={item.quantity} onChange={event => updateQuantity(Number(event.target.value))} className="store-field w-16 text-center" />
          <button type="button" className="store-chip px-3 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Увеличить количество: ${item.title}`} disabled={item.quantity >= 100} onClick={() => updateQuantity(item.quantity + 1)}>+</button>
        </div>
        <p className="text-lg text-gold-100">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
        <button type="button" onClick={() => dispatch(removeProduct(item.id))} className="flex min-h-[44px] items-center gap-2 text-sm text-stone-400 hover:text-gold-100" aria-label={`Удалить из корзины: ${item.title}`}><BsTrash aria-hidden="true" /><span>Удалить</span></button>
      </div>
    </article>
  );
}
