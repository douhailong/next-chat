import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';

import getCurrentUser from '@/app/_utils/getCurrentUser';

interface Params {
  conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json(null);
    }
  } catch (err) {
    return NextResponse.json(null);
  }
}
