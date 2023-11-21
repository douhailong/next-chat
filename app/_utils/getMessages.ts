import prisma from '@/app/libs/prisma';

export default async function getMessages(conversationId: string) {
  try {
    return await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      include: { sender: true, seen: true }
    });
  } catch (error) {
    return [];
  }
}
