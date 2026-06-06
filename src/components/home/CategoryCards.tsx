import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { Category } from '../../types';

const CATEGORIES: { key: Category; emoji: string; color: string; bg: string; photo: string }[] = [
  { key: 'tikuvchilik', emoji: '🧵', color: 'text-red-primary', bg: 'bg-red-50 hover:bg-red-primary', photo: '/photo_2026-06-06_19-24-14.jpg' },
  { key: 'toqivchilik', emoji: '🧶', color: 'text-teal-primary', bg: 'bg-teal-50 hover:bg-teal-primary', photo: '/photo_2026-06-06_19-23-05.jpg' },
  { key: 'korpa_toshak', emoji: '🛏️', color: 'text-gold-dark', bg: 'bg-amber-50 hover:bg-gold-primary', photo: '/photo_2026-06-06_19-21-51.jpg' },
  { key: 'gulchilik', emoji: '🌸', color: 'text-pink-600', bg: 'bg-pink-50 hover:bg-pink-500', photo: '/photo_2026-06-06_19-24-31.jpg' },
  { key: 'qogirchoq', emoji: '🧸', color: 'text-orange-600', bg: 'bg-orange-50 hover:bg-orange-500', photo: '/photo_2026-06-06_19-24-21.jpg' },
  { key: 'qandolatchilik', emoji: '🍬', color: 'text-purple-600', bg: 'bg-purple-50 hover:bg-purple-500', photo: '/photo_2026-06-06_19-24-27.jpg' },
];

export default function CategoryCards() {
  const { t } = useTranslation();
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="py-16 md:py-20 px-4 max-w-7xl mx-auto" ref={ref}>
      <motion.h2
        className="font-playfair font-fluid-2xl font-bold text-gray-900 text-center mb-3"
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Yo'nalishlarimiz
      </motion.h2>
      <motion.p
        className="text-gray-500 text-center mb-10 max-w-xl mx-auto"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        6 ta hunarmandchilik yo'nalishi bo'yicha sifatli mahsulotlar
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ scale: 1.03, rotateY: 3 }}
          >
            <Link
              to={`/mahsulotlar?category=${cat.key}`}
              className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative"
            >
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img
                  src={cat.photo}
                  alt={cat.key}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-2xl mb-1">{cat.emoji}</div>
                <h3 className="font-semibold text-white text-base md:text-lg leading-tight">
                  {t(`categories.${cat.key}`)}
                </h3>
                <p className="text-white/70 text-xs mt-0.5 line-clamp-1">
                  {t(`categories.${cat.key}_desc`)}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
