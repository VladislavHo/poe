

import bcrypt from "bcrypt"; // Убедитесь, что bcryptjs установлен
import prisma from "@/app/lib/prisma";


export  async function POST(req: Request) {

  const body = await req.json(); // Парсим тело запроса
  const { email, oldPassword, newPassword } = body;

    try {
      // Найдите пользователя по ID
      const user = await prisma.admin.findUnique({ where: { email } });

      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
      }

      // Проверьте старый пароль
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return new Response(JSON.stringify({ error: "Invalid old password" }), { status: 401 });
      }

      // Хешируйте новый пароль
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Обновите пароль пользователя
      await prisma.admin.update({
        where: { email},
        data: { password: hashedPassword },
      });

      return new Response(JSON.stringify({ message: "Password changed successfully" }), { status: 200 });

    } catch (error) {
      return new Response(JSON.stringify({ error: error as string }), { status: 500 });
    }

}