"use client";
import { store } from "@/store";
import { Provider } from "react-redux";
import { useEffect } from 'react';
import { restoreOrder } from '@/store/features/orderSlice';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('order') || '[]');
      if (Array.isArray(saved)) store.dispatch(restoreOrder(saved.filter(product =>
        product && Number.isSafeInteger(product.id) && Number.isSafeInteger(product.quantity) &&
        product.quantity > 0 && Number.isFinite(product.price) && product.price >= 0
      )));
    } catch { /* Ignore corrupt or unavailable browser storage. */ }
    return store.subscribe(() => {
      try { localStorage.setItem('order', JSON.stringify(store.getState().order.products)); } catch { /* Storage may be disabled. */ }
    });
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
