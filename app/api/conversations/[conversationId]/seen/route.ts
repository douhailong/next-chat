import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/_utils/getCurrentUser';

interface Params {
  conversationId: string;
}

export async function POST(request: Request, { params }: { params: Params }) {
  const { conversationId } = params;
  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
  } catch (error) {
    console.log('SEEN_ERROR:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
