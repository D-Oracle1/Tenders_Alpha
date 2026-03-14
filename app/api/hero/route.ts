import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, logAudit } from '@/lib/auth';
import { heroSlideSchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

// GET - Public endpoint for fetching active hero slides
export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      include: {
        typewriterWords: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ slides });
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Admin only: Create new hero slide
export async function POST(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = heroSlideSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { typewriterWords, ...slideData } = validation.data;

    const slide = await prisma.heroSlide.create({
      data: {
        ...slideData,
        typewriterWords: typewriterWords
          ? {
              create: typewriterWords.map((w) => ({
                word: w.word,
                order: w.order,
              })),
            }
          : undefined,
      },
      include: {
        typewriterWords: { orderBy: { order: 'asc' } },
      },
    });

    await logAudit(authUser.userId, 'CREATE', 'hero_slides', slide.id, { title: slide.title });

    return NextResponse.json({ slide }, { status: 201 });
  } catch (error) {
    console.error('Error creating hero slide:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
