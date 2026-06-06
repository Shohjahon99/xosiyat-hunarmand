import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useProducts';
import { formatPrice } from '../../lib/utils';
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

export default function ProductsManager() {
  const { data: products = [] } = useProducts();
  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
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
    setModalOpen(true);
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
        description_uz: '',
        description_ru: '',
        description_en: '',
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
              <p className="text-xs text-gray-400 mb-3 capitalize">{CATEGORIES.find(c => c.value === p.category)?.label}</p>
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
              {/* Preview */}
              {form.image && (
                <img src={form.image} alt="" className="w-full h-40 object-cover rounded-xl" />
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Mahsulot nomi</label>
                <input
                  value={form.title_uz}
                  onChange={(e) => setForm({ ...form, title_uz: e.target.value })}
                  placeholder="Masalan: Milliy ko'rpa"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30"
                />
              </div>

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

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Rasm URL manzili</label>
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://example.com/rasm.jpg"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30"
                />
                <p className="text-xs text-gray-400 mt-1">Rasm linkini kiriting (Google Drive, Cloudinary va h.k.)</p>
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
