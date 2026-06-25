import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().nullish(),
  company: z.string().nullish(),
  subject: z.string().nullish(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export const heroSlideSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  subtitle: z.string().nullish(),
  backgroundImage: z.string().min(1, 'Background image is required'),
  buttonText: z.string().nullish(),
  buttonLink: z.string().nullish(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  typewriterWords: z.array(z.object({
    word: z.string().min(1),
    order: z.number().int().min(0),
  })).optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  content: z.string().nullish(),
  featuredImage: z.string().nullish(),
  category: z.string().optional(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  metaTitle: z.string().nullish(),
  metaDescription: z.string().nullish(),
  images: z
    .array(
      z.object({
        url: z.string().min(1),
        alt: z.string().nullish(),
        order: z.number().int().min(0).optional(),
      })
    )
    .optional(),
});

export const projectSchema = z.object({
  projectName: z.string().min(1, 'Project name is required').max(200),
  slug: z.string().optional(),
  client: z.string().nullish(),
  location: z.string().nullish(),
  description: z.string().min(1, 'Description is required'),
  content: z.string().nullish(),
  completionDate: z.string().nullish(),
  category: z.string().optional(),
  status: z.string().optional(),
  featuredImage: z.string().nullish(),
  isActive: z.boolean().optional(),
  metaTitle: z.string().nullish(),
  metaDescription: z.string().nullish(),
});

export const sisterCompanySchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  slug: z.string().optional(),
  logo: z.string().nullish(),
  description: z.string().min(1, 'Description is required'),
  content: z.string().nullish(),
  websiteUrl: z.string().url().optional().or(z.literal('')).or(z.null()),
  email: z.string().email().optional().or(z.literal('')).or(z.null()),
  phone: z.string().nullish(),
  address: z.string().nullish(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  metaTitle: z.string().nullish(),
  metaDescription: z.string().nullish(),
});

export const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  position: z.string().min(1, 'Position is required').max(200),
  bio: z.string().nullish(),
  image: z.string().nullish(),
  email: z.string().email().optional().or(z.literal('')).or(z.null()),
  linkedIn: z.string().nullish(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const testimonialSchema = z.object({
  clientName: z.string().min(1, 'Client name is required').max(200),
  company: z.string().nullish(),
  position: z.string().nullish(),
  content: z.string().min(1, 'Testimonial content is required'),
  rating: z.number().int().min(1).max(5).optional(),
  image: z.string().nullish(),
  isActive: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

export const siteSettingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  type: z.string().optional(),
  group: z.string().optional(),
  label: z.string().nullish(),
});

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'CONTENT_MANAGER']).optional(),
  isActive: z.boolean().optional(),
});
