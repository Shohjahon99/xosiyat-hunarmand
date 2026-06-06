import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../../store/cartStore';

const LANGUAGES = [
  { code: 'uz', flag: '🇺🇿', label: "O'z" },
  { code: 'ru', flag: '🇷🇺', label: 'Ру' },
  { code: 'en', flag: '🇬🇧', label: 'En' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { getTotalItems, toggleCart } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 100);
      setLastY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/mahsulotlar', label: t('nav.products') },
    { to: '/markaz', label: t('nav.center') },
    { to: '/ijtimoiy-tasir', label: t('nav.impact') },
    { to: '/boglanish', label: t('nav.contact') },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-sm' : 'bg-transparent'
        }`}
        animate={{ y: hidden ? '-100%' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <svg viewBox="0 0 32 32" className="w-8 h-8 text-red-primary" fill="currentColor">
              <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 2c6.627 0 12 5.373 12 12S22.627 28 16 28 4 22.627 4 16 9.373 4 16 4zm-1 4v9l7 4-1.5 2.5L13 20V8h2z"/>
            </svg>
            <span className="font-playfair font-bold text-lg text-red-primary leading-tight hidden xs:block">
              Hosiyat<br />
              <span className="text-gold-primary text-sm font-normal">Hunarmand</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors hover:text-red-primary ${
                  location.pathname === l.to ? 'text-red-primary' : 'text-gray-700'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right: lang + cart + hamburger */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`text-xs px-2 py-1 rounded-md transition-all ${
                    i18n.language === lang.code
                      ? 'bg-red-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={t('nav.cart')}
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-72 bg-cream-primary shadow-2xl flex flex-col pt-20 px-6 pb-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      location.pathname === l.to
                        ? 'bg-red-primary text-white'
                        : 'text-gray-700 hover:bg-cream-dark'
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              {/* Language on mobile */}
              <div className="mt-auto">
                <p className="text-xs text-gray-500 mb-2">{t('nav.language')}</p>
                <div className="flex gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { i18n.changeLanguage(lang.code); setMenuOpen(false); }}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        i18n.language === lang.code
                          ? 'bg-red-primary text-white'
                          : 'bg-white text-gray-700 border border-gray-200'
                      }`}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
