import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, ZoomIn, ZoomOut } from 'lucide-react';
import products from '../data/products.json';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import NotFound from './NotFound';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [zoom, setZoom] = useState(false);
  if (!product) return <NotFound />;
  const specs = [['Referenza', 'reference'], ['Movimento', 'movement'], ['Riserva di carica', 'reserve'], ['Diametro cassa', 'diameter'], ['Spessore', 'thickness'], ['Materiale cassa', 'case'], ['Quadrante', 'dial'], ['Vetro', 'crystal'], ['Cinturino', 'strap'], ['Impermeabilità nominale', 'water'], ['Funzioni', 'functions'], ['Peso indicativo', 'weight'], ['Garanzia', 'warranty']];
  return <div className="container page-section"><Link className="text-link back-link" to="/prodotti"><ArrowLeft size={16} /> Torna alla collezione</Link><div className="detail-grid"><div><button className={`detail-image ${zoom ? 'zoomed' : ''}`} onClick={() => setZoom(!zoom)} aria-label={zoom ? 'Riduci fotografia' : 'Ingrandisci fotografia'} aria-pressed={zoom}><ProductImage key={id} product={product} loading="eager" /><span>{zoom ? <ZoomOut /> : <ZoomIn />} {zoom ? 'Vista completa' : 'Esplora il dettaglio'}</span></button><p className="image-note">Foto illustrativa. Premi sull’immagine per ingrandire.</p></div><div className="detail-copy"><span className="eyebrow">{product.collection} · {product.reference}</span><h1>{product.name}</h1><p className="detail-tagline">{product.subtitle}</p><p>{product.description}</p><p className="detail-price">{formatPrice(product.price)} <small>Prezzo dimostrativo, IVA inclusa</small></p><button className="button full-width" onClick={() => addItem(product.id)}>Aggiungi al carrello <Plus size={18} /></button><p className="demo-note">Questo è un negozio demo: nessun ordine o pagamento reale. Specifiche fittizie; la fotografia può differire dal modello descritto.</p><div className="detail-highlights"><span><strong>{product.diameter}</strong>Diametro</span><span><strong>{product.reserve}</strong>Riserva di carica</span><span><strong>{product.water}</strong>Impermeabilità</span></div></div></div><section className="specifications"><span className="eyebrow">DENTRO OGNI DETTAGLIO</span><h2>La precisione, in numeri.</h2><dl>{specs.map(([label, key]) => <div key={key}><dt>{label}</dt><dd>{product[key]}</dd></div>)}</dl></section><section className="related"><h2>Altre storie da indossare.</h2><div className="product-grid related-grid">{products.filter((p) => p.id !== id).map((p) => <ProductCard key={p.id} product={p} />)}</div></section></div>;
}
