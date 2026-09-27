export const formatPrice = (value) => new Intl.NumberFormat('it-IT', {
  style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
}).format(value);
