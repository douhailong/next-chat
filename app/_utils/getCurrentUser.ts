import prisma from '@/app/libs/prisma';
import getSession from './getSession';

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    return await prisma.user.findUnique({
      where: { email: session?.user?.email }
    });
  } catch (error) {
    return null;
  }
}
