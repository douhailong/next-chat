import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prisma';
import { pusherServer } from '@/app/libs/pusher';
import getCurrentUser from '@/app/_utils/getCurrentUser';

export async function POST(request: Request) {
  try {
    const { userId, isGroup, members, name } = await request.json();
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 });
    }

    if (isGroup) {
      const conversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { id: string }) => ({ id: member.id })),
              currentUser.id
            ]
          }
        },
        include: { users: true }
      });

      conversation.users.forEach((user) => {
        user.email &&
          pusherServer.trigger(user.email, 'conversation:create', conversation);
      });

      return NextResponse.json(conversation);
    }

    const prevConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, currentUser.id]
            }
          }
        ]
      }
    });

    if (prevConversations[0]) {
      return NextResponse.json(prevConversations[0]);
    }

    const conversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id
            },
            {
              id: userId
            }
          ]
        }
      },
      include: {
        users: true
      }
    });

    conversation.users.forEach((user) => {
      user.email &&
        pusherServer.trigger(user.email, 'conversation:create', conversation);
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.log('CONVERSATIONS_ERROR:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
