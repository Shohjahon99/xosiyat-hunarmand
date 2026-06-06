import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types';

interface ProductFilters {
  category?: Category | 'all';
  search?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc';
  featured?: boolean;
}

async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  let query = supabase.from('products').select('*');
  if (filters?.category && filters.category !== 'all') query = query.eq('category', filters.category);
  if (filters?.featured) query = query.eq('is_featured', true);
  if (filters?.search) query = query.ilike('title_uz', `%${filters.search}%`);
  if (filters?.sort === 'price_asc') query = query.order('price_uzs', { ascending: true });
  else if (filters?.sort === 'price_desc') query = query.order('price_uzs', { ascending: false });
  else query = query.order('created_at', { ascending: false });
  const { data, error } = await query;
  if (error) throw error;
  return (data as Product[]) || [];
}

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) throw error;
      return data as Product;
    },
    enabled: !!id,
  });
}

export function useFeaturedProducts() {
  return useProducts({ featured: true });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Omit<Product, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('products').insert(product).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...product }: Partial<Product> & { id: string }) => {
      const { data, error } = await supabase.from('products').update(product).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}
