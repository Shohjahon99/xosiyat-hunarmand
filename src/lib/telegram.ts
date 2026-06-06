import type { Order, EnrollmentRequest } from '../types';

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8232034213:AAEUuqx0Xw8p1K8RTRQexhLYlbEykISXHn4';
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '-5201579343';

async function sendMessage(text: string): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID) return;
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
    });
  } catch {
    // Silently fail — order is already saved to DB
  }
}

export async function sendTelegramNotification(order: Order): Promise<void> {
  const itemsList = order.items
    .map((i) => `  • ${i.product_title} x${i.quantity}`)
    .join('\n');

  const message = `🛍️ <b>YANGI BUYURTMA!</b>

👤 Mijoz: ${order.customer_name}
📞 Telefon: <a href="tel:${order.phone}">${order.phone}</a>
📦 Mahsulotlar:
${itemsList}
💰 Jami: ${order.total_uzs.toLocaleString()} UZS
🚚 Yetkazish: ${order.delivery_type}
💳 To'lov: ${order.payment_method}
📝 Izoh: ${order.custom_requirements || '-'}
🕐 Vaqt: ${new Date().toLocaleString('uz-UZ')}`;

  await sendMessage(message);
}

export async function sendEnrollmentNotification(req: EnrollmentRequest): Promise<void> {
  const message = `📚 <b>YANGI O'QUV SO'ROVI!</b>

👤 Ism: ${req.full_name}
📞 Telefon: <a href="tel:${req.phone}">${req.phone}</a>
🧵 Yo'nalish: ${req.interested_craft || '-'}
♿ Nogironlik: ${req.has_disability ? 'Ha' : 'Yo\'q'}
💬 Xabar: ${req.message || '-'}
🕐 Vaqt: ${new Date().toLocaleString('uz-UZ')}`;

  await sendMessage(message);
}

export async function sendContactNotification(data: {
  name: string;
  phone: string;
  type: string;
  category: string;
  message: string;
}): Promise<void> {
  const message = `📬 <b>YANGI MUROJAAT!</b>

👤 Ism: ${data.name}
📞 Telefon: <a href="tel:${data.phone}">${data.phone}</a>
📋 Tur: ${data.type}
🏷️ Kategoriya: ${data.category}
💬 Xabar: ${data.message}
🕐 Vaqt: ${new Date().toLocaleString('uz-UZ')}`;

  await sendMessage(message);
}
