import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useProducts';
import { formatPrice, getImageUrl } from '../../lib/utils';
import type { Product, Category } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';

const CATEGORIES: Category[] = ['tikuvchilik', 'toqivchilik', 'korpa_toshak', 'gulchilik', 'qogirchoq', 'qandolatchilik'];

const emptyProduct = (): Omit<Product, 'id' | 'created_at'> => ({
  title_uz: '', title_ru: '', title_en: '',
  description_uz: '', description_ru: '', description_en: '',
  category: 'tikuvchilik',
  price_uzs: 0,
  images: [],
  sizes_available: [],
  is_custom_order: false,
  is_featured: false,
  in_stock: true,
  stock_count: 0,
});

export default function ProductsManager() {
  const { t } = useTranslation();
  const { data: products = [] } = useProducts();
  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct());
  const [saving, setSaving] = useState(false);
  const [sizesInput, setSizesInput] = useState('');
  const [imagesInput, setImagesInput] = useState('');

  const openCreate = () => {
    setEditing(null);
    setForm(emptyProduct());
    setSizesInput('');
    setImagesInput('');
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm(p);
    setSizesInput(p.sizes_available.join(', '));
    setImagesInput(p.images.join('\n'));
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = {
        ...form,
        sizes_available: sizesInput.split(',').map((s) => s.trim()).filter(Boolean),
        images: imagesInput.split('\n').map((s) => s.trim()).filter(Boolean),
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
      toast.error(t('common.error'));
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
      toast.error(t('common.error'));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.products')}</h1>
        <Button size="sm" onClick={openCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> {t('common.add')}
        </Button>
      </div>

      {/* Product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <img
              src={getImageUrl(p.images?.[0])}
              alt={p.title_uz}
              className="w-full h-36 object-cover bg-cream-dark"
            />
            <div className="p-4">
              <p className="font-semibold text-sm line-clamp-1">{p.title_uz}</p>
              <p className="text-red-primary font-bold text-sm">{formatPrice(p.price_uzs)}</p>
              <p className="text-xs text-gray-400 mb-3">{p.category}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1">
                  <Pencil className="w-3 h-3" /> {t('common.edit')}
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)} className="flex items-center justify-center gap-1 px-3">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-4 px-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl my-auto">
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="font-semibold">{editing ? t('common.edit') : t('common.add')} mahsulot</h2>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input label="Nomi (UZ)" value={form.title_uz} onChange={(e) => setForm({ ...form, title_uz: e.target.value })} />
                <Input label="Nomi (RU)" value={form.title_ru} onChange={(e) => setForm({ ...form, title_ru: e.target.value })} />
                <Input label="Nomi (EN)" value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Kategoriya</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{t(`categories.${c}`)}</option>)}
                </select>
              </div>
              <Input
                label="Narx (UZS)" type="number"
                value={form.price_uzs}
                onChange={(e) => setForm({ ...form, price_uzs: Number(e.target.value) })}
              />
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Rasmlar (har qatori - bitta URL)</label>
                <textarea
                  rows={3}
                  value={imagesInput}
                  onChange={(e) => setImagesInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30 resize-none"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Razmlar (vergul bilan)</label>
                <input
                  value={sizesInput}
                  onChange={(e) => setSizesInput(e.target.value)}
                  placeholder="S, M, L, XL"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/30"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                {[
                  { key: 'is_featured', label: 'Featured' },
                  { key: 'is_custom_order', label: 'Buyurtma' },
                  { key: 'in_stock', label: 'Mavjud' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form[item.key as keyof typeof form] as boolean}
                      onChange={(e) => setForm({ ...form, [item.key]: e.target.checked })}
                      className="w-4 h-4 accent-red-primary"
                    />
                    <span className="text-sm">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="px-5 py-4 border-t flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>{t('common.cancel')}</Button>
              <Button loading={saving} onClick={handleSave}>{t('common.save')}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
