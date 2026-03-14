'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin?: string | null;
  createdAt: string;
}

const ROLES = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'CONTENT_MANAGER'];
const ROLE_COLORS: Record<string, string> = {
  SUPER_ADMIN: 'bg-red-100 text-red-700',
  ADMIN: 'bg-orange-100 text-orange-700',
  EDITOR: 'bg-blue-100 text-blue-700',
  CONTENT_MANAGER: 'bg-green-100 text-green-700',
};

export default function UsersManagerClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<User & { password: string }> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => { fetchUsers(); }, []);

  async function fetchUsers() {
    fetch('/api/users').then(r => r.json()).then(d => setUsers(d.users || [])).finally(() => setLoading(false));
  }

  async function handleSave() {
    if (!editing) return;
    try {
      const url = isNew ? '/api/users' : `/api/users/${editing.id}`;
      const res = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Save failed');
      }
      toast.success(`User ${isNew ? 'created' : 'updated'}`);
      setEditing(null);
      fetchUsers();
    } catch (e: any) { toast.error(e.message || 'Save failed'); }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this user?')) return;
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    toast.success('User deleted');
    fetchUsers();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">User Management</h1>
        <button onClick={() => { setIsNew(true); setEditing({ name: '', email: '', role: 'EDITOR', isActive: true, password: '' }); }} className="btn-primary text-sm"><Plus size={16} /> Add User</button>
      </div>
      {loading ? <div className="space-y-3">{[1,2].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}</div> : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">{user.name.charAt(0)}</div>
                      <div><p className="text-sm font-medium text-gray-900">{user.name}</p><p className="text-xs text-gray-500">{user.email}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ROLE_COLORS[user.role] || 'bg-gray-100 text-gray-600'}`}>{user.role.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{user.isActive ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => { setIsNew(false); setEditing({ ...user, password: '' }); }} className="p-1.5 rounded hover:bg-gray-100"><Edit2 size={15} className="text-blue-500" /></button>
                      <button onClick={() => handleDelete(user.id)} className="p-1.5 rounded hover:bg-gray-100"><Trash2 size={15} className="text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <AnimatePresence>
        {editing !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold font-heading">{isNew ? 'Add User' : 'Edit User'}</h2>
                <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div><label className="form-label">Name *</label><input value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="form-input" /></div>
                <div><label className="form-label">Email *</label><input type="email" value={editing.email || ''} onChange={(e) => setEditing({ ...editing, email: e.target.value })} className="form-input" /></div>
                <div><label className="form-label">{isNew ? 'Password *' : 'New Password (leave blank to keep)'}</label><input type="password" value={editing.password || ''} onChange={(e) => setEditing({ ...editing, password: e.target.value })} className="form-input" placeholder={isNew ? 'Min 8 characters' : 'Leave blank to keep current'} /></div>
                <div><label className="form-label">Role</label>
                  <select value={editing.role || 'EDITOR'} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="form-input">
                    {ROLES.map(r => <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="userActive" checked={editing.isActive !== false} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} className="w-4 h-4" />
                  <label htmlFor="userActive" className="text-sm font-medium">Active</label>
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
