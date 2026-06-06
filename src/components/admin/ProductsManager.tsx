import { useState, useRef } from 'react';
import { Plus, Pencil, Trash2, X, Upload, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useProducts';
import { formatPrice } from '../../lib/utils';
import { supabase } from '../../lib/supabase';
import type { Product, Category } from '../../types';
import Button from '../ui/Button';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'tikuvchilik', label: 'Tikuvchilik' },
  { value: 'toqivchilik', label: "To'quvchilik" },
  { value: 'korpa_toshak', label: "Ko'rpa-to'shak" },
  { value: 'gulchilik', label: 'Gulchilik' },
  { value: 'qogirchoq', label: "Qo'g'irchoq" },
  { value: 'qandolatchilik', label: 'Qandolatchilik' },
];

const emptyForm = () => ({
  title_uz: '',
  category: 'tikuvchilik' as Category,
  price_uzs: 0,
  image: '',
});

async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
  return data.publicUrl;
}

export default function ProductsManager() {
  const { data: products = [] } = useProducts();
  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setPreview('');
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      title_uz: p.title_uz,
      category: p.category,
      price_uzs: p.price_uzs,
      image: p.images?.[0] || '',
    });
    setPreview(p.images?.[0] || '');
    setModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, image: url }));
      toast.success("Rasm yuklandi!");
    } catch (err) {
      toast.error("Rasm yuklanmadi, qaytadan urinib ko'ring");
      setPreview('');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.title_uz.trim()) { toast.error("Nomi kiritilmagan!"); return; }
    if (!form.price_uzs) { toast.error("Narx kiritilmagan!"); return; }
    setSaving(true);
    try {
      const data = {
        title_uz: form.title_uz,
        title_ru: form.title_uz,
        title_en: form.title_uz,
        description_uz: '', description_ru: '', description_en: '',
        category: form.category,
        price_uzs: form.price_uzs,
        images: form.image ? [form.image] : [],
        sizes_available: [],
        is_custom_order: false,
        is_featured: true,
        in_stock: true,
        stock_count: 99,
      };
      if (editing) {
        await updateProduct({ id: editing.id, ...data });
        toast.success("Mahsulot yangilandi!");
      } else {
        await createProduct(data);
        toast.success("Mahsulot qo'shildi!");
      }
      setModalOpen(false);
    } catch {
      toast.error("Xatolik yuz berdi!");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    try {
      await deleteProduct(id);
      toast.success("O'chirildi!");
    } catch {
      toast.error("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mahsulotlar</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-red-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Qo'shish
        </button>
      </div>

      {products.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">📦</div>
          <p>Hali mahsulot qo'shilmagan</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {p.images?.[0] ? (
              <img src={p.images[0]} alt={p.title_uz} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-cream-dark flex items-center justify-center text-4xl">🧵</div>
            )}
            <div className="p-4">
              <p className="font-semibold text-gray-800 line-clamp-1">{p.title_uz}</p>
              <p className="text-red-primary font-bold text-sm mt-0.5">{formatPrice(p.price_uzs)}</p>
              <p className="text-xs text-gray-400 mb-3">{CATEGORIES.find(c => c.value === p.category)?.label}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="flex-1 flex items-center justify-center gap-1 border border-gray-200 rounded-lg py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                >
                  <Pencil className="w-3 h-3" /> Tahrirlash
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex items-center justify-center px-3 bg-red-50 rounded-lg text-red-500 hover:bg-red-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="font-semibold text-gray-800">
                {editing ? 'Mahsulotni tahrirlash' : "Yangi mahsulot qo'shish"}
              </h2>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Image upload area */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Mahsulot rasmi</label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {preview ? (
                  <div className="relative">
                    <img src={preview} alt="" className="w-full h-48 object-cover rounded-xl" />
                    <button
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-3 py-1.5 rounded-lg shadow flex items-center gap-1.5 hover:bg-white"
                    >
                      <Upload className="w-3 h-3" />
                      {uploading ? 'Yuklanmoqda...' : 'Almashtirish'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="w-full h-40 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-red-primary hover:text-red-primary transition-colors"
                  >
                    {uploading ? (
                      <>
                        <div className="w-8 h-8 border-2 border-red-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm">Yuklanmoqda...</span>
                      </>
                    ) : (
                      <>
                        <Image className="w-8 h-8" />
                        <span className="text-sm font-medium">Rasm yuklash</span>
                        <span className="text-xs">JPG, PNG, WEBP (max 5MB)</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Mahsulot nomi</label>
                <input
                  value={form.title_uz}
                  onChange={(e) => setForm({ ...form, title_uz: e.target.value })}
                  placeholder="Masalan: Milliy ko'rpa"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Kategoriya</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30"
                >
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Narx (so'm)</label>
                <input
                  type="number"
                  value={form.price_uzs || ''}
                  onChange={(e) => setForm({ ...form, price_uzs: Number(e.target.value) })}
                  placeholder="150000"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30"
                />
              </div>
            </div>

            <div className="px-5 py-4 border-t flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Bekor qilish
              </button>
              <Button loading={saving} onClick={handleSave}>Saqlash</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
