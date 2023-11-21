import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/_utils/getCurrentUser';

type Params = {
  conversationId: string;
};

export async function POST(request: Request, { params }: { params: Params }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const conversation = await prisma?.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          include: {
            seen: true,
            sender: true
          }
        },
        users: true
      }
    });

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updateMessage = await prisma?.message.update({
      where: { id: lastMessage.id },
      data: {
        seen: {
          connect: { id: currentUser.id }
        }
      },
      include: { seen: true, sender: true }
    });
  } catch (error) {
    console.log('SEEN_ERROR:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
