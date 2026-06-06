import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './i18n';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import TelegramButton from './components/layout/TelegramButton';
import CartDrawer from './components/cart/CartDrawer';
import LoadingScreen from './components/ui/LoadingScreen';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CenterPage = lazy(() => import('./pages/CenterPage'));
const ImpactPage = lazy(() => import('./pages/ImpactPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 1000 * 60 * 5 } },
});

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-4xl animate-bounce">🧶</div>
            </div>
          }
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/mahsulotlar" element={<PageTransition><ProductsPage /></PageTransition>} />
            <Route path="/mahsulotlar/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
            <Route path="/markaz" element={<PageTransition><CenterPage /></PageTransition>} />
            <Route path="/ijtimoiy-tasir" element={<PageTransition><ImpactPage /></PageTransition>} />
            <Route path="/boglanish" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/savat" element={<PageTransition><CartPage /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
            <Route path="/buyurtma-tasdiqlandi" element={<PageTransition><OrderSuccessPage /></PageTransition>} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      {!isAdmin && <Footer />}
      {!isAdmin && <TelegramButton />}
      {!isAdmin && <CartDrawer />}
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollProgress />
        <LoadingScreen visible={loading} />
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'font-inter text-sm',
            style: { borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
            success: { iconTheme: { primary: '#2C7873', secondary: 'white' } },
            error: { iconTheme: { primary: '#C0392B', secondary: 'white' } },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
