import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const STORIES = [
  {
    name: 'Gulnora, 34 yosh',
    craft: 'Tikuvchilik',
    story: "Turmush o'rtog'im vafotidan keyin uch bolam bilan yolg'iz qoldim. Hosiyat markazida tikuvchilikni o'rgandim va hozir oyiga 2-3 million so'm daromad topaman.",
    emoji: '👩',
  },
  {
    name: 'Malika, 28 yosh — nogironlik guruhi bor',
    craft: "Qo'g'irchoq yasash",
    story: "Oyoqlarim ishlamasa ham, qo'llarim bilan qo'g'irchoq yasayman. Hozir Toshkentga ham buyurtma berishadi. Markaz menga yangi hayot berdi.",
    emoji: '🌸',
  },
  {
    name: 'Barno, 45 yosh',
    craft: 'Gulchilik',
    story: "Pensiyaga chiqishim bilanoq Hosiyatga bordim. Suniy gul yasashni o'rgandim, endi toʻy bezatishdan ham pul ishlayman. Yoshim emas, ishtiyoq muhim!",
    emoji: '💐',
  },
];

const NUMBERS = [
  { value: '100+', label: "O'qitilgan shogirdlar", icon: '🎓' },
  { value: '10 yil', label: 'Faoliyat davri', icon: '📅' },
  { value: '6', label: 'Hunarmandchilik yo\'nalishlari', icon: '🏆' },
  { value: '30%', label: 'Nogironlar ulushi', icon: '♿' },
  { value: '3 ta', label: 'Viloyat ko\'rgazmalarida ishtirok', icon: '🎭' },
  { value: '2M+', label: "O'rtacha oylik daromad (so'm)", icon: '💰' },
];

export default function ImpactPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-teal-primary text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="font-playfair text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('impact.title')}
          </motion.h1>
          <motion.p
            className="text-white/80 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Qo'l mehnati orqali hayotlarni o'zgartiramiz
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('impact.mission')}</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Bizning missiyamiz — Toshkent viloyati Bekobod shahridagi ayollarni, ayniqsa iqtisodiy qiyinchiliklarda yashayotgan va jismoniy imkoniyati cheklangan xotinqizlarni qo'l mehnati orqali iqtisodiy mustaqillikka erishishga yordam berish. Biz nafaqat kasb o'rgatamiz, balki hayotga yangicha nazar qaratishga yordam beramiz.
        </p>
      </section>

      {/* Numbers */}
      <section className="py-12 px-4 bg-cream-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-gray-900 text-center mb-10">{t('impact.numbers')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {NUMBERS.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-5 text-center shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="font-playfair text-2xl font-bold text-red-primary">{item.value}</p>
                <p className="text-sm text-gray-500 mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            {t('impact.stories')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORIES.map((story, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">{story.emoji}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{story.name}</h3>
                <p className="text-xs text-red-primary font-medium mb-3">🧵 {story.craft}</p>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{story.story}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exhibitions */}
      <section className="py-12 px-4 bg-red-dark text-cream-primary">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-playfair text-2xl font-bold text-gold-primary mb-6">{t('impact.exhibitions')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { year: '2022', event: 'Toshkent viloyat ko\'rgazmasi' },
              { year: '2023', event: 'O\'zbekiston hunarmandlari anjumani' },
              { year: '2024', event: 'Xalqaro hunarmandchilik yarmarkasi' },
            ].map((e, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4">
                <p className="text-gold-light text-lg font-bold">{e.year}</p>
                <p className="text-cream-dark/90 text-sm mt-1">{e.event}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { src: '/photo_2026-06-06_19-23-13.jpg', caption: 'Ko\'rgazma — ichki' },
              { src: '/photo_2026-06-06_19-23-21.jpg', caption: 'Ko\'rgazma — tashqi' },
              { src: '/photo_2026-06-06_19-24-05.jpg', caption: 'Gulchilik ko\'rgazmasi' },
            ].map((img, i) => (
              <motion.div
                key={i}
                className="rounded-2xl overflow-hidden aspect-video shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
