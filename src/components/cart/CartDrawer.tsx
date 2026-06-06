import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import Button from '../ui/Button';

export default function CartDrawer() {
  const { t } = useTranslation();
  const { items, isOpen, toggleCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-[61] w-full sm:w-96 bg-white shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-lg">{t('cart.title')}</h2>
              <button
                onClick={toggleCart}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  {/* Yarn ball animation */}
                  <motion.div
                    animate={{ x: [0, 20, 0, -20, 0], rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="text-6xl mb-4"
                  >
                    🧶
                  </motion.div>
                  <p className="font-semibold text-gray-700 mb-1">{t('cart.empty')}</p>
                  <p className="text-sm text-gray-400 mb-6">{t('cart.empty_desc')}</p>
                  <Link to="/mahsulotlar" onClick={toggleCart}>
                    <Button size="sm">{t('cart.continue_shopping')}</Button>
                  </Link>
                </div>
              ) : (
                <div className="py-2">
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-100">
                <CartSummary onClose={toggleCart} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
