'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Star } from 'lucide-react';
import toast from 'react-hot-toast';

interface Testimonial {
  id: string;
  clientName: string;
  company?: string | null;
  position?: string | null;
  content: string;
  rating: number;
  isActive: boolean;
  order: number;
}

export default function TestimonialsManagerClient() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => { fetch('/api/testimonials?all=true').then(r => r.json()).then(d => setItems(d.testimonials || [])).finally(() => setLoading(false)); }, []);

  async function handleSave() {
    if (!editing) return;
    try {
      const url = isNew ? '/api/testimonials' : `/api/testimonials/${editing.id}`;
      const res = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      if (!res.ok) throw new Error();
      toast.success(`Testimonial ${isNew ? 'added' : 'updated'}`);
      setEditing(null);
      fetch('/api/testimonials?all=true').then(r => r.json()).then(d => setItems(d.testimonials || []));
    } catch { toast.error('Save failed'); }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    setItems(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Testimonials</h1>
        <button onClick={() => { setIsNew(true); setEditing({ clientName: '', content: '', rating: 5, isActive: true, order: items.length }); }} className="btn-primary text-sm"><Plus size={16} /> Add Testimonial</button>
      </div>
      {loading ? <div className="space-y-3">{[1,2].map(i => <div key={i} className="skeleton h-20 rounded-xl" />)}</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex gap-1 mb-2">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className={i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />)}</div>
                  <p className="font-semibold text-gray-900">{item.clientName}</p>
                  <p className="text-accent text-sm">{item.position} {item.company ? `• ${item.company}` : ''}</p>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.content}</p>
                </div>
                <div className="flex gap-1 ml-3">
                  <button onClick={() => { setIsNew(false); setEditing({ ...item }); }} className="p-1.5 rounded hover:bg-gray-100"><Edit2 size={15} className="text-blue-500" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded hover:bg-gray-100"><Trash2 size={15} className="text-red-500" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {editing !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold font-heading">{isNew ? 'Add Testimonial' : 'Edit Testimonial'}</h2>
                <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div><label className="form-label">Client Name *</label><input value={editing.clientName || ''} onChange={(e) => setEditing({ ...editing, clientName: e.target.value })} className="form-input" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="form-label">Position</label><input value={editing.position || ''} onChange={(e) => setEditing({ ...editing, position: e.target.value })} className="form-input" /></div>
                  <div><label className="form-label">Company</label><input value={editing.company || ''} onChange={(e) => setEditing({ ...editing, company: e.target.value })} className="form-input" /></div>
                </div>
                <div><label className="form-label">Testimonial *</label><textarea value={editing.content || ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="form-input resize-none" rows={4} /></div>
                <div><label className="form-label">Rating</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(r => (
                      <button key={r} type="button" onClick={() => setEditing({ ...editing, rating: r })} className={`text-2xl ${r <= (editing.rating || 5) ? 'text-amber-400' : 'text-gray-200'}`}>★</button>
                    ))}
                  </div>
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
