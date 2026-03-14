import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, logAudit } from '@/lib/auth';
import { testimonialSchema } from '@/lib/validations';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const validation = testimonialSchema.safeParse(body);
    if (!validation.success) return NextResponse.json({ error: 'Validation failed' }, { status: 400 });

    const testimonial = await prisma.testimonial.update({ where: { id: params.id }, data: validation.data });
    await logAudit(authUser.userId, 'UPDATE', 'testimonials', testimonial.id);
    return NextResponse.json({ testimonial });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.testimonial.delete({ where: { id: params.id } });
    await logAudit(authUser.userId, 'DELETE', 'testimonials', params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
