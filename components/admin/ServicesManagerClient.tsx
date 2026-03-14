'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { SERVICE_CATEGORY_LABELS, slugify } from '@/lib/utils';
import MediaPickerModal from './MediaPickerModal';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  featuredImage?: string | null;
  category: string;
  order: number;
  isActive: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

const emptyService: Partial<Service> = {
  title: '',
  slug: '',
  description: '',
  featuredImage: '',
  category: 'OTHER',
  order: 0,
  isActive: true,
  metaTitle: '',
  metaDescription: '',
};

export default function ServicesManagerClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState('');
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  useEffect(() => { fetchServices(); }, []);

  async function fetchServices() {
    try {
      const res = await fetch('/api/services?all=true');
      const data = await res.json();
      setServices(data.services || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!editing) return;
    const slug = editing.slug || slugify(editing.title || '');
    try {
      const url = isNew ? '/api/services' : `/api/services/${editing.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editing, slug }),
      });
      if (!res.ok) throw new Error('Save failed');
      toast.success(`Service ${isNew ? 'created' : 'updated'}`);
      setEditing(null);
      fetchServices();
    } catch {
      toast.error('Save failed');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this service?')) return;
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
      toast.success('Service deleted');
      fetchServices();
    } catch {
      toast.error('Delete failed');
    }
  }

  async function toggleActive(service: Service) {
    try {
      await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...service, isActive: !service.isActive }),
      });
      fetchServices();
    } catch { toast.error('Update failed'); }
  }

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Services</h1>
        <button onClick={() => { setIsNew(true); setEditing({ ...emptyService }); }} className="btn-primary text-sm">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="Search services..."
        />
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="skeleton h-20 rounded-xl" />)}</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Service</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Order</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 text-sm">{service.title}</div>
                    <div className="text-gray-400 text-xs">{service.slug}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="badge-primary text-xs">{SERVICE_CATEGORY_LABELS[service.category] || service.category}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm hidden sm:table-cell">{service.order}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${service.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => toggleActive(service)} className="p-1.5 rounded hover:bg-gray-100" title="Toggle active">
                        {service.isActive ? <EyeOff size={15} className="text-gray-500" /> : <Eye size={15} className="text-gray-500" />}
                      </button>
                      <button onClick={() => { setIsNew(false); setEditing({ ...service }); }} className="p-1.5 rounded hover:bg-gray-100">
                        <Edit2 size={15} className="text-blue-500" />
                      </button>
                      <button onClick={() => handleDelete(service.id)} className="p-1.5 rounded hover:bg-gray-100">
                        <Trash2 size={15} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No services found</div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editing !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold font-heading">{isNew ? 'Add Service' : 'Edit Service'}</h2>
                <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="form-label">Title *</label>
                  <input value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="form-input" placeholder="Service title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Slug</label>
                    <input value={editing.slug || ''} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="form-input" placeholder="auto-generated" />
                  </div>
                  <div>
                    <label className="form-label">Category</label>
                    <select value={editing.category || 'OTHER'} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="form-input">
                      {Object.entries(SERVICE_CATEGORY_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="form-label">Description *</label>
                  <textarea value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="form-input resize-none" rows={4} />
                </div>
                <div>
                  <label className="form-label">Featured Image URL</label>
                  <div className="flex gap-2">
                    <input value={editing.featuredImage || ''} onChange={(e) => setEditing({ ...editing, featuredImage: e.target.value })} className="form-input flex-1" placeholder="/images/services/..." />
                    <button type="button" onClick={() => setShowMediaPicker(true)} className="btn-outline text-sm">Browse</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Order</label>
                    <input type="number" value={editing.order || 0} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) })} className="form-input" />
                  </div>
                  <div className="flex items-center gap-3 pt-7">
                    <input type="checkbox" id="svcActive" checked={editing.isActive !== false} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} className="w-4 h-4" />
                    <label htmlFor="svcActive" className="text-sm font-medium">Active</label>
                  </div>
                </div>
                <div>
                  <label className="form-label">Meta Title</label>
                  <input value={editing.metaTitle || ''} onChange={(e) => setEditing({ ...editing, metaTitle: e.target.value })} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Meta Description</label>
                  <textarea value={editing.metaDescription || ''} onChange={(e) => setEditing({ ...editing, metaDescription: e.target.value })} className="form-input resize-none" rows={2} />
                </div>
              </div>

              <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
                <button onClick={handleSave} className="btn-primary flex-1 justify-center"><Save size={16} /> Save</button>
                <button onClick={() => setEditing(null)} className="btn-outline flex-1 justify-center">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showMediaPicker && (
        <MediaPickerModal
          onSelect={(url) => { setEditing(prev => prev ? { ...prev, featuredImage: url } : prev); setShowMediaPicker(false); }}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </div>
  );
}
