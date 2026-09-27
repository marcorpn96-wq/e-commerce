import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { useCart } from './context/CartContext';
import products from './data/products.json';

export default function App() {
  const { pathname } = useLocation();
  const { notice } = useCart();
  const mainRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
    const titles = { '/': 'Il tempo, nella sua forma più pura', '/prodotti': 'La collezione', '/chi-siamo': 'Chi siamo', '/contatti': 'Contatti', '/carrello': 'Il tuo carrello' };
    const product = products.find((p) => pathname === `/prodotti/${p.id}`);
    document.title = `${titles[pathname] || product?.name || 'Pagina non trovata'} | Aureo`;
  }, [pathname]);
  return <><a className="skip-link" href="#main" onClick={(event) => { event.preventDefault(); mainRef.current?.focus(); }}>Salta al contenuto</a><Header /><main id="main" ref={mainRef} tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/prodotti" element={<Products />} /><Route path="/prodotti/:id" element={<ProductDetail key={pathname} />} /><Route path="/chi-siamo" element={<About />} /><Route path="/contatti" element={<Contact />} /><Route path="/carrello" element={<Cart />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /><div role="status" aria-live="polite" className={notice ? 'toast visible' : 'toast'}>{notice}</div></>;
}
