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
        email: '',
        delivery_type: 'yetkazib_berish',
        payment_method: 'naqd',
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
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Izoh (ixtiyoriy)</label>
        <textarea
          rows={3}
          placeholder="Manzil, maxsus talab yoki qo'shimcha ma'lumot..."
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
