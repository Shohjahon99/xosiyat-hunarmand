import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendContactNotification } from '../lib/telegram';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const PRIMARY = import.meta.env.VITE_TELEGRAM_PRIMARY || 'https://t.me/';

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', phone: '', type: '', category: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast.error("Ism va telefon kiritish shart!"); return; }
    setSending(true);
    try {
      await sendContactNotification(form);
      setSent(true);
      toast.success(t('contact.form_success'));
    } catch {
      toast.error(t('common.error'));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-cream-dark py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="font-playfair text-3xl md:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('contact.title')}
          </motion.h1>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-red-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{t('contact.address')}</h3>
                  <p className="text-gray-500 text-sm">Toshkent viloyati, Bekobod shahar, Taraqiyot M.F.Y, Chustiy ko'chasi 68-uy</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{t('contact.phone')}</h3>
                  <a href="tel:+998901105107" className="text-gray-500 text-sm hover:text-red-primary">+998 90 110 51 07</a>
                  <br />
                  <a href="tel:+998779750972" className="text-gray-500 text-sm hover:text-red-primary">+998 77 975 09 72</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-telegram/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-telegram">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{t('contact.telegram')}</h3>
                  <a href={PRIMARY} target="_blank" rel="noopener noreferrer" className="text-telegram text-sm hover:underline">
                    @hosiyat_hunarmand
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{t('contact.hours')}</h3>
                  <table className="text-sm text-gray-500">
                    <tbody>
                      <tr><td className="pr-4">Du – Juma</td><td>09:00 – 18:00</td></tr>
                      <tr><td className="pr-4">Shanba</td><td>09:00 – 15:00</td></tr>
                      <tr><td className="pr-4">Yakshanba</td><td>Dam olish</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{t('contact.form_success')}</h3>
                <p className="text-gray-500 text-sm">Tez orada siz bilan bog'lanamiz</p>
                <Button className="mt-6" onClick={() => setSent(false)}>Yangi murojaat</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label={t('contact.form_name')} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ism familiyangiz" />
                <Input label={t('contact.form_phone')} type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+998 90 000 00 00" />

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">{t('contact.form_type')}</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30"
                  >
                    <option value="">Tanlang...</option>
                    <option value="buyurtma">{t('contact.form_type_order')}</option>
                    <option value="savol">{t('contact.form_type_question')}</option>
                    <option value="hamkorlik">{t('contact.form_type_partnership')}</option>
                    <option value="boshqa">{t('contact.form_type_other')}</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">{t('contact.form_message')}</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30 resize-none"
                    placeholder="Xabaringizni yozing..."
                  />
                </div>

                <Button type="submit" size="lg" loading={sending} className="w-full">
                  {t('contact.form_submit')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
