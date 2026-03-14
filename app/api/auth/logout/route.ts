import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie, requireAuth, logAudit } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const user = await requireAuth(request);

  if (user) {
    await logAudit(
      user.userId,
      'LOGOUT',
      'users',
      user.userId,
      {},
      request.ip,
      request.headers.get('user-agent') || undefined
    );
  }

  const response = NextResponse.json({ success: true });
  clearAuthCookie(response);
  return response;
}
