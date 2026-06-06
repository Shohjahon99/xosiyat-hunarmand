import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const REVIEWS = [
  { name: 'Malika Yusupova', role: 'Mijoz', stars: 5, text: "Buyurtma qildim, sifat zo'r! Kelin ko'rpasi juda chiroyli va mustahkam. Hammaga maslahat beraman.", avatar: '👩' },
  { name: 'Nodira Raximova', role: 'Shogird', stars: 5, text: "Markazda o'qib, tikuvchilikni yaxshi o'rgandim. Hozir o'zim mahsulot sotaman. Rahmat ustozlarga!", avatar: '👩‍🎓' },
  { name: 'Dilnoza Toshmatova', role: 'Mijoz', stars: 5, text: "Qo'g'irchoqlar juda yumshoq va xavfsiz. Bolam juda yaxshi ko'radi. Narxi ham yaxshi.", avatar: '👩‍👧' },
  { name: 'Shahnoza Alimova', role: 'Shogird', stars: 5, text: "Gulchilik kursini tugatdim. Endi uyda suniy gul yasab, qo'shimcha daromad topmoqdaman!", avatar: '🌸' },
  { name: 'Barno Hasanova', role: 'Mijoz', stars: 5, text: "Milliy ko'rpa-to'shak to'plami uchun katta rahmat! Sifat juda yuqori, narxi adolatli.", avatar: '🏡' },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useScrollAnimation();

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % REVIEWS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setCurrent((c) => (c + 1) % REVIEWS.length);

  return (
    <section className="py-16 md:py-20 bg-red-dark overflow-hidden" ref={ref}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          className="font-playfair text-2xl md:text-3xl font-bold text-gold-primary text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Mijozlarimiz fikri
        </motion.h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-red-primary/30 border border-gold-primary/20 rounded-2xl p-6 md:p-8 text-center"
            >
              <div className="text-5xl mb-4">{REVIEWS[current].avatar}</div>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: REVIEWS[current].stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-primary text-gold-primary" />
                ))}
              </div>
              <p className="text-cream-primary text-base md:text-lg leading-relaxed mb-6 italic">
                "{REVIEWS[current].text}"
              </p>
              <div>
                <p className="font-semibold text-gold-light">{REVIEWS[current].name}</p>
                <p className="text-cream-dark/70 text-sm">{REVIEWS[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-gold-primary/20 hover:bg-gold-primary/40 flex items-center justify-center text-gold-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-gold-primary/20 hover:bg-gold-primary/40 flex items-center justify-center text-gold-primary transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-gold-primary w-6' : 'bg-gold-primary/30'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
