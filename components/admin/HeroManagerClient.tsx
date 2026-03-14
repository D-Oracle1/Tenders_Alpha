'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, GripVertical, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import MediaPickerModal from './MediaPickerModal';

interface TypewriterWord {
  id?: string;
  word: string;
  order: number;
}

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  backgroundImage: string;
  buttonText?: string;
  buttonLink?: string;
  order: number;
  isActive: boolean;
  typewriterWords: TypewriterWord[];
}

const emptySlide: Omit<HeroSlide, 'id'> = {
  title: '',
  subtitle: '',
  backgroundImage: '',
  buttonText: '',
  buttonLink: '',
  order: 0,
  isActive: true,
  typewriterWords: [{ word: '', order: 1 }],
};

export default function HeroManagerClient() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  async function fetchSlides() {
    try {
      const res = await fetch('/api/hero/all');
      const data = await res.json();
      setSlides(data.slides || []);
    } finally {
      setLoading(false);
    }
  }

  function handleNew() {
    setIsNew(true);
    setEditingSlide({ ...emptySlide });
  }

  function handleEdit(slide: HeroSlide) {
    setIsNew(false);
    setEditingSlide({ ...slide });
  }

  async function handleSave() {
    if (!editingSlide) return;
    try {
      const url = isNew ? '/api/hero' : `/api/hero/${editingSlide.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSlide),
      });
      if (!res.ok) throw new Error('Save failed');
      toast.success(`Slide ${isNew ? 'created' : 'updated'} successfully`);
      setEditingSlide(null);
      fetchSlides();
    } catch {
      toast.error('Failed to save slide');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this slide?')) return;
    try {
      await fetch(`/api/hero/${id}`, { method: 'DELETE' });
      toast.success('Slide deleted');
      fetchSlides();
    } catch {
      toast.error('Failed to delete');
    }
  }

  async function toggleActive(slide: HeroSlide) {
    try {
      await fetch(`/api/hero/${slide.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...slide, isActive: !slide.isActive }),
      });
      fetchSlides();
    } catch {
      toast.error('Failed to update');
    }
  }

  function addWord() {
    if (!editingSlide) return;
    const words = editingSlide.typewriterWords || [];
    setEditingSlide({
      ...editingSlide,
      typewriterWords: [...words, { word: '', order: words.length + 1 }],
    });
  }

  function removeWord(i: number) {
    if (!editingSlide) return;
    const words = [...(editingSlide.typewriterWords || [])];
    words.splice(i, 1);
    setEditingSlide({ ...editingSlide, typewriterWords: words.map((w, j) => ({ ...w, order: j + 1 })) });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Hero Slides</h1>
        <button onClick={handleNew} className="btn-primary text-sm">
          <Plus size={16} /> Add Slide
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2].map(i => <div key={i} className="skeleton h-40 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{slide.title}</h3>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${slide.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                  </div>
                  {slide.subtitle && <p className="text-gray-500 text-sm line-clamp-2">{slide.subtitle}</p>}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {slide.typewriterWords.slice(0, 3).map((w, i) => (
                      <span key={i} className="badge-primary text-xs">{w.word}</span>
                    ))}
                    {slide.typewriterWords.length > 3 && (
                      <span className="text-xs text-gray-400">+{slide.typewriterWords.length - 3} more</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => toggleActive(slide)} className="p-2 rounded-lg hover:bg-gray-100" title="Toggle active">
                    {slide.isActive ? <Eye size={16} className="text-green-500" /> : <EyeOff size={16} className="text-gray-400" />}
                  </button>
                  <button onClick={() => handleEdit(slide)} className="p-2 rounded-lg hover:bg-gray-100">
                    <Edit2 size={16} className="text-blue-500" />
                  </button>
                  <button onClick={() => handleDelete(slide.id)} className="p-2 rounded-lg hover:bg-gray-100">
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingSlide !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold font-heading">{isNew ? 'Add Hero Slide' : 'Edit Hero Slide'}</h2>
                <button onClick={() => setEditingSlide(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="form-label">Title *</label>
                  <input
                    value={editingSlide.title || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                    className="form-input"
                    placeholder="Slide title"
                  />
                </div>

                <div>
                  <label className="form-label">Subtitle</label>
                  <textarea
                    value={editingSlide.subtitle || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                    className="form-input resize-none"
                    rows={3}
                    placeholder="Slide subtitle"
                  />
                </div>

                <div>
                  <label className="form-label">Background Image *</label>
                  <div className="flex gap-2">
                    <input
                      value={editingSlide.backgroundImage || ''}
                      onChange={(e) => setEditingSlide({ ...editingSlide, backgroundImage: e.target.value })}
                      className="form-input flex-1"
                      placeholder="/images/hero/..."
                    />
                    <button
                      type="button"
                      onClick={() => setShowMediaPicker(true)}
                      className="btn-outline text-sm flex-shrink-0"
                    >
                      Browse
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Button Text</label>
                    <input
                      value={editingSlide.buttonText || ''}
                      onChange={(e) => setEditingSlide({ ...editingSlide, buttonText: e.target.value })}
                      className="form-input"
                      placeholder="Learn More"
                    />
                  </div>
                  <div>
                    <label className="form-label">Button Link</label>
                    <input
                      value={editingSlide.buttonLink || ''}
                      onChange={(e) => setEditingSlide({ ...editingSlide, buttonLink: e.target.value })}
                      className="form-input"
                      placeholder="/services"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Order</label>
                    <input
                      type="number"
                      value={editingSlide.order || 0}
                      onChange={(e) => setEditingSlide({ ...editingSlide, order: parseInt(e.target.value) })}
                      className="form-input"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-7">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={editingSlide.isActive !== false}
                      onChange={(e) => setEditingSlide({ ...editingSlide, isActive: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label>
                  </div>
                </div>

                {/* Typewriter Words */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="form-label mb-0">Typewriter Words</label>
                    <button type="button" onClick={addWord} className="text-primary text-sm font-medium hover:text-accent">
                      + Add Word
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(editingSlide.typewriterWords || []).map((word, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={word.word}
                          onChange={(e) => {
                            const words = [...(editingSlide.typewriterWords || [])];
                            words[i] = { ...words[i], word: e.target.value };
                            setEditingSlide({ ...editingSlide, typewriterWords: words });
                          }}
                          className="form-input flex-1"
                          placeholder={`Word ${i + 1}`}
                        />
                        <button type="button" onClick={() => removeWord(i)} className="p-2 text-red-400 hover:text-red-600">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
                <button onClick={handleSave} className="btn-primary flex-1 justify-center">
                  <Save size={16} /> Save Slide
                </button>
                <button onClick={() => setEditingSlide(null)} className="btn-outline flex-1 justify-center">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showMediaPicker && (
        <MediaPickerModal
          onSelect={(url) => {
            setEditingSlide((prev) => prev ? { ...prev, backgroundImage: url } : prev);
            setShowMediaPicker(false);
          }}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </div>
  );
}
