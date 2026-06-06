import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/ui/Button';

export default function CartPage() {
  const { t } = useTranslation();
  const { items } = useCartStore();

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/mahsulotlar">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> {t('common.back')}
            </Button>
          </Link>
          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900">
            {t('cart.title')} {items.length > 0 && <span className="text-gray-400 text-lg">({items.length} {t('cart.items')})</span>}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <p className="font-semibold text-gray-700 text-lg mb-2">{t('cart.empty')}</p>
            <p className="text-gray-400 text-sm mb-6">{t('cart.empty_desc')}</p>
            <Link to="/mahsulotlar"><Button>{t('cart.continue_shopping')}</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
              {items.map((item) => <CartItem key={item.product.id} item={item} />)}
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5 h-fit">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
