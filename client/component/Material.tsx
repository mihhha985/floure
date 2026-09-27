'use client';
import { useState } from 'react';
import Image from 'next/image';

const materials = {
  rose: {
    title: 'Розы',
    text: 'Розы часто выбирают для сдержанных композиций. Белые оттенки создают светлый акцент, красные — более выразительный. Перед заказом проверьте состав конкретного изделия в карточке.',
    image: '/rose_btn.png',
  },
  carnation: {
    title: 'Гвоздики',
    text: 'Гвоздики подходят для лаконичного оформления и хорошо сочетаются с декоративной зеленью. Наличие оттенков и возможность замены уточняются при подтверждении заказа.',
    image: '/carnation_btn.png',
  },
} as const;

export default function Material() {
  const [selected, setSelected] = useState<keyof typeof materials>('rose');
  const material = materials[selected];
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="rounded-xl border border-gold-200/40 bg-[#26252a] p-7">
        <h3 className="text-2xl text-gold-100">{material.title}</h3>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-300">{material.text}</p>
      </div>
      <div className="flex items-center justify-center gap-5 rounded-xl border border-gold-200/30 p-4">
        {(Object.keys(materials) as Array<keyof typeof materials>).map(key => (
          <button key={key} type="button" onClick={() => setSelected(key)} aria-pressed={selected === key} aria-label={materials[key].title}
            className={`rounded-full border-2 p-2 transition ${selected === key ? 'border-gold-100 bg-gold-200/20' : 'border-transparent hover:border-gold-200'}`}>
            <Image src={materials[key].image} alt="" width={88} height={88} />
          </button>
        ))}
      </div>
    </div>
  );
}
