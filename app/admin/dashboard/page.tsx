import { getAuthUser } from '@/lib/auth';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import DashboardClient from '@/components/admin/DashboardClient';
import { redirect } from 'next/navigation';

async function getDashboardData() {
  const [
    totalServices,
    totalProjects,
    totalSisterCompanies,
    totalMessages,
    unreadMessages,
    totalMedia,
    totalUsers,
    recentMessages,
    recentLogs,
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
      include: { user: { select: { name: true } } },
    }),
  ]);

  return {
    stats: { totalServices, totalProjects, totalSisterCompanies, totalMessages, unreadMessages, totalMedia, totalUsers },
    recentMessages,
    recentLogs,
  };
}

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('tgm_admin_token')?.value;
  if (!token) redirect('/admin/login');

  const data = await getDashboardData();
  return <DashboardClient data={data} />;
}
