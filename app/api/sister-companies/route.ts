import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, logAudit } from '@/lib/auth';
import { sisterCompanySchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    const where = all ? {} : { isActive: true };

    const companies = await prisma.sisterCompany.findMany({
      where,
      include: {
        services: { orderBy: { order: 'asc' } },
        projects: { orderBy: { order: 'asc' } },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ companies });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const validation = sisterCompanySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.flatten() }, { status: 400 });
    }

    const data = validation.data;
    const slug = data.slug || slugify(data.name);

    const company = await prisma.sisterCompany.create({
      data: { ...data, slug },
      include: { services: true, projects: true },
    });

    await logAudit(authUser.userId, 'CREATE', 'sister_companies', company.id, { name: company.name });
    return NextResponse.json({ company }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A company with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
