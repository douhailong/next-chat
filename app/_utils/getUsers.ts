import prisma from '@/app/libs/prisma';
import getSession from './getSession';

export default async function getUsers() {
  try {
    const session = await getSession();

    if (!session?.user?.email) return [];

    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      where: { NOT: { email: session.user.email } }
    });
  } catch (error) {
    return [];
  }
}
