import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import products from '../data/products.json';
import { cartReducer, sanitizeCart } from './cart';

const CartContext = createContext(null);
const STORAGE_KEY = 'aureo-cart-v1';

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], () => {
    try { return sanitizeCart(JSON.parse(localStorage.getItem(STORAGE_KEY)), products); }
    catch { return []; }
  });
  const [notice, setNotice] = useState('');
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
    catch { /* Il carrello resta utilizzabile se il browser blocca lo storage. */ }
  }, [items]);
  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(''), 3000);
    return () => clearTimeout(timeout);
  }, [notice]);
  const lines = items.map((item) => ({ ...products.find((p) => p.id === item.id), quantity: item.quantity }));
  const addItem = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const full = items.some((item) => item.id === id && item.quantity >= 10);
    dispatch({ type: 'add', id });
    setNotice(full ? 'Puoi aggiungere al massimo 10 pezzi per modello.' : `${product.name} aggiunto al carrello`);
  };
  return <CartContext.Provider value={{
    lines, addItem, notice,
    count: lines.reduce((sum, item) => sum + item.quantity, 0),
    total: lines.reduce((sum, item) => sum + item.price * item.quantity, 0),
    removeItem: (id) => dispatch({ type: 'remove', id }),
    setQuantity: (id, quantity) => dispatch({ type: 'quantity', id, quantity }),
    clearCart: () => dispatch({ type: 'clear' }),
  }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart richiede CartProvider');
  return context;
}
