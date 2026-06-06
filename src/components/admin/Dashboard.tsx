import { useTranslation } from 'react-i18next';
import { ShoppingBag, DollarSign, Clock, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { useOrders } from '../../hooks/useOrders';
import { useProducts } from '../../hooks/useProducts';
import { formatPrice } from '../../lib/utils';
import { runSeed } from '../../lib/seedData';
import Button from '../ui/Button';
import { useState } from 'react';

export default function Dashboard() {
  const { t } = useTranslation();
  const { data: orders = [] } = useOrders();
  const { data: products = [] } = useProducts();
  const [seeding, setSeeding] = useState(false);

  const today = new Date().toDateString();
  const todayOrders = orders.filter((o) => new Date(o.created_at).toDateString() === today);
  const pending = orders.filter((o) => o.status === 'new' || o.status === 'confirmed');
  const totalRevenue = orders
    .filter((o) => o.status === 'delivered')
    .reduce((s, o) => s + o.total_uzs, 0);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await runSeed();
      toast.success(t('admin.seed_success'));
    } catch {
      toast.error(t('admin.seed_error'));
    } finally {
      setSeeding(false);
    }
  };

  const stats = [
    { icon: ShoppingBag, label: t('admin.today_orders'), value: todayOrders.length, color: 'bg-blue-500' },
    { icon: DollarSign, label: t('admin.total_revenue'), value: formatPrice(totalRevenue), color: 'bg-green-500' },
    { icon: Clock, label: t('admin.pending'), value: pending.length, color: 'bg-amber-500' },
    { icon: Package, label: t('admin.total_products'), value: products.length, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.dashboard')}</h1>
        <Button size="sm" variant="outline" loading={seeding} onClick={handleSeed}>
          🌱 {t('admin.seed_data')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold">{t('admin.orders')} (so'nggi 5 ta)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">ID</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Mijoz</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Jami</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{order.id.slice(0, 8)}</td>
                  <td className="px-4 py-3 font-medium">{order.customer_name}</td>
                  <td className="px-4 py-3 text-red-primary font-medium">{formatPrice(order.total_uzs)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'new' ? 'bg-blue-100 text-blue-600' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">Buyurtmalar yo'q</p>
          )}
        </div>
      </div>
    </div>
  );
}
