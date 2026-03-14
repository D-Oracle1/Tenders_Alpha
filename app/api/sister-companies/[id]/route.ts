import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, logAudit } from '@/lib/auth';
import { sisterCompanySchema } from '@/lib/validations';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const company = await prisma.sisterCompany.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
      include: {
        services: { orderBy: { order: 'asc' } },
        projects: { orderBy: { order: 'asc' } },
      },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    return NextResponse.json({ company });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const validation = sisterCompanySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.flatten() }, { status: 400 });
    }

    const company = await prisma.sisterCompany.update({
      where: { id: params.id },
      data: validation.data,
      include: { services: true, projects: true },
    });

    await logAudit(authUser.userId, 'UPDATE', 'sister_companies', company.id, { name: company.name });
    return NextResponse.json({ company });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.sisterCompany.delete({ where: { id: params.id } });
    await logAudit(authUser.userId, 'DELETE', 'sister_companies', params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
