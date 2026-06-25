'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUploadCropper from './ImageUploadCropper';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string | null;
  image?: string | null;
  email?: string | null;
  linkedIn?: string | null;
  order: number;
  isActive: boolean;
}

export default function TeamManagerClient() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<TeamMember> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => { fetch('/api/team?all=true').then(r => r.json()).then(d => setMembers(d.members || [])).finally(() => setLoading(false)); }, []);

  async function handleSave() {
    if (!editing) return;
    try {
      const url = isNew ? '/api/team' : `/api/team/${editing.id}`;
      const res = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      if (!res.ok) throw new Error();
      toast.success(`Team member ${isNew ? 'added' : 'updated'}`);
      setEditing(null);
      fetch('/api/team?all=true').then(r => r.json()).then(d => setMembers(d.members || []));
    } catch { toast.error('Save failed'); }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete?')) return;
    await fetch(`/api/team/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    setMembers(prev => prev.filter(m => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Team Members</h1>
        <button onClick={() => { setIsNew(true); setEditing({ name: '', position: '', order: members.length, isActive: true }); }} className="btn-primary text-sm"><Plus size={16} /> Add Member</button>
      </div>
      {loading ? <div className="space-y-3">{[1,2].map(i => <div key={i} className="skeleton h-20 rounded-xl" />)}</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(m => (
            <div key={m.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">{m.name.charAt(0)}</div>
                  )}
                  <div><p className="font-semibold text-gray-900">{m.name}</p><p className="text-accent text-sm">{m.position}</p></div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setIsNew(false); setEditing({ ...m }); }} className="p-1.5 rounded hover:bg-gray-100"><Edit2 size={15} className="text-blue-500" /></button>
                  <button onClick={() => handleDelete(m.id)} className="p-1.5 rounded hover:bg-gray-100"><Trash2 size={15} className="text-red-500" /></button>
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
                <h2 className="text-xl font-bold font-heading">{isNew ? 'Add Team Member' : 'Edit Team Member'}</h2>
                <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div><label className="form-label">Name *</label><input value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="form-input" /></div>
                <div><label className="form-label">Position *</label><input value={editing.position || ''} onChange={(e) => setEditing({ ...editing, position: e.target.value })} className="form-input" /></div>
                <div><label className="form-label">Bio</label><textarea value={editing.bio || ''} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} className="form-input resize-none" rows={3} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="form-label">Email</label><input type="email" value={editing.email || ''} onChange={(e) => setEditing({ ...editing, email: e.target.value })} className="form-input" /></div>
                  <div><label className="form-label">LinkedIn URL</label><input value={editing.linkedIn || ''} onChange={(e) => setEditing({ ...editing, linkedIn: e.target.value })} className="form-input" /></div>
                </div>
                <ImageUploadCropper
                  label="Photo"
                  value={editing.image || ''}
                  folder="team"
                  round
                  aspect={1}
                  onChange={(url) => setEditing((prev) => (prev ? { ...prev, image: url } : prev))}
                />
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="tmActive" checked={editing.isActive !== false} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} className="w-4 h-4" />
                  <label htmlFor="tmActive" className="text-sm font-medium">Active</label>
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
