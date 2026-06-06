import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
// Must be a valid JWT-like string to pass Supabase client validation
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/*
SQL SCHEMA - Run this in your Supabase SQL editor:

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_uz text NOT NULL,
  title_ru text NOT NULL,
  title_en text NOT NULL,
  description_uz text,
  description_ru text,
  description_en text,
  category text NOT NULL CHECK (category IN
    ('tikuvchilik','toqivchilik','korpa_toshak','gulchilik','qogirchoq','qandolatchilik')),
  price_uzs integer NOT NULL,
  images text[] DEFAULT '{}',
  sizes_available text[] DEFAULT '{}',
  is_custom_order boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  in_stock boolean DEFAULT true,
  stock_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text,
  request_type text,
  items jsonb DEFAULT '[]',
  custom_requirements text,
  reference_image_url text,
  total_uzs integer DEFAULT 0,
  delivery_type text DEFAULT 'yetkazib_berish',
  payment_method text DEFAULT 'naqd',
  status text DEFAULT 'new' CHECK (status IN
    ('new','confirmed','in_progress','ready','delivered','cancelled')),
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE enrollment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  interested_craft text,
  has_disability boolean DEFAULT false,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  rating integer CHECK (rating BETWEEN 1 AND 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_products" ON products FOR SELECT USING (true);
CREATE POLICY "auth_write_products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "public_insert_orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "auth_read_orders" ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_update_orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "public_insert_enrollment" ON enrollment_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "auth_read_enrollment" ON enrollment_requests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "public_read_reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "public_insert_reviews" ON reviews FOR INSERT WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('order-references', 'order-references', false);
*/
