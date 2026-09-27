import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import ProductImage from './ProductImage';
import '../styles/products.css';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  return <article className="product-card">
    <Link to={`/prodotti/${product.id}`} className="product-photo"><ProductImage product={product} /><span className="product-badge">{product.badge}</span><span className="photo-arrow"><ArrowUpRight size={20} /></span></Link>
    <div className="product-meta"><span>{product.collection}</span><span>{product.diameter} · Automatico</span></div>
    <div className="product-heading"><Link to={`/prodotti/${product.id}`}><h3>{product.name}</h3></Link><span>{formatPrice(product.price)}</span></div>
    <button className="add-button" onClick={() => addItem(product.id)}>Aggiungi al carrello <Plus size={16} /></button>
  </article>;
}
