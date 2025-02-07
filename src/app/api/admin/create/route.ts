// import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/app/lib/prisma'

import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { email, password } = await req.json(); // Получаем данные из тела запроса

  // Проверка наличия email и password
  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email и пароль обязательны' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Хэширование пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Создание администратора
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
    console.error('Ошибка при создании администратора:', error);
    return new Response(JSON.stringify({ message: 'Ошибка при создании администратора' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}