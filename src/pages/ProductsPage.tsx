import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilter from '../components/products/ProductFilter';
import type { Category } from '../types';

interface Filters {
  category: Category | 'all';
  search: string;
  sort: 'newest' | 'price_asc' | 'price_desc';
}

export default function ProductsPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    category: (searchParams.get('category') as Category) || 'all',
    search: '',
    sort: 'newest',
  });

  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(filters.search), 300);
    return () => clearTimeout(t);
  }, [filters.search]);

  const { data: products, isLoading } = useProducts({
    category: filters.category,
    search: debouncedSearch || undefined,
    sort: filters.sort,
  });

  const handleFilterChange = useCallback((f: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...f }));
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {t('products.title')}
        </h1>
        <ProductFilter filters={filters} onChange={handleFilterChange} />
        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </div>
  );
}
