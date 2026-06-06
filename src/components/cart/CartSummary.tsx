import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../lib/utils';
import Button from '../ui/Button';

export default function CartSummary({ onClose }: { onClose?: () => void }) {
  const { t } = useTranslation();
  const { getTotalPrice } = useCartStore();
  const total = getTotalPrice();

  return (
    <div className="border-t border-gray-100 pt-4 space-y-3">
      <div className="flex justify-between text-sm text-gray-500">
        <span>{t('cart.subtotal')}</span>
        <span>{formatPrice(total)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{t('cart.delivery')}</span>
        <span className="text-green-600">Kelishiladi</span>
      </div>
      <div className="flex justify-between font-bold text-base text-gray-900 pt-2 border-t border-gray-100">
        <span>{t('cart.total')}</span>
        <span className="text-red-primary">{formatPrice(total)}</span>
      </div>
      <Link to="/checkout" onClick={onClose}>
        <Button size="lg" className="w-full mt-2">
          {t('cart.checkout')}
        </Button>
      </Link>
    </div>
  );
}
