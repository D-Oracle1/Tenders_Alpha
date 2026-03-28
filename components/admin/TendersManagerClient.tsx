'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye } from 'lucide-react';

interface Tender {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  tenderTitle: string;
  description: string;
  budget?: string | null;
  deadline?: string | null;
  status: string;
  createdAt: string;
}

export default function TendersManagerClient() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Tender | null>(null);

  useEffect(() => {
    fetch('/api/tenders').then(r => r.json()).then(d => setTenders(d.tenders || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Tender Submissions</h1>
        <p className="text-gray-500 text-sm">Tender submissions from the portal</p>
      </div>
      {loading ? <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}</div> : (
        tenders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border">
            <p className="text-gray-400">No tender submissions yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Company</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Date</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tenders.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 text-sm">{t.companyName}</p>
                      <p className="text-gray-500 text-xs">{t.contactName} • {t.email}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-sm text-gray-700">{t.tenderTitle}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-sm text-gray-500" suppressHydrationWarning>{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(t)} className="p-1.5 rounded hover:bg-gray-100 ml-auto flex"><Eye size={15} className="text-primary" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold font-heading">Tender Details</h2>
                <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-gray-500">Company</p><p className="font-semibold">{selected.companyName}</p></div>
                  <div><p className="text-gray-500">Contact</p><p className="font-semibold">{selected.contactName}</p></div>
                  <div><p className="text-gray-500">Email</p><a href={`mailto:${selected.email}`} className="font-semibold text-primary">{selected.email}</a></div>
                  {selected.phone && <div><p className="text-gray-500">Phone</p><p className="font-semibold">{selected.phone}</p></div>}
                  {selected.budget && <div><p className="text-gray-500">Budget</p><p className="font-semibold">{selected.budget}</p></div>}
                  {selected.deadline && <div><p className="text-gray-500">Deadline</p><p className="font-semibold" suppressHydrationWarning>{new Date(selected.deadline).toLocaleDateString()}</p></div>}
                </div>
                <div><p className="text-gray-500 mb-1">Tender Title</p><p className="font-semibold">{selected.tenderTitle}</p></div>
                <div><p className="text-gray-500 mb-1">Description</p><div className="bg-gray-50 rounded-xl p-4 text-gray-700 whitespace-pre-wrap">{selected.description}</div></div>
              </div>
              <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.tenderTitle}`} className="btn-primary w-full justify-center text-sm">Reply via Email</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
