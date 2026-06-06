import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useFeaturedProducts } from '../../hooks/useProducts';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import ProductCard from '../products/ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';
import Button from '../ui/Button';

export default function FeaturedProducts() {
  const { t } = useTranslation();
  const { data: products, isLoading } = useFeaturedProducts();
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="py-16 md:py-20 px-4 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <div>
          <h2 className="font-playfair font-fluid-2xl font-bold text-gray-900">{t('products.featured')}</h2>
          <p className="text-gray-500 mt-1">Eng mashhur va tanlangan mahsulotlar</p>
        </div>
        <Link to="/mahsulotlar">
          <Button variant="outline" size="sm" className="flex items-center gap-2 shrink-0">
            {t('products.view_all')} <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products?.slice(0, 8).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
      </div>
    </section>
  );
}
