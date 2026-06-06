import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { formatPrice } from '../lib/utils';
import Button from '../components/ui/Button';

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { items, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-gray-600 mb-4">{t('cart.empty')}</p>
          <Link to="/mahsulotlar"><Button>{t('cart.continue_shopping')}</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/savat">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> {t('cart.title')}
            </Button>
          </Link>
          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900">{t('checkout.title')}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6">
            <CheckoutForm />
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Buyurtma tarkibi</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => {
                  const title = item.product.title_uz;
                  return (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 line-clamp-1 flex-1 mr-2">{title} × {item.quantity}</span>
                      <span className="font-medium shrink-0">{formatPrice(item.product.price_uzs * item.quantity)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between font-bold">
                <span>{t('cart.total')}</span>
                <span className="text-red-primary">{formatPrice(getTotalPrice())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
