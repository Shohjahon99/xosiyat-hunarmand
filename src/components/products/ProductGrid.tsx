import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Product } from '../../types';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🧵</div>
        <h3 className="font-semibold text-gray-700 text-lg mb-2">{t('products.no_products')}</h3>
        <p className="text-gray-400 text-sm">Boshqa kategoriyani tanlang yoki qidiruvni o'zgartiring</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={products.map((p) => p.id).join('')}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
