import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, logAudit } from '@/lib/auth';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const file = await prisma.mediaFile.findUnique({ where: { id: params.id } });
    if (!file) return NextResponse.json({ error: 'File not found' }, { status: 404 });

    // Delete physical file if it's a local upload
    if (file.url.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', file.url);
      try {
        await unlink(filePath);
      } catch {
        // File may not exist on disk, continue
      }
    }

    await prisma.mediaFile.delete({ where: { id: params.id } });
    await logAudit(authUser.userId, 'DELETE', 'media_files', params.id, { name: file.name });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const file = await prisma.mediaFile.update({
      where: { id: params.id },
      data: { alt: body.alt, name: body.name },
    });
    return NextResponse.json({ file });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
