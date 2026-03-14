import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, logAudit } from '@/lib/auth';
import { heroSlideSchema } from '@/lib/validations';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await requireAuth(request);
  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const slide = await prisma.heroSlide.findUnique({
      where: { id: params.id },
      include: {
        typewriterWords: { orderBy: { order: 'asc' } },
      },
    });

    if (!slide) {
      return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
    }

    return NextResponse.json({ slide });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Delete existing typewriter words and recreate
    await prisma.heroTypewriterWord.deleteMany({
      where: { slideId: params.id },
    });

    const slide = await prisma.heroSlide.update({
      where: { id: params.id },
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

    await logAudit(authUser.userId, 'UPDATE', 'hero_slides', slide.id, { title: slide.title });

    return NextResponse.json({ slide });
  } catch (error) {
    console.error('Error updating hero slide:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await requireAuth(request);
  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.heroSlide.delete({
      where: { id: params.id },
    });

    await logAudit(authUser.userId, 'DELETE', 'hero_slides', params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
