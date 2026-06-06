import { useTranslation } from 'react-i18next';
import { useOrders, useUpdateOrderStatus } from '../../hooks/useOrders';
import { formatPrice } from '../../lib/utils';
import type { OrderStatus } from '../../types';

const STATUSES: { value: OrderStatus; label: string; color: string }[] = [
  { value: 'new', label: 'Yangi', color: 'bg-blue-100 text-blue-600' },
  { value: 'confirmed', label: 'Tasdiqlangan', color: 'bg-indigo-100 text-indigo-600' },
  { value: 'in_progress', label: 'Jarayonda', color: 'bg-amber-100 text-amber-600' },
  { value: 'ready', label: 'Tayyor', color: 'bg-teal-100 text-teal-600' },
  { value: 'delivered', label: 'Yetkazildi', color: 'bg-green-100 text-green-600' },
  { value: 'cancelled', label: 'Bekor', color: 'bg-red-100 text-red-600' },
];

export default function OrdersTable() {
  const { t } = useTranslation();
  const { data: orders = [], isLoading } = useOrders();
  const { mutate: updateStatus } = useUpdateOrderStatus();

  if (isLoading) return <div className="text-center py-12 text-gray-400">{t('common.loading')}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">{t('admin.orders')}</h1>

      {/* Desktop table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['ID', 'Mijoz', 'Telefon', 'Jami', 'To\'lov', 'Status', 'Sana'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-gray-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => {
                const st = STATUSES.find((s) => s.value === order.status);
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">{order.id.slice(0, 8)}</td>
                    <td className="px-4 py-3 font-medium">{order.customer_name}</td>
                    <td className="px-4 py-3 text-gray-500">{order.phone}</td>
                    <td className="px-4 py-3 text-red-primary font-semibold">{formatPrice(order.total_uzs)}</td>
                    <td className="px-4 py-3 text-gray-500">{order.payment_method}</td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus({ id: order.id, status: e.target.value as OrderStatus })}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${st?.color}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {new Date(order.created_at).toLocaleDateString('uz-UZ')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">Buyurtmalar yo'q</p>
          )}
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {orders.map((order) => {
          const st = STATUSES.find((s) => s.value === order.status);
          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{order.customer_name}</p>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${st?.color}`}>{st?.label}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-primary font-bold">{formatPrice(order.total_uzs)}</span>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus({ id: order.id, status: e.target.value as OrderStatus })}
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1"
                >
                  {STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
