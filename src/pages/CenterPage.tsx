import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { sendEnrollmentNotification } from '../lib/telegram';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const CRAFTS = ['tikuvchilik', 'toqivchilik', 'korpa_toshak', 'gulchilik', 'qogirchoq', 'qandolatchilik'];

const WHAT_WE_TEACH = [
  { emoji: '🧵', title: 'Tikuvchilik', desc: "Milliy kiyim va zamonaviy modellarni tikish" },
  { emoji: '🧶', title: 'To\'quvchilik', desc: "Ip bilan to'qimachilik va bezatish" },
  { emoji: '🌸', title: 'Gulchilik', desc: "Suniy va quritilgan gul tayyorlash" },
  { emoji: '🧸', title: "Qo'g'irchoq yasash", desc: "Bolalar uchun xavfsiz o'yinchoqlar" },
  { emoji: '🛏️', title: "Ko'rpa-to'shak", desc: "Milliy ko'rpa va matras tayyorlash" },
  { emoji: '🍬', title: 'Qandolatchilik', desc: "Qo'l mehnati sovg'alari va dekor" },
];

export default function CenterPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    full_name: '', phone: '', interested_craft: '',
    has_disability: false, message: '',
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: typeof form) => {
      const { data: result, error } = await supabase
        .from('enrollment_requests')
        .insert({ ...data, status: 'new' })
        .select()
        .single();
      if (error) throw error;
      await sendEnrollmentNotification(result).catch(() => {});
      return result;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.phone) {
      toast.error("Ism va telefon kiritish shart!");
      return;
    }
    try {
      await mutateAsync(form);
      toast.success(t('center.enroll_success'));
      setForm({ full_name: '', phone: '', interested_craft: '', has_disability: false, message: '' });
    } catch {
      toast.error(t('common.error'));
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-red-dark text-cream-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="font-playfair text-3xl md:text-5xl font-bold text-gold-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('center.title')}
          </motion.h1>
          <motion.p
            className="text-cream-dark/90 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            2014-yildan buyon Bekobod shahrida hunarmandchilik an'analarini saqlab,
            yuz dan ortiq ayolni kasb-hunar egasi qildik.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('center.story')}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Hosiyat Hunarmand markazi 2014-yilda Toshkent viloyati Bekobod shahrida birgina xona va bir necha asbob-uskunalar bilan boshlandi. Maqsad oddiy edi — mahalliy ayollarni hunarmandchilik orqali iqtisodiy mustaqillikka erishishga yordam berish.</p>
              <p>Bugun biz 6 ta yo'nalish bo'yicha ta'lim beramiz va 100 dan ortiq shogirdimiz o'z mahsulotlarini sotib, oilasi uchun zarur daromad topmoqda.</p>
              <p>Jismoniy imkoniyati cheklangan ayollar ham bizda o'qiydi va ishlab chiqaradi — chunki qo'l mehnati hech qanday chegara bilmaydi.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img
              src="/photo_2026-06-06_19-24-24.jpg"
              alt="Tikuvchilik ustaxonasi"
              className="rounded-2xl object-cover w-full h-40 col-span-2"
            />
            <img
              src="/photo_2026-06-06_19-23-05.jpg"
              alt="Toqivchilik darsi"
              className="rounded-2xl object-cover w-full h-36"
            />
            <img
              src="/photo_2026-06-06_19-24-09.jpg"
              alt="Gulchilik darsi"
              className="rounded-2xl object-cover w-full h-36"
            />
          </div>
        </div>
      </section>

      {/* What we teach */}
      <section className="py-12 px-4 bg-cream-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            {t('center.what_we_teach')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {WHAT_WE_TEACH.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-5 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment form */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            {t('center.enroll')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl p-6 shadow-sm">
            <Input
              label={t('center.enroll_name')}
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              placeholder="Ism familiyangiz"
            />
            <Input
              label={t('center.enroll_phone')}
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+998 90 000 00 00"
            />
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">{t('center.enroll_craft')}</label>
              <select
                value={form.interested_craft}
                onChange={(e) => setForm({ ...form, interested_craft: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30"
              >
                <option value="">Tanlang...</option>
                {CRAFTS.map((c) => (
                  <option key={c} value={c}>{t(`categories.${c}`)}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.has_disability}
                onChange={(e) => setForm({ ...form, has_disability: e.target.checked })}
                className="w-4 h-4 accent-red-primary"
              />
              <span className="text-sm text-gray-700">{t('center.enroll_disability')}</span>
            </label>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">{t('center.enroll_message')}</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30 resize-none"
                placeholder="Qo'shimcha ma'lumot..."
              />
            </div>
            <Button type="submit" size="lg" loading={isPending} className="w-full">
              {t('center.enroll_submit')}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
