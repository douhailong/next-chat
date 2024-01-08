import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/_utils/getCurrentUser';
import prisma from '@/app/libs/prisma';
import { pusherServer } from '@/app/libs/pusher';

type Params = {
  conversationId?: string;
};

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        }
      }
    });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log('DELETE_ERROR:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
