'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitted(true);
      reset();
      toast.success('Message sent successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message. Please try again.');
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-700 mb-2">Message Sent Successfully!</h3>
        <p className="text-green-600 mb-4">
          Thank you for reaching out. Our team will get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-primary"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Full Name *</label>
          <input
            {...register('name')}
            type="text"
            placeholder="John Doe"
            className="form-input"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="form-label">Email Address *</label>
          <input
            {...register('email')}
            type="email"
            placeholder="john@example.com"
            className="form-input"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Phone Number</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+234 XXX XXX XXXX"
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Company / Organization</label>
          <input
            {...register('company')}
            type="text"
            placeholder="Your Company"
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label className="form-label">Subject</label>
        <input
          {...register('subject')}
          type="text"
          placeholder="How can we help?"
          className="form-input"
        />
      </div>

      <div>
        <label className="form-label">Message *</label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell us about your project or inquiry..."
          className="form-input resize-none"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
