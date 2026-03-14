import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [
      totalServices,
      totalProjects,
      totalSisterCompanies,
      totalMessages,
      unreadMessages,
      totalMedia,
      totalUsers,
      recentMessages,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.sisterCompany.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: 'UNREAD' } }),
      prisma.mediaFile.count(),
      prisma.user.count(),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, email: true, subject: true, status: true, createdAt: true },
      }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { user: { select: { name: true, email: true } } },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalServices,
        totalProjects,
        totalSisterCompanies,
        totalMessages,
        unreadMessages,
        totalMedia,
        totalUsers,
      },
      recentMessages,
      recentAuditLogs,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
