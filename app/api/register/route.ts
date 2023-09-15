import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prisma';

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    if (!email || !name || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { email, name, hashedPassword } });

    return NextResponse.json(user);
  } catch (err) {
    console.log('REGISTER_ERROR:', err);
    return new NextResponse('Internal error', { status: 500 });
  }
}
