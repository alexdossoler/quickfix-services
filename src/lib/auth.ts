export interface AuthSession {
  isAuthenticated: boolean;
  username?: string;
  role?: string;
  expiresAt?: number;
}

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'quickfix2025';

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createSession(username: string): string {
  const session = {
    isAuthenticated: true,
    username,
    role: 'admin',
    expiresAt: Date.now() + (24 * 60 * 60 * 1000)
  };
  
  return Buffer.from(JSON.stringify(session)).toString('base64');
}

export function validateSession(sessionToken?: string): AuthSession {
  if (!sessionToken) {
    return { isAuthenticated: false };
  }

  try {
    const session = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
    
    if (session.expiresAt && session.expiresAt < Date.now()) {
      return { isAuthenticated: false };
    }
    
    return session;
  } catch {
    return { isAuthenticated: false };
  }
}
