import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import ConfettiEffect from '../ui/ConfettiEffect';
import Button from '../ui/Button';

interface OrderConfirmationProps {
  orderId?: string;
}

export default function OrderConfirmation({ orderId }: OrderConfirmationProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      {showConfetti && <ConfettiEffect />}
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle2 className="w-24 h-24 text-green-500" strokeWidth={1.5} />
        </motion.div>

        <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-3">Buyurtma qabul qilindi!</h1>
        <p className="text-gray-500 mb-2">Tez orada siz bilan bog'lanamiz</p>
        {orderId && (
          <p className="text-xs text-gray-400 mb-8">
            Buyurtma raqami: <span className="font-mono">{orderId.slice(0, 8).toUpperCase()}</span>
          </p>
        )}

        <Link to="/mahsulotlar">
          <Button variant="outline">Xaridni davom ettirish</Button>
        </Link>
      </motion.div>
    </div>
  );
}
