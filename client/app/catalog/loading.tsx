export default function Loading() {
  return <div role="status" aria-label="Загрузка каталога" className="store-grid">{Array.from({ length: 6 }, (_, index) => <div key={index} className="store-panel animate-pulse p-5"><div className="h-64 rounded-xl bg-white/5" /><div className="mt-5 h-5 w-3/4 rounded bg-white/10" /><div className="mt-3 h-5 w-1/2 rounded bg-white/5" /></div>)}</div>;
}
