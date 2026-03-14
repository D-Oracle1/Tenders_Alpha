import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, logAudit } from '@/lib/auth';
import { teamMemberSchema } from '@/lib/validations';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const validation = teamMemberSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }

    const member = await prisma.teamMember.update({
      where: { id: params.id },
      data: validation.data,
    });
    await logAudit(authUser.userId, 'UPDATE', 'team_members', member.id);
    return NextResponse.json({ member });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.teamMember.delete({ where: { id: params.id } });
    await logAudit(authUser.userId, 'DELETE', 'team_members', params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
