import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, logAudit } from '@/lib/auth';
import { serviceSchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const all = searchParams.get('all') === 'true';

    const where: Record<string, unknown> = {};
    if (!all) where.isActive = true;
    if (category) where.category = category;

    const services = await prisma.service.findMany({
      where,
      include: {
        images: { orderBy: { order: 'asc' } },
        documents: true,
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = serviceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { images, ...data } = validation.data;
    const slug = data.slug || slugify(data.title);

    const service = await prisma.service.create({
      data: {
        ...data,
        slug,
        category: (data.category as any) || 'OTHER',
        ...(images && images.length > 0
          ? {
              images: {
                create: images.map((img, i) => ({
                  url: img.url,
                  alt: img.alt || null,
                  order: img.order ?? i,
                })),
              },
            }
          : {}),
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        documents: true,
      },
    });

    await logAudit(authUser.userId, 'CREATE', 'services', service.id, { title: service.title });

    return NextResponse.json({ service }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A service with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
