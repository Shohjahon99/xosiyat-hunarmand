import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { formatPrice, getImageUrl } from '../../lib/utils';
import Badge from '../ui/Badge';

interface ProductCardProps {
  product: Product;
}

const CATEGORY_COLORS: Record<string, 'default' | 'gold' | 'green' | 'blue' | 'gray'> = {
  tikuvchilik: 'default',
  toqivchilik: 'green',
  korpa_toshak: 'gold',
  gulchilik: 'default',
  qogirchoq: 'blue',
  qandolatchilik: 'gray',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const { addItem } = useCartStore();
  const [imgIdx, setImgIdx] = useState(0);

  const lang = i18n.language as 'uz' | 'ru' | 'en';
  const title = product[`title_${lang}`] || product.title_uz;
  const images = product.images?.length ? product.images : [''];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.in_stock) return;
    addItem(product);
    toast.success(`${title} savatga qo'shildi`, { icon: '🛒' });
  };

  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <Link to={`/mahsulotlar/${product.id}`} className="block">
        {/* Image */}
        <div
          className="relative overflow-hidden bg-cream-dark"
          onMouseEnter={() => images.length > 1 && setImgIdx(1)}
          onMouseLeave={() => setImgIdx(0)}
        >
          <img
            src={getImageUrl(images[imgIdx])}
            alt={title}
            loading="lazy"
            className="w-full h-52 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlays */}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold bg-red-dark px-3 py-1 rounded-full text-sm">
                {t('products.out_of_stock')}
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.is_custom_order && (
              <Badge variant="gold">{t('products.custom_order')}</Badge>
            )}
            {product.is_featured && (
              <Badge variant="default">⭐ Featured</Badge>
            )}
          </div>

          {/* Quick view on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-white/90 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
              <Eye className="w-3.5 h-3.5" /> {t('products.details')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <Badge variant={CATEGORY_COLORS[product.category] || 'default'} className="mb-2">
            {t(`categories.${product.category}`)}
          </Badge>
          <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1 text-sm md:text-base">
            {title}
          </h3>
          <p className="text-red-primary font-bold text-base md:text-lg">
            {formatPrice(product.price_uzs)}
          </p>
        </div>
      </Link>

      {/* Add to cart */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={!product.in_stock}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
            product.in_stock
              ? 'bg-red-primary text-white hover:bg-red-light active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.in_stock ? t('products.add_to_cart') : t('products.out_of_stock')}
        </button>
      </div>
    </motion.div>
  );
}
