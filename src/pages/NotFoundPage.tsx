import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-primary px-4">
      <div className="text-center">
        {/* Bouncing yarn ball */}
        <motion.div
          className="text-8xl md:text-9xl mb-6 inline-block"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            y: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 1.6, repeat: Infinity, ease: 'linear' },
          }}
        >
          🧶
        </motion.div>

        <motion.h1
          className="font-playfair text-5xl md:text-7xl font-bold text-red-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-gray-600 text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t('common.page_not_found')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/">
            <Button size="lg">{t('common.go_home')}</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
