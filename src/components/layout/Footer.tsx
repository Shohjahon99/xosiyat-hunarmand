import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Clock } from 'lucide-react';

const PRIMARY = import.meta.env.VITE_TELEGRAM_PRIMARY || 'https://t.me/';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-red-dark text-cream-primary">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-xl font-bold text-gold-primary mb-3">Hosiyat Hunarmand</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Qo'l mehnati bilan yaratilgan sifatli mahsulotlar va hunarmandchilik markazi.
            </p>
            <div className="flex gap-3 mt-4">
              <a href={PRIMARY} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-telegram flex items-center justify-center hover:opacity-90 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gold-primary mb-3">Sahifalar</h4>
            <nav className="flex flex-col gap-2 text-sm">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/mahsulotlar', label: t('nav.products') },
                { to: '/markaz', label: t('nav.center') },
                { to: '/ijtimoiy-tasir', label: t('nav.impact') },
                { to: '/boglanish', label: t('nav.contact') },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="opacity-80 hover:opacity-100 hover:text-gold-light transition-opacity">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gold-primary mb-3">{t('contact.title')}</h4>
            <div className="flex flex-col gap-2 text-sm opacity-80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-light" />
                <span>Toshkent vil., Bekobod sh., Chustiy ko'chasi 68</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-gold-light" />
                <a href="tel:+998901105107" className="hover:text-gold-light">+998 90 110 51 07</a>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-gold-light">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <a href={PRIMARY} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">@hosiyat_hunarmand</a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-gold-primary mb-3">{t('contact.hours')}</h4>
            <div className="flex flex-col gap-1.5 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-light" />
                <span>Du–Juma: 09:00–18:00</span>
              </div>
              <span className="ml-6">Shanba: 09:00–15:00</span>
              <span className="ml-6">Yakshanba: Dam olish</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs opacity-60">
          <p>© 2024 Hosiyat Hunarmand. Barcha huquqlar himoyalangan.</p>
          <p>Qo'l mehnati bilan ❤️</p>
        </div>
      </div>
    </footer>
  );
}
