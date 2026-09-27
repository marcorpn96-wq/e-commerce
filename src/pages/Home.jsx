import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ShieldCheck, Gem, PackageCheck } from 'lucide-react';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import '../styles/home.css';

export default function Home() {
  return <>
    <section className="hero"><div className="hero-image" /><div className="hero-shade" /><div className="container hero-content"><span className="eyebrow light"><span className="little-line" /> L’ARTE DI MISURARE L’ETERNITÀ</span><h1>Il tempo, nella sua<br />forma più <em>pura.</em></h1><p>Non solo orologi. Storie da indossare.<br />Scopri una collezione dedicata a chi riconosce<br className="desktop-break" /> il valore di ogni istante.</p><Link className="button button-cream" to="/prodotti">Esplora la collezione <ArrowUpRight size={18} /></Link><div className="hero-caption"><span>PRECISIONE. CARATTERE. ETERNITÀ.</span><span>01 <i /> 04</span></div></div><div className="hero-side-label">AUREO — THE ART OF TIME</div></section>
    <section className="promise-strip" aria-label="I valori della collezione"><div className="container promises"><div><ShieldCheck /><span>Una passione autentica<small>Il dettaglio fa la differenza</small></span></div><div><Gem /><span>Design senza tempo<small>Oltre le mode, oltre le stagioni</small></span></div><div><PackageCheck /><span>Un’esperienza curata<small>Dal primo sguardo alla scelta</small></span></div></div></section>
    <section className="container collection-section"><div className="section-heading"><div><span className="eyebrow">LA SELEZIONE AUREO</span><h2>Destinati a restare.</h2><p>Quattro interpretazioni del tempo. Un’unica ricerca dell’eccellenza.</p></div><Link className="text-link" to="/prodotti">Tutti gli orologi <ArrowRight size={18} /></Link></div><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    <section className="story-section container"><div className="story-image" role="img" aria-label="Dettaglio fotografico illustrativo di un orologio" /><div className="story-content"><span className="eyebrow">IL MONDO AUREO</span><h2>Ci sono oggetti.<br />E poi ci sono <em>legami.</em></h2><p>Un orologio custodisce più delle ore. Celebra un traguardo, accompagna un incontro, diventa parte della tua storia. È da questa convinzione che nasce Aureo.</p><Link className="text-link" to="/chi-siamo">La nostra filosofia <ArrowUpRight size={18} /></Link></div></section>
    <section className="closing container"><span className="eyebrow">IL TUO PROSSIMO CAPITOLO</span><h2>Trova il tempo che ti somiglia.</h2><Link className="button" to="/prodotti">Scopri il tuo orologio <ArrowRight size={18} /></Link></section>
  </>;
}
