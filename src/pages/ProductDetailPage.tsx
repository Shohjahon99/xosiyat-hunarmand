import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useProduct, useProducts } from '../hooks/useProducts';
import ProductDetail from '../components/products/ProductDetail';
import ProductCard from '../components/products/ProductCard';
import { Skeleton } from '../components/ui/Skeleton';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { data: product, isLoading } = useProduct(id!);
  const { data: all } = useProducts();

  const related = all?.filter((p) => p.id !== id && p.category === product?.category).slice(0, 4);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{t('common.not_found')}</h2>
          <Link to="/mahsulotlar" className="text-red-primary hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link to="/mahsulotlar" className="text-sm text-gray-500 hover:text-red-primary flex items-center gap-1 w-fit">
          <ArrowLeft className="w-4 h-4" /> {t('nav.products')}
        </Link>
      </div>

      <ProductDetail product={product} />

      {/* Related */}
      {related && related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">{t('products.related')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
