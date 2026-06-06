import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';
import { useCreateOrder } from '../../hooks/useOrders';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function CheckoutForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { mutateAsync: createOrder, isPending } = useCreateOrder();

  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    email: '',
    delivery_type: 'yetkazib_berish',
    payment_method: 'naqd',
    custom_requirements: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.customer_name.trim()) e.customer_name = 'Ism kiritish shart';
    if (!form.phone.trim()) e.phone = 'Telefon kiritish shart';
    else if (!/^\+?[0-9]{9,13}$/.test(form.phone.replace(/\s/g, ''))) e.phone = "Noto'g'ri format";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const order = await createOrder({
        ...form,
        items: items.map((i) => ({
          product_id: i.product.id,
          product_title: i.product.title_uz,
          quantity: i.quantity,
          price_uzs: i.product.price_uzs,
          selected_size: i.selected_size,
        })),
        total_uzs: getTotalPrice(),
        status: 'new',
      });
      clearCart();
      navigate('/buyurtma-tasdiqlandi', { state: { orderId: order.id } });
    } catch {
      toast.error(t('common.error'));
    }
  };

  const DELIVERY_OPTIONS = [
    { value: 'yetkazib_berish', label: t('checkout.delivery'), emoji: '🚚' },
    { value: 'olib_ketish', label: t('checkout.pickup'), emoji: '🏪' },
  ];

  const PAYMENT_OPTIONS = [
    { value: 'naqd', label: t('checkout.cash'), emoji: '💵' },
    { value: 'payme', label: t('checkout.payme'), emoji: '💳' },
    { value: 'click', label: t('checkout.click'), emoji: '📱' },
    { value: 'telegram', label: t('checkout.telegram_pay'), emoji: '✈️' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        id="name"
        label={t('checkout.name')}
        placeholder="Ism familiyangiz"
        value={form.customer_name}
        onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
        error={errors.customer_name}
      />
      <Input
        id="phone"
        label={t('checkout.phone')}
        placeholder="+998 90 000 00 00"
        type="tel"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        error={errors.phone}
      />
      <Input
        id="email"
        label={t('checkout.email')}
        placeholder="email@example.com"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      {/* Delivery type */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">{t('checkout.delivery_type')}</label>
        <div className="grid grid-cols-2 gap-3">
          {DELIVERY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm({ ...form, delivery_type: opt.value })}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left ${
                form.delivery_type === opt.value
                  ? 'border-red-primary bg-red-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-xl">{opt.emoji}</span>
              <span className="text-sm font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">{t('checkout.payment')}</label>
        <div className="grid grid-cols-2 gap-3">
          {PAYMENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm({ ...form, payment_method: opt.value })}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left ${
                form.payment_method === opt.value
                  ? 'border-red-primary bg-red-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-xl">{opt.emoji}</span>
              <span className="text-sm font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">{t('checkout.custom_requirements')}</label>
        <textarea
          rows={3}
          placeholder="Maxsus talablar, manzil va boshqa ma'lumotlar..."
          value={form.custom_requirements}
          onChange={(e) => setForm({ ...form, custom_requirements: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30 resize-none"
        />
      </div>

      <Button type="submit" size="lg" loading={isPending} className="w-full">
        {isPending ? t('checkout.processing') : t('checkout.submit')}
      </Button>
    </form>
  );
}
