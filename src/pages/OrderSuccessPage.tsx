import { useLocation } from 'react-router-dom';
import OrderConfirmation from '../components/checkout/OrderConfirmation';

export default function OrderSuccessPage() {
  const location = useLocation();
  const orderId = location.state?.orderId;
  return <OrderConfirmation orderId={orderId} />;
}
