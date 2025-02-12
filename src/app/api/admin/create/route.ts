
import prisma from '../../../../../lib/prisma'

import bcrypt from 'bcrypt';

import { authConfig } from '@/app/configs/auth';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { email, password } = await req.json();


  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email и пароль обязательны' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }


  const hashedPassword = await bcrypt.hash(password, 10);

  if (!hashedPassword) {
    throw new Error('Password not hashed');
  }

  try {
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify(admin), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Ошибка при создании администратора', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}