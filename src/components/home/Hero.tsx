import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

const SUBTITLES_KEYS = [
  'hero.subtitle_1', 'hero.subtitle_2', 'hero.subtitle_3',
  'hero.subtitle_4', 'hero.subtitle_5', 'hero.subtitle_6',
];

export default function Hero() {
  const { t } = useTranslation();
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter
  useEffect(() => {
    const target = t(SUBTITLES_KEYS[subtitleIdx]);
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === target.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setIsDeleting(false);
      setSubtitleIdx((i) => (i + 1) % SUBTITLES_KEYS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, subtitleIdx, t]);

  // Floating particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 6 + 3, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      color: ['#C0392B', '#E8A838', '#2C7873'][Math.floor(Math.random() * 3)],
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '33';
        ctx.fill();
        ctx.strokeStyle = p.color + '88';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const words = t('hero.title').split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-primary bg-textile-pattern">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-28">
        {/* Heading */}
        <h1 className="font-playfair font-fluid-3xl font-bold text-gray-900 leading-tight mb-4">
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              className="inline-block mr-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        {/* Typewriter subtitle */}
        <motion.div
          className="h-12 md:h-14 flex items-center justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="font-fluid-xl text-red-primary font-semibold">
            {displayed}
            <span className="inline-block w-0.5 h-7 bg-red-primary ml-1 animate-pulse" />
          </span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Link to="/mahsulotlar">
            <Button size="lg" className="w-full sm:w-auto font-semibold px-8">
              {t('hero.cta_primary')}
            </Button>
          </Link>
          <Link to="/markaz">
            <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold px-8">
              {t('hero.cta_secondary')}
            </Button>
          </Link>
        </motion.div>

        {/* Scroll arrow */}
        <motion.a
          href="#stats"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 hover:text-red-primary transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-xs mb-1">{t('hero.scroll_down')}</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
}
