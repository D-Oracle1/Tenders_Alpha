import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export const SERVICE_CATEGORY_LABELS: Record<string, string> = {
  CONSTRUCTION: 'Construction',
  CIVIL_ENGINEERING: 'Civil Engineering',
  OIL_GAS: 'Oil & Gas',
  EQUIPMENT_SUPPLY: 'Equipment Supply',
  CARGO_HANDLING: 'Cargo Handling',
  LOGISTICS: 'Logistics',
  DISINFECTION: 'Disinfection',
  AGRICULTURE: 'Agriculture',
  OTHER: 'Other Services',
};

export const PROJECT_CATEGORY_LABELS: Record<string, string> = {
  BUILDING_CONSTRUCTION: 'Building Construction',
  CIVIL_ENGINEERING: 'Civil Engineering',
  OIL_GAS: 'Oil & Gas',
  PROCUREMENT: 'Procurement',
  AGRICULTURE: 'Agriculture',
  LOGISTICS: 'Logistics',
  EQUIPMENT_SUPPLY: 'Equipment Supply',
  CARGO_HANDLING: 'Cargo Handling',
  OTHER: 'Other',
};

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
};
