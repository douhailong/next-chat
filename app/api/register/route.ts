import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new Response('Missing info', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({ data: { email, name, hashedPassword } });

    return NextResponse.json(user);
  } catch (err) {
    console.log('REGISTER_ERROR:', err);
    return new Response('Internal error', { status: 500 });
  }
}
