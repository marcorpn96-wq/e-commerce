import { useState } from 'react';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [category, setCategory] = useState('Tutti');
  const [sort, setSort] = useState('featured');
  const visible = products.filter((p) => category === 'Tutti' || p.collection === category).sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0);
  return <section className="container page-section"><span className="eyebrow">LA COLLEZIONE</span><h1>Un carattere. Il tuo.</h1><p className="intro">Dall’eleganza essenziale allo spirito sportivo, trova la tua interpretazione del tempo.</p><div className="catalog-toolbar"><div className="filters" aria-label="Filtra per collezione">{['Tutti', 'Classici', 'Sportivi', 'Cronografi'].map((label) => <button key={label} aria-pressed={category === label} className={category === label ? 'selected' : ''} onClick={() => setCategory(label)}>{label}</button>)}</div><label className="sort-label">Ordina per <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">In evidenza</option><option value="low">Prezzo crescente</option><option value="high">Prezzo decrescente</option></select></label></div><p className="results" aria-live="polite">{visible.length} segnatempo</p><div className="product-grid">{visible.map((p) => <ProductCard key={p.id} product={p} />)}</div><p className="demo-note">Catalogo dimostrativo: nomi, specifiche e prezzi sono fittizi. Le foto sono placeholder illustrativi e non rappresentano esattamente le configurazioni descritte.</p></section>;
}
