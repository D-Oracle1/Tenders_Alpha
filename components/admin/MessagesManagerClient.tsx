'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, X, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject?: string | null;
  message: string;
  status: string;
  createdAt: string;
}

export default function MessagesManagerClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => { fetchMessages(); }, []);

  async function fetchMessages() {
    try {
      const res = await fetch('/api/contact?limit=50');
      const data = await res.json();
      setMessages(data.messages || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleView(msg: Message) {
    setSelected(msg);
    if (msg.status === 'UNREAD') {
      await fetch(`/api/contact/${msg.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'READ' }) });
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, status: 'READ' } : m)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this message?')) return;
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      toast.success('Message deleted');
      setSelected(null);
      fetchMessages();
    } catch {
      toast.error('Delete failed');
    }
  }

  const filtered = filter === 'ALL' ? messages : messages.filter((m) => m.status === filter);
  const unread = messages.filter((m) => m.status === 'UNREAD').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Contact Messages</h1>
          {unread > 0 && <p className="text-accent text-sm">{unread} unread message{unread !== 1 ? 's' : ''}</p>}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['ALL', 'UNREAD', 'READ', 'REPLIED', 'ARCHIVED'].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Mail size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-400">No messages</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleView(msg)}
                  className={cn(
                    'flex items-start gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors',
                    msg.status === 'UNREAD' && 'bg-blue-50/50'
                  )}
                >
                  <div className={cn('w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', msg.status === 'UNREAD' ? 'bg-primary' : 'bg-gray-200')}>
                    <span className={cn('font-bold text-sm', msg.status === 'UNREAD' ? 'text-white' : 'text-gray-600')}>
                      {msg.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={cn('text-sm truncate', msg.status === 'UNREAD' ? 'font-bold text-gray-900' : 'font-medium text-gray-700')}>
                        {msg.name}
                      </p>
                      {msg.status === 'UNREAD' && <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500">{msg.email}</p>
                    <p className="text-xs text-gray-400 truncate">{msg.subject || msg.message.substring(0, 60)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-xs text-gray-400" suppressHydrationWarning>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full', msg.status === 'UNREAD' ? 'bg-accent/10 text-accent' : 'bg-gray-100 text-gray-500')}>
                      {msg.status.toLowerCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold font-heading">Message Details</h2>
                <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-gray-500">Name</p><p className="font-semibold">{selected.name}</p></div>
                  <div><p className="text-gray-500">Email</p><a href={`mailto:${selected.email}`} className="font-semibold text-primary">{selected.email}</a></div>
                  {selected.phone && <div><p className="text-gray-500">Phone</p><p className="font-semibold">{selected.phone}</p></div>}
                  {selected.company && <div><p className="text-gray-500">Company</p><p className="font-semibold">{selected.company}</p></div>}
                  <div><p className="text-gray-500">Date</p><p className="font-semibold" suppressHydrationWarning>{new Date(selected.createdAt).toLocaleString()}</p></div>
                  <div><p className="text-gray-500">Status</p><p className="font-semibold capitalize">{selected.status.toLowerCase()}</p></div>
                </div>
                {selected.subject && (
                  <div><p className="text-gray-500 text-sm mb-1">Subject</p><p className="font-semibold">{selected.subject}</p></div>
                )}
                <div>
                  <p className="text-gray-500 text-sm mb-1">Message</p>
                  <div className="bg-gray-50 rounded-xl p-4 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</div>
                </div>
              </div>
              <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your inquiry'}`} className="btn-primary flex-1 justify-center text-sm">
                  <Mail size={16} /> Reply via Email
                </a>
                <button onClick={() => handleDelete(selected.id)} className="btn-outline text-accent border-accent text-sm flex-shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
