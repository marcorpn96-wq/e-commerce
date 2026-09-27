export const MAX_QUANTITY = 10;

// Accetta soltanto righe valide: localStorage è modificabile dall'utente.
export function sanitizeCart(value, products) {
  if (!Array.isArray(value)) return [];
  const quantities = new Map();
  for (const item of value) {
    if (!item || !products.some((product) => product.id === item.id) || !Number.isInteger(item.quantity) || item.quantity < 1) continue;
    quantities.set(item.id, Math.min(MAX_QUANTITY, (quantities.get(item.id) || 0) + item.quantity));
  }
  return Array.from(quantities, ([id, quantity]) => ({ id, quantity }));
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.find((item) => item.id === action.id);
      return existing
        ? state.map((item) => item.id === action.id ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1) } : item)
        : [...state, { id: action.id, quantity: 1 }];
    }
    case 'quantity':
      if (!Number.isInteger(action.quantity) || action.quantity < 1 || action.quantity > MAX_QUANTITY) return state;
      return state.map((item) => item.id === action.id ? { ...item, quantity: action.quantity } : item);
    case 'remove': return state.filter((item) => item.id !== action.id);
    case 'clear': return [];
    default: return state;
  }
}
