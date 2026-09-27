import { useState } from 'react';
import { Watch } from 'lucide-react';

export default function ProductImage({ product, className = '', loading = 'lazy', ...props }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`image-fallback ${className}`} role="img" aria-label={`Foto illustrativa non disponibile: ${product.name}`}><Watch size={64} strokeWidth={1} /><span>{product.name}</span></div>;
  return <img src={product.image} alt={`Orologio di lusso: fotografia illustrativa per ${product.name}`} className={className} loading={loading} onError={() => setFailed(true)} {...props} />;
}
