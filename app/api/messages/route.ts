import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prisma';
import { pusherServer } from '@/app/libs/pusher';
import getCurrentUser from '@/app/_utils/getCurrentUser';

export async function POST(request: Request) {
  try {
    const { message, image, conversationId } = await request.json();
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId }
        },
        sender: {
          connect: { id: currentUser.id }
        },
        seen: {
          connect: { id: currentUser.id }
        }
      },
      include: {
        seen: true,
        sender: true
      }
    });

    const updateConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: { seen: true }
        }
      }
    });

    pusherServer.trigger(conversationId, 'messages:create', newMessage);

    const lastMessage =
      updateConversation.messages[updateConversation.messages.length - 1];

    updateConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:update', {
          id: conversationId,
          messages: [lastMessage]
        });
      }
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log('ERROR_MESSAGES:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
