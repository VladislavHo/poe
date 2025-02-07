import prisma from '../../lib/prisma'

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

  try {
    // Поиск администратора по email
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    // Проверка, существует ли администратор
    if (!admin) {
      return new Response(JSON.stringify({ message: 'Неверный email или пароль' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Сравнение пароля
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ message: 'Неверный email или пароль' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Успешный вход
    return new Response(JSON.stringify({ message: 'Успешный вход', admin }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Ошибка при входе:', error);
    return new Response(JSON.stringify({ message: 'Ошибка при входе' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}