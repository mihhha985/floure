'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import type { ICategory } from '@/types/category';

export default function CategoryList() {
  const params = useParams();
  const selected = Number(params?.id || 0);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${process.env.API_URL}/category`, { signal: controller.signal })
      .then(response => response.ok ? response.json() as Promise<ICategory[]> : [])
      .then(data => setCategories(data.filter(category => category.isActive)))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  return (
    <nav className="flex w-max items-center gap-2 py-2" aria-label="Категории каталога">
      <Link href="/catalog" className="store-chip" aria-current={selected === 0 ? 'page' : undefined}>Все категории</Link>
      {categories.map(category => (
        <Link key={category.id} href={`/catalog/${category.id}`} className="store-chip" aria-current={selected === category.id ? 'page' : undefined}>
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
