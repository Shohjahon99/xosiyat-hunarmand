import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRIMARY = import.meta.env.VITE_TELEGRAM_PRIMARY || 'https://t.me/';

export default function TelegramButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 md:right-6 z-[9998] flex flex-col items-end gap-2">
      {/* Channel pill */}
      <AnimatePresence>
        {hovered && (
          <motion.a
            href={PRIMARY}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-telegram text-white text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
          >
            📢 Kanalga obuna bo'ling →
          </motion.a>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-telegram shadow-xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => window.open(PRIMARY, '_blank')}
        aria-label="Telegram orqali bog'laning"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-telegram animate-pulse-telegram" />
        <span className="absolute inset-0 rounded-full bg-telegram animate-pulse-telegram delay-500" />

        {/* Telegram icon */}
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-8 md:h-8 fill-white relative z-10">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </motion.button>
    </div>
  );
}
