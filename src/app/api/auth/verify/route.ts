import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get('admin-session')?.value;
  const session = validateSession(sessionToken);
  
  if (session.isAuthenticated) {
    return NextResponse.json({ 
      success: true,
      user: {
        username: session.username,
        role: session.role
      }
    });
  } else {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }
}
