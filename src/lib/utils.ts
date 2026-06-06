import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getImageUrl(path: string): string {
  if (!path) return 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80';
  if (path.startsWith('http')) return path;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/product-images/${path}`;
}
