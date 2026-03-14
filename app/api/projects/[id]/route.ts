import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, logAudit } from '@/lib/auth';
import { projectSchema } from '@/lib/validations';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        documents: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const validation = projectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.flatten() }, { status: 400 });
    }

    const data = validation.data;
    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...data,
        category: (data.category as any) || 'OTHER',
        status: (data.status as any) || 'ONGOING',
        completionDate: data.completionDate ? new Date(data.completionDate) : null,
      },
      include: { images: { orderBy: { order: 'asc' } }, documents: true },
    });

    await logAudit(authUser.userId, 'UPDATE', 'projects', project.id, { projectName: project.projectName });
    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.project.delete({ where: { id: params.id } });
    await logAudit(authUser.userId, 'DELETE', 'projects', params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
