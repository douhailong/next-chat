import prisma from '@/app/libs/prisma';
import getCurrentUser from './getCurrentUser';

export default async function getConversations() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) return [];

    return await prisma.conversation.findMany({
      where: { userIds: { has: currentUser?.id } },
      orderBy: { lastMessageAt: 'desc' },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true
          }
        }
      }
    });
  } catch (error) {
    return [];
  }
}
