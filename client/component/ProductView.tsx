"use client";
import { useState } from 'react';
import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';
import { useAppDispatch } from '@/store/hooks';
import { addProduct } from '@/store/features/orderSlice';
import type { IProduct, IParameters, ColorType } from '@/types/product';

const colors: { value: ColorType; label: string; background: string }[] = [
  { value: 'white', label: 'Белая', background: '#fff' },
  { value: 'black', label: 'Чёрная', background: '#111' },
  { value: 'lime', label: 'Зелёная', background: '#84cc16' },
  { value: 'sky', label: 'Голубая', background: '#0ea5e9' },
  { value: 'purple', label: 'Фиолетовая', background: '#a855f7' },
  { value: 'pink', label: 'Розовая', background: '#ec4899' },
  { value: 'rose', label: 'Красная', background: '#f43f5e' },
  { value: 'gray', label: 'Серая', background: '#6b7280' },
];

export default function ProductView({ data }: { data: IProduct }) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<IParameters>(data.parametrs[0] ?? { id: 0, size: 0, cost: data.price });
  const [color, setColor] = useState<ColorType | null>(null);
  const [text, setText] = useState('');
  const [ribbon, setRibbon] = useState(false);
  const [added, setAdded] = useState(false);
  const canOrder = data.price > 0 && price.cost > 0;

  function addToCart() {
    if (!canOrder) return;
    dispatch(addProduct({ id: data.id, title: data.title, photo: data.photo, articule: data.articule,
      price: price.cost, size: price.size, quantity, lent: ribbon, color: ribbon ? color : null, text: ribbon ? text : '' }));
    setAdded(true);
  }

  return (
    <div className="store-panel flex flex-col gap-6 p-6 sm:p-8" onChange={() => setAdded(false)}>
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="text-stone-400">Артикул {data.articule}</span>
        <span className="rounded-full border border-gold-200/30 px-3 py-1 text-gold-100">{data.price <= 0 ? 'Пример · под заказ' : data.isActive ? 'В наличии' : 'Под заказ'}</span>
      </div>
      <div>
        <p className="text-3xl text-gold-100">{canOrder ? `${price.cost.toLocaleString('ru-RU')} ₽` : 'Стоимость по запросу'}</p>
        <p className="mt-3 text-sm leading-relaxed text-stone-400">{data.price <= 0 ? 'Изображение показывает возможное оформление. Готового изделия в наличии нет. Состав, размер и стоимость согласуются индивидуально.' : 'Состав, наличие и условия выполнения уточняются при подтверждении заказа.'}</p>
      </div>
      {data.price > 0 && <>
        {data.parametrs.length > 0 && <fieldset>
          <legend className="mb-3 text-gold-100">Размер венка</legend>
          <div className="flex flex-wrap gap-2">{data.parametrs.map(param => <button key={param.id} type="button" aria-pressed={price.id === param.id} className="store-chip" onClick={() => { setPrice(param); setAdded(false); }}>{param.size} см</button>)}</div>
        </fieldset>}
        <fieldset className="border-t border-gold-200/20 pt-5">
          <legend className="text-gold-100">Оформление лентой</legend>
          <div className="flex flex-col gap-3 text-sm text-stone-300">
            <label className="flex min-h-[32px] cursor-pointer items-center gap-3"><input className="accent-[#978655]" type="radio" name="ribbon" checked={!ribbon} onChange={() => setRibbon(false)} />Без траурной ленты</label>
            <label className="flex min-h-[32px] cursor-pointer items-center gap-3"><input className="accent-[#978655]" type="radio" name="ribbon" checked={ribbon} onChange={() => setRibbon(true)} />Добавить траурную ленту</label>
          </div>
        </fieldset>
        {ribbon && <div className="space-y-5">
          <fieldset><legend className="mb-3 text-sm text-gold-100">Цвет ленты{color ? `: ${colors.find(item => item.value === color)?.label.toLowerCase()}` : ''}</legend>
            <div className="flex flex-wrap gap-2">{colors.map(item => <button key={item.value} type="button" aria-label={item.label} aria-pressed={color === item.value} title={item.label} onClick={() => { setColor(item.value); setAdded(false); }} className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${color === item.value ? 'border-gold-100 ring-2 ring-gold-200 ring-offset-2 ring-offset-[#1b1a1d]' : 'border-stone-500'}`} style={{ backgroundColor: item.background }}>{color === item.value && <span className="rounded-full bg-black/70 px-1 text-sm text-white">✓</span>}</button>)}</div>
          </fieldset>
          <label className="block text-sm text-gold-100">Пожелание или надпись на ленте<textarea maxLength={500} className="store-field mt-3 min-h-28 w-full resize-y" value={text} onChange={event => setText(event.target.value)} placeholder="Укажите желаемый текст" /></label>
        </div>}
      </>}
      {canOrder ? <div className="border-t border-gold-200/20 pt-6">
        <div className="flex flex-wrap items-end gap-4">
          <label className="text-sm text-stone-300">Количество<input type="number" min={1} max={100} step={1} value={quantity} className="store-field mt-2 block w-24" onChange={event => { const value = Number(event.target.value); if (Number.isSafeInteger(value) && value > 0 && value <= 100) setQuantity(value); }} /></label>
          <button type="button" onClick={addToCart} className="btn flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap px-5"><IoCartOutline aria-hidden="true" />В корзину</button>
        </div>
        <p aria-live="polite" className="mt-3 min-h-5 text-sm text-gold-100">{added && <>Товар добавлен. <Link href="/cart" className="underline underline-offset-4">Открыть корзину →</Link></>}</p>
      </div> : <Link href="/contact" className="btn px-6 py-3 text-center">Обсудить оформление</Link>}
    </div>
  );
}
