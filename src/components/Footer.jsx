import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return <footer className="footer"><div className="container footer-top"><div><Link className="brand" to="/">AUREO<span>FINE WATCHES</span></Link><p>Il tempo passa.<br />Lo stile rimane.</p></div><div><span className="eyebrow">ESPLORA</span><Link to="/prodotti">La collezione</Link><Link to="/chi-siamo">Il mondo Aureo</Link><Link to="/carrello">Il tuo carrello</Link></div><div><span className="eyebrow">PARLIAMONE</span><p>Ogni scelta inizia da una conversazione.</p><Link className="footer-contact" to="/contatti">Contatta l’atelier <ArrowUpRight size={18} /></Link></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Aureo — Progetto dimostrativo</span><span>Modelli e prezzi fittizi. Fotografie illustrative da Unsplash.</span></div></footer>;
}
