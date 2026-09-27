import { Link } from 'react-router-dom';
export default function NotFound() {
  return <section className="container empty-state page-section"><span className="eyebrow">404 · FUORI TEMPO</span><h1>Questa pagina non esiste.</h1><p>Ritrova il tuo percorso nella nostra collezione.</p><Link className="button" to="/prodotti">Esplora gli orologi</Link></section>;
}
