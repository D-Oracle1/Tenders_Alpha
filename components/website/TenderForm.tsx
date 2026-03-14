'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  tenderTitle: z.string().min(1, 'Tender title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  budget: z.string().optional(),
  deadline: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function TenderForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/tenders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
      reset();
    } catch {
      toast.error('Failed to submit tender. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-700 mb-2">Tender Submitted Successfully!</h3>
        <p className="text-gray-600 mb-4">Our procurement team will review your tender and get back to you within 5 business days.</p>
        <button onClick={() => setSubmitted(false)} className="btn-primary">Submit Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Company Name *</label>
          <input {...register('companyName')} className="form-input" placeholder="Your Company Ltd." />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
        </div>
        <div>
          <label className="form-label">Contact Person *</label>
          <input {...register('contactName')} className="form-input" placeholder="Full Name" />
          {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Email *</label>
          <input {...register('email')} type="email" className="form-input" placeholder="email@example.com" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="form-label">Phone</label>
          <input {...register('phone')} type="tel" className="form-input" placeholder="+234..." />
        </div>
      </div>
      <div>
        <label className="form-label">Tender Title *</label>
        <input {...register('tenderTitle')} className="form-input" placeholder="Brief title of the tender" />
        {errors.tenderTitle && <p className="text-red-500 text-sm mt-1">{errors.tenderTitle.message}</p>}
      </div>
      <div>
        <label className="form-label">Description *</label>
        <textarea {...register('description')} rows={5} className="form-input resize-none" placeholder="Detailed description of the tender requirements..." />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Budget (Optional)</label>
          <input {...register('budget')} className="form-input" placeholder="e.g., ₦50,000,000" />
        </div>
        <div>
          <label className="form-label">Deadline</label>
          <input {...register('deadline')} type="date" className="form-input" />
        </div>
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-50">
        {isSubmitting ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>Submitting...</> : <><Send size={18} />Submit Tender</>}
      </button>
    </form>
  );
}
