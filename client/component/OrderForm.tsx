"use client";
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearOrder } from '@/store/features/orderSlice';
import type { IOrder } from '@/types/order';

type Inputs = { fio: string; phone: string; email: string; adres: string; comment: string };
const orderErrors: Record<string, string> = {
  'Цена товара изменилась. Обновите корзину': 'Цена товара изменилась. Удалите его из корзины и добавьте заново из каталога.',
  'Размер товара изменился': 'Выбранный размер больше недоступен. Откройте товар в каталоге и выберите размер заново.',
  'Товар недоступен для заказа': 'Один из товаров больше недоступен. Удалите его из корзины или свяжитесь с нами.',
  'Текст ленты слишком длинный': 'Надпись на ленте должна содержать не более 500 символов. Измените её на странице товара и добавьте товар заново.',
};

export default function OrderForm() {
  const { products } = useAppSelector(state => state.order);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const sending = useRef(false);
  const [submitError, setSubmitError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>({ mode: 'onTouched' });

  async function sendOrder(data: Inputs) {
    if (sending.current) return;
    setSubmitError('');
    if (!products.length || products.length > 30 || products.some(item => !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 100 || item.price <= 0)) {
      setSubmitError('Проверьте корзину: от 1 до 30 позиций, количество каждого товара — от 1 до 100.');
      return;
    }
    sending.current = true;
    const order: IOrder = { fio: data.fio.trim(), phone: data.phone.replace(/[^\d+]/g, ''), email: data.email.trim(), adres: data.adres.trim(), comment: data.comment.trim(), date: new Date().toISOString(), products };
    try {
      const response = await fetch(`${process.env.API_URL}/order`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(orderErrors[result?.message] || 'Не удалось отправить заявку. Ваши данные сохранены на этой странице. Попробуйте ещё раз или свяжитесь с нами.');
      }
      dispatch(clearOrder());
      router.push('/thank');
    } catch (error) {
      setSubmitError(error instanceof TypeError ? 'Нет связи с сервером. Проверьте соединение и попробуйте снова. Товары и введённые данные сохранены.' : error instanceof Error ? error.message : 'Не удалось отправить заявку. Попробуйте снова.');
    } finally {
      sending.current = false;
    }
  }

  const fields = [
    { name: 'fio' as const, label: 'Ваше имя', type: 'text', autoComplete: 'name', placeholder: 'Как к вам обращаться', rules: { required: 'Укажите ваше имя', validate: (value: string) => value.trim().length >= 2 || 'Введите не менее 2 символов', maxLength: { value: 60, message: 'Не более 60 символов' } } },
    { name: 'phone' as const, label: 'Телефон', type: 'tel', autoComplete: 'tel', placeholder: '+7 (999) 123-45-67', rules: { required: 'Укажите телефон', validate: (value: string) => (/^\+?[\d\s()\-]+$/.test(value.trim()) && /^\d{10,15}$/.test(value.replace(/\D/g, ''))) || 'Введите номер: от 10 до 15 цифр' } },
    { name: 'email' as const, label: 'Электронная почта', type: 'email', autoComplete: 'email', placeholder: 'name@example.ru', rules: { required: 'Укажите электронную почту', validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Проверьте адрес электронной почты', maxLength: { value: 254, message: 'Слишком длинный адрес' } } },
  ];
  return (
    <section id="order-form" className="store-panel scroll-mt-6 p-5 sm:p-6" aria-labelledby="order-title">
      <h2 id="order-title" className="text-xl text-gold-100">02 · Контактные данные</h2>
      <p className="mt-3 text-sm leading-relaxed text-stone-400">Все поля, кроме комментария, обязательны. Отправка заявки не требует оплаты.</p>
      <form className="mt-6" onSubmit={handleSubmit(sendOrder)} noValidate aria-busy={isSubmitting}>
        <fieldset disabled={isSubmitting} className="space-y-5 disabled:opacity-60">
          {fields.map(field => <div key={field.name}>
            <label htmlFor={`order-${field.name}`} className="mb-2 block text-sm text-gold-100">{field.label}</label>
            <input id={`order-${field.name}`} type={field.type} autoComplete={field.autoComplete} placeholder={field.placeholder} className="store-field w-full placeholder:text-stone-500" aria-required="true" aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} {...register(field.name, field.rules)} />
            {errors[field.name] && <p id={`error-${field.name}`} role="alert" className="mt-2 text-sm text-rose-300">{errors[field.name]?.message}</p>}
          </div>)}
          <div>
            <label htmlFor="order-address" className="mb-2 block text-sm text-gold-100">Адрес</label>
            <textarea id="order-address" autoComplete="street-address" rows={3} placeholder="Город, улица, дом или место передачи заказа" className="store-field w-full resize-y placeholder:text-stone-500" aria-required="true" aria-invalid={Boolean(errors.adres)} aria-describedby={errors.adres ? 'error-address' : undefined} {...register('adres', { required: 'Укажите адрес', validate: value => value.trim().length >= 5 || 'Уточните адрес', maxLength: { value: 150, message: 'Не более 150 символов' } })} />
            {errors.adres && <p id="error-address" role="alert" className="mt-2 text-sm text-rose-300">{errors.adres.message}</p>}
          </div>
          <div>
            <label htmlFor="order-comment" className="mb-2 block text-sm text-gold-100">Комментарий <span className="text-stone-400">· необязательно</span></label>
            <textarea id="order-comment" rows={3} maxLength={2000} placeholder="Желаемая дата и дополнительные пожелания" className="store-field w-full resize-y placeholder:text-stone-500" {...register('comment', { maxLength: 2000 })} />
          </div>
          <p className="text-sm leading-relaxed text-stone-400">Указанные контакты нужны для связи по заявке. Состав, окончательная стоимость и условия выполнения согласуются до подтверждения заказа.</p>
          <button type="submit" disabled={isSubmitting} className="btn min-h-[48px] w-full px-6 disabled:cursor-wait disabled:opacity-50 sm:w-auto">{isSubmitting ? 'Отправляем заявку…' : 'Отправить заявку'}</button>
        </fieldset>
        {submitError && <p role="alert" className="mt-5 rounded-xl border border-rose-300/30 bg-rose-300/5 p-4 text-sm leading-relaxed text-rose-200">{submitError}</p>}
      </form>
    </section>
  );
}
