import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import ConfettiEffect from '../ui/ConfettiEffect';
import Button from '../ui/Button';

const PRIMARY = import.meta.env.VITE_TELEGRAM_PRIMARY || 'https://t.me/';

interface OrderConfirmationProps {
  orderId?: string;
}

export default function OrderConfirmation({ orderId }: OrderConfirmationProps) {
  const { t } = useTranslation();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      {showConfetti && <ConfettiEffect />}
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle2 className="w-24 h-24 text-green-500" strokeWidth={1.5} />
        </motion.div>

        <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-3">{t('success.title')}</h1>
        <p className="text-gray-500 mb-2">{t('success.message')}</p>
        {orderId && (
          <p className="text-xs text-gray-400 mb-8">
            {t('success.order_id')}: <span className="font-mono">{orderId.slice(0, 8).toUpperCase()}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={PRIMARY} target="_blank" rel="noopener noreferrer">
            <Button className="flex items-center gap-2 bg-telegram hover:bg-telegram/90 w-full sm:w-auto">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              {t('success.telegram_link')}
            </Button>
          </a>
          <Link to="/mahsulotlar">
            <Button variant="outline" className="w-full sm:w-auto">{t('success.continue_shopping')}</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
