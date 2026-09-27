import Header from '@/component/Header';
import Footer from '@/component/Footer';
import CartPage from '@/component/CartPage';

export default function Template({ children }: { children: React.ReactNode }) {
  return <div><Header />{children}<Footer /><CartPage /></div>;
}
