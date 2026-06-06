import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const IMPACT_ITEMS = [
  { emoji: '♿', title: 'Nogironlar uchun', desc: "Jismoniy imkoniyati cheklangan ayollarni qo'llabquvvatlaymiz" },
  { emoji: '💰', title: 'Iqtisodiy mustaqillik', desc: "Hunarmandchilik orqali daromad topishga yordam beramiz" },
  { emoji: '🎨', title: 'Madaniy meros', desc: "Milliy hunarmandchilikni saqlab, avlodlarga yetkazamiz" },
  { emoji: '🤝', title: 'Jamoa ruhi', desc: "Bir-birini qo'llab-quvvatlaydigan kuchli jamoa" },
];

export default function ImpactTeaser() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="py-16 md:py-20 px-4 bg-cream-dark" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Ijtimoiy ta'sirimiz
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Hosiyat Hunarmand — faqat mahsulot emas, o'zgarish va umid markazi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {IMPACT_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/ijtimoiy-tasir"
            className="inline-flex items-center gap-2 text-red-primary font-semibold hover:gap-3 transition-all"
          >
            Batafsil o'qish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
