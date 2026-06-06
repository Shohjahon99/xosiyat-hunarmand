import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const NAV = [
  { to: '/admin', end: true, icon: LayoutDashboard, key: 'admin.dashboard' },
  { to: '/admin/orders', icon: ShoppingBag, key: 'admin.orders' },
  { to: '/admin/products', icon: Package, key: 'admin.products' },
  { to: '/admin/enrollments', icon: Users, key: 'admin.enrollments' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin');
  };

  const Sidebar = () => (
    <div className="h-full flex flex-col">
      <div className="p-5 border-b border-white/10">
        <h2 className="font-playfair text-lg font-bold text-gold-primary">Admin Panel</h2>
        <p className="text-cream-dark/60 text-xs mt-0.5">Hosiyat Hunarmand</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gold-primary text-red-dark'
                  : 'text-cream-dark hover:bg-white/10'
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            {t(item.key)}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-cream-dark hover:bg-white/10 w-full transition-all"
        >
          <LogOut className="w-4 h-4" />
          {t('admin.logout')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 bg-red-dark flex-col shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-56 bg-red-dark">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-red-dark">
          <button onClick={() => setSidebarOpen(true)} className="text-white">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-playfair text-gold-primary font-bold">Admin Panel</span>
        </div>
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
