import prisma from '@/app/libs/prisma';

export default async function getMessages(conversationId: string) {
  try {
    return await prisma.message.findMany({
      where: { conversationId },
      include: { sender: true, seen: true },
      orderBy: { createdAt: 'asc' }
    });
  } catch (error) {
    return [];
  }
}
