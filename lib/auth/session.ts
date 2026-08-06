import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function getSession() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session');
  
  if (!sessionCookie) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionCookie.value },
    select: { id: true, email: true, name: true }
  });

  return user;
}

export async function requireAuth() {
  const user = await getSession();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}
