import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, logAudit } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const group = searchParams.get('group');
    const keys = searchParams.get('keys')?.split(',');

    const where: Record<string, unknown> = {};
    if (group) where.group = group;
    if (keys) where.key = { in: keys };

    const settings = await prisma.siteSetting.findMany({ where });

    // Convert to key-value map
    const settingsMap = settings.reduce(
      (acc: Record<string, string>, s) => {
        acc[s.key] = s.value;
        return acc;
      },
      {}
    );

    return NextResponse.json({ settings, settingsMap });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();

    // Batch update settings
    if (Array.isArray(body)) {
      const updates = await Promise.all(
        body.map((s: { key: string; value: string; group?: string; label?: string }) =>
          prisma.siteSetting.upsert({
            where: { key: s.key },
            update: { value: s.value },
            create: { key: s.key, value: s.value, group: s.group || 'general', label: s.label },
          })
        )
      );
      await logAudit(authUser.userId, 'UPDATE', 'site_settings', undefined, { count: updates.length });
      return NextResponse.json({ settings: updates });
    }

    // Single setting
    const setting = await prisma.siteSetting.upsert({
      where: { key: body.key },
      update: { value: body.value },
      create: {
        key: body.key,
        value: body.value,
        group: body.group || 'general',
        label: body.label,
      },
    });

    await logAudit(authUser.userId, 'UPDATE', 'site_settings', setting.id, { key: setting.key });
    return NextResponse.json({ setting });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
