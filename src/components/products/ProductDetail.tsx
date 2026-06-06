import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Minus, Plus, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { formatPrice, getImageUrl } from '../../lib/utils';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const PRIMARY = import.meta.env.VITE_TELEGRAM_PRIMARY || 'https://t.me/';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { t, i18n } = useTranslation();
  const { addItem } = useCartStore();
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes_available?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const lang = i18n.language as 'uz' | 'ru' | 'en';
  const title = product[`title_${lang}`] || product.title_uz;
  const description = product[`description_${lang}`] || product.description_uz || '';
  const images = product.images?.length ? product.images : [''];

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, note);
    toast.success(`${title} savatga qo'shildi!`, { icon: '🛒' });
  };

  const handleTelegram = () => {
    const msg = encodeURIComponent(
      `Salom! "${title}" mahsulotini buyurtma qilmoqchiman.\nNarxi: ${formatPrice(product.price_uzs)}\nRazmer: ${selectedSize}\nMiqdor: ${quantity}\n${note ? `Izoh: ${note}` : ''}`
    );
    window.open(`${PRIMARY}?text=${msg}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <div className="rounded-2xl overflow-hidden bg-cream-dark mb-3">
            <img
              src={getImageUrl(images[selectedImg])}
              alt={title}
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    i === selectedImg ? 'border-red-primary' : 'border-transparent'
                  }`}
                >
                  <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge>{t(`categories.${product.category}`)}</Badge>
            {product.is_custom_order && <Badge variant="gold">{t('products.custom_order')}</Badge>}
            {!product.in_stock && <Badge variant="red">{t('products.out_of_stock')}</Badge>}
          </div>

          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 mb-3">{title}</h1>
          <p className="text-2xl md:text-3xl font-bold text-red-primary mb-4">{formatPrice(product.price_uzs)}</p>

          {description && (
            <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
          )}

          {/* Size selector */}
          {product.sizes_available?.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">{t('products.size')}</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes_available.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all min-h-[44px] ${
                      selectedSize === size
                        ? 'border-red-primary bg-red-primary text-white'
                        : 'border-gray-200 text-gray-600 hover:border-red-primary hover:text-red-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-gray-700">{t('products.quantity')}:</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Custom note */}
          {product.is_custom_order && (
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 block mb-2">{t('products.custom_note')}</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Maxsus talablaringizni yozing..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30 resize-none"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {t('products.add_to_cart')}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={handleTelegram}
              className="flex-1 flex items-center justify-center gap-2 bg-telegram text-white hover:bg-telegram/90"
            >
              <Send className="w-5 h-5" />
              Telegram
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
