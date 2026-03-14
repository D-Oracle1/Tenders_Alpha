'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { slugify } from '@/lib/utils';

interface SisterCompany {
  id: string;
  name: string;
  slug: string;
  description: string;
  websiteUrl?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  order: number;
  isActive: boolean;
}

export default function SisterCompaniesManagerClient() {
  const [companies, setCompanies] = useState<SisterCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<SisterCompany> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => { fetchCompanies(); }, []);

  async function fetchCompanies() {
    try {
      const res = await fetch('/api/sister-companies?all=true');
      const data = await res.json();
      setCompanies(data.companies || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!editing) return;
    try {
      const url = isNew ? '/api/sister-companies' : `/api/sister-companies/${editing.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editing, slug: editing.slug || slugify(editing.name || '') }),
      });
      if (!res.ok) throw new Error();
      toast.success(`Company ${isNew ? 'created' : 'updated'}`);
      setEditing(null);
      fetchCompanies();
    } catch {
      toast.error('Save failed');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this company?')) return;
    try {
      await fetch(`/api/sister-companies/${id}`, { method: 'DELETE' });
      toast.success('Deleted');
      fetchCompanies();
    } catch {
      toast.error('Delete failed');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Sister Companies</h1>
        <button onClick={() => { setIsNew(true); setEditing({ name: '', description: '', order: companies.length, isActive: true }); }} className="btn-primary text-sm">
          <Plus size={16} /> Add Company
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="skeleton h-20 rounded-xl" />)}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companies.map((company) => (
            <div key={company.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{company.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-1">{company.description}</p>
                    {company.websiteUrl && <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="text-primary text-xs hover:underline">{company.websiteUrl}</a>}
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0 ml-2">
                  <button onClick={() => { setIsNew(false); setEditing({ ...company }); }} className="p-1.5 rounded hover:bg-gray-100">
                    <Edit2 size={15} className="text-blue-500" />
                  </button>
                  <button onClick={() => handleDelete(company.id)} className="p-1.5 rounded hover:bg-gray-100">
                    <Trash2 size={15} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editing !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold font-heading">{isNew ? 'Add Sister Company' : 'Edit Sister Company'}</h2>
                <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div><label className="form-label">Company Name *</label><input value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="form-input" /></div>
                <div><label className="form-label">Description *</label><textarea value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="form-input resize-none" rows={4} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="form-label">Website URL</label><input value={editing.websiteUrl || ''} onChange={(e) => setEditing({ ...editing, websiteUrl: e.target.value })} className="form-input" placeholder="https://..." /></div>
                  <div><label className="form-label">Email</label><input type="email" value={editing.email || ''} onChange={(e) => setEditing({ ...editing, email: e.target.value })} className="form-input" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="form-label">Phone</label><input value={editing.phone || ''} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} className="form-input" /></div>
                  <div><label className="form-label">Order</label><input type="number" value={editing.order || 0} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) })} className="form-input" /></div>
                </div>
                <div><label className="form-label">Address</label><textarea value={editing.address || ''} onChange={(e) => setEditing({ ...editing, address: e.target.value })} className="form-input resize-none" rows={2} /></div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="scActive" checked={editing.isActive !== false} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} className="w-4 h-4" />
                  <label htmlFor="scActive" className="text-sm font-medium">Active</label>
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
    </div>
  );
}
