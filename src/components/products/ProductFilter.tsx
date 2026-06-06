import { useTranslation } from 'react-i18next';
import { Search, X } from 'lucide-react';
import type { Category } from '../../types';

interface Filters {
  category: Category | 'all';
  search: string;
  sort: 'newest' | 'price_asc' | 'price_desc';
}

interface ProductFilterProps {
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
}

const CATEGORIES: { key: Category | 'all'; emoji: string }[] = [
  { key: 'all', emoji: '🏪' },
  { key: 'tikuvchilik', emoji: '🧵' },
  { key: 'toqivchilik', emoji: '🧶' },
  { key: 'korpa_toshak', emoji: '🛏️' },
  { key: 'gulchilik', emoji: '🌸' },
  { key: 'qogirchoq', emoji: '🧸' },
  { key: 'qandolatchilik', emoji: '🍬' },
];

export default function ProductFilter({ filters, onChange }: ProductFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 mb-8">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={t('products.search')}
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-primary/30 text-sm"
        />
        {filters.search && (
          <button
            onClick={() => onChange({ search: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onChange({ category: cat.key })}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all min-h-[44px] shrink-0 ${
              filters.category === cat.key
                ? 'bg-red-primary text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-red-primary hover:text-red-primary'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.key === 'all' ? t('categories.all') : t(`categories.${cat.key}`)}</span>
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 shrink-0">{t('products.sort')}:</span>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value as Filters['sort'] })}
          className="flex-1 max-w-xs px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30"
        >
          <option value="newest">{t('products.sort_newest')}</option>
          <option value="price_asc">{t('products.sort_price_asc')}</option>
          <option value="price_desc">{t('products.sort_price_desc')}</option>
        </select>
      </div>
    </div>
  );
}
