import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return <header className="header">
    <div className="announcement">Il valore del tempo. La bellezza di sceglierlo. <span>SCOPRI AUREO <ArrowUpRight size={12} /></span></div>
    <div className="nav-shell container">
      <Link to="/" className="brand" aria-label="Aureo, homepage" onClick={() => setOpen(false)}>AUREO<span>FINE WATCHES</span></Link>
      <nav id="main-nav" className={open ? 'navigation is-open' : 'navigation'} aria-label="Navigazione principale">
        {[['/', 'Home'], ['/prodotti', 'Prodotti'], ['/chi-siamo', 'Chi siamo'], ['/contatti', 'Contatti']].map(([path, label]) =>
          <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
      </nav>
      <div className="header-actions"><Link to="/carrello" className="cart-link" aria-label={`Carrello, ${count} articoli`} onClick={() => setOpen(false)}><ShoppingBag size={20} /><span className="cart-word">Carrello</span><span className="count">{count}</span></Link>
        <button className="icon-button mobile-menu" aria-label={open ? 'Chiudi menu' : 'Apri menu'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
  </header>;
}
