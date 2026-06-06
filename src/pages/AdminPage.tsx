import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../components/admin/Dashboard';
import OrdersTable from '../components/admin/OrdersTable';
import ProductsManager from '../components/admin/ProductsManager';
import EnrollmentRequests from '../components/admin/EnrollmentRequests';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

function LoginForm() {
  const { t } = useTranslation();
  const { signIn, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
    } catch {
      toast.error("Email yoki parol noto'g'ri");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-dark px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="font-playfair text-2xl font-bold text-red-primary">{t('admin.login_title')}</h1>
          <p className="text-gray-400 text-sm mt-1">Hosiyat Hunarmand</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input id="email" label={t('admin.email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" />
          <Input id="password" label={t('admin.password')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          <Button type="submit" size="lg" loading={loading || isLoading} className="w-full">{t('admin.login')}</Button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user, isLoading, initialize } = useAuthStore();

  useEffect(() => { initialize(); }, [initialize]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-spin">🧶</div>
          <p className="text-gray-400 text-sm">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!user) return <LoginForm />;

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<OrdersTable />} />
        <Route path="products" element={<ProductsManager />} />
        <Route path="enrollments" element={<EnrollmentRequests />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}
