'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Trash2, Search, Image as ImageIcon, FileText, Grid, List } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatFileSize } from '@/lib/utils';

interface MediaFile {
  id: string;
  url: string;
  name: string;
  type: string;
  mimeType?: string | null;
  size?: number | null;
  alt?: string | null;
  folder?: string | null;
  createdAt: string;
}

export default function MediaLibraryClient() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [folder, setFolder] = useState('general');

  useEffect(() => { fetchFiles(); }, []);

  async function fetchFiles() {
    try {
      const res = await fetch('/api/media?limit=100');
      const data = await res.json();
      setFiles(data.files || []);
    } finally {
      setLoading(false);
    }
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    let success = 0;
    for (const file of acceptedFiles) {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      const res = await fetch('/api/media', { method: 'POST', body: fd });
      if (res.ok) success++;
    }
    toast.success(`${success} file${success !== 1 ? 's' : ''} uploaded`);
    setUploading(false);
    fetchFiles();
  }, [folder]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: { 'image/*': [], 'application/pdf': [] },
  });

  async function handleDelete(id: string) {
    if (!confirm('Delete this file?')) return;
    try {
      await fetch(`/api/media/${id}`, { method: 'DELETE' });
      toast.success('File deleted');
      setFiles((prev) => prev.filter((f) => f.id !== id));
    } catch {
      toast.error('Delete failed');
    }
  }

  const filtered = files.filter((f) => {
    const nameMatch = f.name.toLowerCase().includes(search.toLowerCase());
    const typeMatch = typeFilter === 'ALL' || f.type === typeFilter;
    return nameMatch && typeMatch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Media Library</h1>
        <div className="flex gap-2">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-500 border'}`}>
            <Grid size={16} />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-500 border'}`}>
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer mb-6 transition-all ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary bg-gray-50'}`}
      >
        <input {...getInputProps()} />
        <Upload size={32} className="mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600 font-medium">{uploading ? 'Uploading...' : 'Drag & drop files here, or click to select'}</p>
        <p className="text-gray-400 text-sm mt-1">Supports: JPG, PNG, WEBP, GIF, PDF (max 10MB)</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <label className="text-sm text-gray-500">Folder:</label>
          <select
            value={folder}
            onChange={(e) => { e.stopPropagation(); setFolder(e.target.value); }}
            onClick={(e) => e.stopPropagation()}
            className="text-sm border border-gray-200 rounded px-2 py-1"
          >
            {['general', 'hero', 'services', 'projects', 'team', 'testimonials'].map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Search files..." />
        </div>
        {['ALL', 'IMAGE', 'DOCUMENT'].map((t) => (
          <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${typeFilter === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t.charAt(0) + t.slice(1).toLowerCase()}
          </button>
        ))}
        <span className="text-sm text-gray-400 ml-auto">{filtered.length} file{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => <div key={i} className="aspect-square skeleton rounded-lg" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-400">No files found</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {filtered.map((file) => (
            <div key={file.id} className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
              {file.type === 'IMAGE' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileText size={32} className="text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <p className="text-white text-xs text-center line-clamp-2">{file.name}</p>
                <button onClick={() => handleDelete(file.id)} className="p-1.5 bg-red-500 rounded-lg text-white hover:bg-red-600">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">File</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Size</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Date</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {file.type === 'IMAGE' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={file.url} alt={file.name} className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                          <FileText size={20} className="text-gray-400" />
                        </div>
                      )}
                      <span className="text-sm text-gray-700 truncate max-w-[200px]">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-gray-500">{file.type}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-gray-500">{file.size ? formatFileSize(file.size) : '-'}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-sm text-gray-500" suppressHydrationWarning>{new Date(file.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => { navigator.clipboard.writeText(file.url); toast.success('URL copied!'); }} className="p-1.5 rounded hover:bg-gray-100 text-blue-500 text-xs font-medium">Copy URL</button>
                      <button onClick={() => handleDelete(file.id)} className="p-1.5 rounded hover:bg-gray-100"><Trash2 size={15} className="text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
