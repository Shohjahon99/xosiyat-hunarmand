import { Minus, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { formatPrice, getImageUrl } from '../../lib/utils';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { t, i18n } = useTranslation();
  const { updateQuantity, removeItem } = useCartStore();

  const lang = i18n.language as 'uz' | 'ru' | 'en';
  const title = item.product[`title_${lang}`] || item.product.title_uz;
  const images = item.product.images;
  const img = images?.length ? getImageUrl(images[0]) : '';

  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 last:border-0">
      {img && (
        <img src={img} alt={title} className="w-16 h-16 rounded-xl object-cover shrink-0 bg-cream-dark" />
      )}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{title}</h4>
        {item.selected_size && (
          <p className="text-xs text-gray-400 mt-0.5">{t('products.size')}: {item.selected_size}</p>
        )}
        <p className="text-red-primary font-bold text-sm mt-1">{formatPrice(item.product.price_uzs)}</p>
      </div>
      <div className="flex flex-col items-end justify-between shrink-0">
        <button
          onClick={() => removeItem(item.product.id)}
          className="text-gray-300 hover:text-red-500 transition-colors p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
