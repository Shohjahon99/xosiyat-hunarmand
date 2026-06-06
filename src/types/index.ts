export type Category =
  | 'tikuvchilik'
  | 'toqivchilik'
  | 'korpa_toshak'
  | 'gulchilik'
  | 'qogirchoq'
  | 'qandolatchilik';

export type OrderStatus =
  | 'new'
  | 'confirmed'
  | 'in_progress'
  | 'ready'
  | 'delivered'
  | 'cancelled';

export type Language = 'uz' | 'ru' | 'en';

export interface Product {
  id: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz?: string;
  description_ru?: string;
  description_en?: string;
  category: Category;
  price_uzs: number;
  images: string[];
  sizes_available: string[];
  is_custom_order: boolean;
  is_featured: boolean;
  in_stock: boolean;
  stock_count: number;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_title: string;
  quantity: number;
  price_uzs: number;
  selected_size?: string;
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  email?: string;
  request_type?: string;
  items: OrderItem[];
  custom_requirements?: string;
  reference_image_url?: string;
  total_uzs: number;
  delivery_type: string;
  payment_method: string;
  status: OrderStatus;
  notes?: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selected_size?: string;
  custom_note?: string;
}

export interface EnrollmentRequest {
  id: string;
  full_name: string;
  phone: string;
  interested_craft?: string;
  has_disability: boolean;
  message?: string;
  status: string;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number;
  comment?: string;
  created_at: string;
}
