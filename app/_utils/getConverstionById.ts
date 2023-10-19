import prisma from '@/app/libs/prisma';
import getCurrentUser from './getCurrentUser';

export default async function getConversationById(conversationId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) return null;

    return await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true }
    });
  } catch (error) {
    return null;
  }
}
