'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { PROJECT_CATEGORY_LABELS, PROJECT_STATUS_LABELS, slugify } from '@/lib/utils';
import MediaPickerModal from './MediaPickerModal';

interface Project {
  id: string;
  projectName: string;
  slug: string;
  client?: string | null;
  location?: string | null;
  description: string;
  category: string;
  status: string;
  featuredImage?: string | null;
  completionDate?: string | null;
  isActive: boolean;
}

const emptyProject: Partial<Project> = {
  projectName: '',
  slug: '',
  client: '',
  location: '',
  description: '',
  category: 'OTHER',
  status: 'ONGOING',
  featuredImage: '',
  completionDate: '',
  isActive: true,
};

export default function ProjectsManagerClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState('');
  const [showMedia, setShowMedia] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  async function fetchProjects() {
    try {
      const res = await fetch('/api/projects?all=true&limit=100');
      const data = await res.json();
      setProjects(data.projects || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!editing) return;
    try {
      const url = isNew ? '/api/projects' : `/api/projects/${editing.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editing, slug: editing.slug || slugify(editing.projectName || '') }),
      });
      if (!res.ok) throw new Error();
      toast.success(`Project ${isNew ? 'created' : 'updated'}`);
      setEditing(null);
      fetchProjects();
    } catch {
      toast.error('Save failed');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      toast.success('Project deleted');
      fetchProjects();
    } catch {
      toast.error('Delete failed');
    }
  }

  const filtered = projects.filter((p) =>
    p.projectName.toLowerCase().includes(search.toLowerCase()) ||
    (p.client || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Projects</h1>
        <button onClick={() => { setIsNew(true); setEditing({ ...emptyProject }); }} className="btn-primary text-sm">
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Search projects..." />
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="skeleton h-20 rounded-xl" />)}</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Project</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 text-sm">{project.projectName}</div>
                    <div className="text-gray-400 text-xs">{project.client} {project.location ? `• ${project.location}` : ''}</div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="badge-primary text-xs">{PROJECT_CATEGORY_LABELS[project.category] || project.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${project.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : project.status === 'ONGOING' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                      {PROJECT_STATUS_LABELS[project.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => { setIsNew(false); setEditing({ ...project }); }} className="p-1.5 rounded hover:bg-gray-100"><Edit2 size={15} className="text-blue-500" /></button>
                      <button onClick={() => handleDelete(project.id)} className="p-1.5 rounded hover:bg-gray-100"><Trash2 size={15} className="text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400">No projects found</div>}
        </div>
      )}

      <AnimatePresence>
        {editing !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold font-heading">{isNew ? 'Add Project' : 'Edit Project'}</h2>
                <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="form-label">Project Name *</label>
                  <input value={editing.projectName || ''} onChange={(e) => setEditing({ ...editing, projectName: e.target.value })} className="form-input" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Client</label>
                    <input value={editing.client || ''} onChange={(e) => setEditing({ ...editing, client: e.target.value })} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Location</label>
                    <input value={editing.location || ''} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="form-input" />
                  </div>
                </div>
                <div>
                  <label className="form-label">Description *</label>
                  <textarea value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="form-input resize-none" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Category</label>
                    <select value={editing.category || 'OTHER'} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="form-input">
                      {Object.entries(PROJECT_CATEGORY_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Status</label>
                    <select value={editing.status || 'ONGOING'} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="form-input">
                      {Object.entries(PROJECT_STATUS_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="form-label">Featured Image</label>
                  <div className="flex gap-2">
                    <input value={editing.featuredImage || ''} onChange={(e) => setEditing({ ...editing, featuredImage: e.target.value })} className="form-input flex-1" />
                    <button type="button" onClick={() => setShowMedia(true)} className="btn-outline text-sm">Browse</button>
                  </div>
                </div>
                <div>
                  <label className="form-label">Completion Date</label>
                  <input type="date" value={editing.completionDate || ''} onChange={(e) => setEditing({ ...editing, completionDate: e.target.value })} className="form-input" />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="projActive" checked={editing.isActive !== false} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} className="w-4 h-4" />
                  <label htmlFor="projActive" className="text-sm font-medium">Active (visible on website)</label>
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

      {showMedia && (
        <MediaPickerModal
          onSelect={(url) => { setEditing(prev => prev ? { ...prev, featuredImage: url } : prev); setShowMedia(false); }}
          onClose={() => setShowMedia(false)}
        />
      )}
    </div>
  );
}
