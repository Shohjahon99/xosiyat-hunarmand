import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  visible: boolean;
}

export default function LoadingScreen({ visible }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream-primary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated yarn ball */}
          <motion.div
            className="relative w-24 h-24 mb-6"
            animate={{ x: [0, 40, 0, -40, 0], rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="#C0392B" />
              <path d="M20,50 Q50,10 80,50 Q50,90 20,50" fill="none" stroke="#E8A838" strokeWidth="3" />
              <path d="M30,25 Q70,50 30,75" fill="none" stroke="#FDF6EC" strokeWidth="2.5" opacity="0.7" />
              <path d="M70,25 Q30,50 70,75" fill="none" stroke="#FDF6EC" strokeWidth="2.5" opacity="0.7" />
              <circle cx="50" cy="20" r="4" fill="#E8A838" />
              <line x1="50" y1="16" x2="55" y2="5" stroke="#E8A838" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* Logo text reveal */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h1
              className="font-playfair text-3xl md:text-4xl text-red-primary font-bold"
              initial={{ letterSpacing: '0.5em', opacity: 0 }}
              animate={{ letterSpacing: '0.05em', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hosiyat
            </motion.h1>
            <motion.p
              className="font-playfair text-xl text-gold-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Hunarmand
            </motion.p>
          </motion.div>

          {/* Loading dots */}
          <div className="flex gap-1.5 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-red-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
