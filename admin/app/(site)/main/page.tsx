import Link from 'next/link';

const sections = [
  { href: '/category', title: 'Категории', description: 'Порядок и названия разделов каталога.' },
  { href: '/product', title: 'Товары', description: 'Фотографии, описания, цены и доступность.' },
  { href: '/orders', title: 'Заказы', description: 'Новые заявки, статусы и внутренние комментарии.' },
];

export default function Page() {
  return (
    <main style={{ padding: '32px', maxWidth: '1000px' }}>
      <h1 style={{ margin: 0 }}>Панель управления</h1>
      <p style={{ color: '#555', lineHeight: 1.6 }}>Выберите раздел, чтобы обновить каталог или обработать заявки.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '28px' }}>
        {sections.map(section => (
          <Link key={section.href} href={section.href} style={{ display: 'block', padding: '24px', border: '1px solid #ddd', borderRadius: '12px', color: 'inherit', textDecoration: 'none' }}>
            <h2 style={{ marginTop: 0 }}>{section.title}</h2>
            <p style={{ color: '#555', lineHeight: 1.5 }}>{section.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
