import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.png';

export default function Footer() {
  return (
    <footer className="relative border-t border-gold-200/30 bg-[#181719] px-5 py-10 text-stone-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4"><Image src={logo} alt="" width={40} height={40} /><span className="text-lg text-gold-100">Вечная Память</span></div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Ссылки в подвале">
          <Link href="/catalog" className="hover:text-gold-100">Каталог</Link>
          <Link href="/contact" className="hover:text-gold-100">Контакты</Link>
        </nav>
        <span className="text-sm">© {new Date().getFullYear()} Вечная Память</span>
      </div>
    </footer>
  );
}
