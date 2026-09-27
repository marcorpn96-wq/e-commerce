import test from 'node:test';
import assert from 'node:assert/strict';
import { cartReducer, sanitizeCart } from '../src/context/cart.js';

test('aggiunta ripetuta, quantità, rimozione e svuotamento', () => {
  let state = cartReducer([], { type: 'add', id: 'a' });
  state = cartReducer(state, { type: 'add', id: 'a' });
  state = cartReducer(state, { type: 'add', id: 'b' });
  assert.deepEqual(state, [{ id: 'a', quantity: 2 }, { id: 'b', quantity: 1 }]);
  state = cartReducer(state, { type: 'quantity', id: 'a', quantity: 5 });
  assert.equal(state[0].quantity, 5);
  assert.equal(cartReducer(state, { type: 'quantity', id: 'a', quantity: -1 }), state);
  assert.deepEqual(cartReducer(state, { type: 'remove', id: 'a' }), [{ id: 'b', quantity: 1 }]);
  assert.deepEqual(cartReducer(state, { type: 'clear' }), []);
});
test('limite di dieci pezzi per modello', () => {
  let state = [];
  for (let i = 0; i < 15; i++) state = cartReducer(state, { type: 'add', id: 'a' });
  assert.equal(state[0].quantity, 10);
});
test('ripristino robusto: elimina righe corrotte e normalizza duplicati', () => {
  const products = [{ id: 'a' }];
  assert.deepEqual(sanitizeCart(null, products), []);
  assert.deepEqual(sanitizeCart([{ id: 'a', quantity: 7 }, null, { id: 'a', quantity: 8 }, { id: 'unknown', quantity: 1 }, { id: 'a', quantity: 1.5 }, { id: 'a', quantity: -4 }], products), [{ id: 'a', quantity: 10 }]);
});
