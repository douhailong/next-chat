import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prisma';
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

    // if (isGroup) {
    //   const converation = await prisma.conversation.create({
    //     data: {
    //       name,
    //       isGroup,
    //       users: {
    //         connect: [
    //           ...members.map((member: { value: string }) => ({
    //             id: member.value
    //           })),
    //           {
    //             id: currentUser.id
    //           }
    //         ]
    //       }
    //     },
    //     include: {
    //       users: true
    //     }
    //   });

    //   return NextResponse.json(converation);
    // }

    const currentConversations = await prisma.conversation.findMany({
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

    if (currentConversations[0]) {
      return NextResponse.json(currentConversations[0]);
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

    return NextResponse.json(conversation);
  } catch (error) {
    console.log('CONVERSATIONS_ERROR:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
