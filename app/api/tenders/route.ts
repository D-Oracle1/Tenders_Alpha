import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

const tenderSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  tenderTitle: z.string().min(1, 'Tender title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  budget: z.string().optional(),
  deadline: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = tenderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.flatten() }, { status: 400 });
    }

    const tender = await prisma.tenderSubmission.create({
      data: {
        ...validation.data,
        deadline: validation.data.deadline ? new Date(validation.data.deadline) : null,
      },
    });

    return NextResponse.json({ success: true, tenderId: tender.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const tenders = await prisma.tenderSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ tenders });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
