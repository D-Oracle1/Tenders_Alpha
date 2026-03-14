import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// GET - Admin endpoint: fetch ALL hero slides (active + inactive)
export async function GET(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const slides = await prisma.heroSlide.findMany({
      include: {
        typewriterWords: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ slides });
  } catch (error) {
    console.error('Error fetching all hero slides:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
