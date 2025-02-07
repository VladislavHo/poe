import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Если токен отсутствует, перенаправляем на страницу входа
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Продолжаем выполнение запроса
  return NextResponse.next();
}

// Укажите маршруты, которые нужно защитить
export const config = {
  matcher: ["/dashboard", "/dashboard/create-item"],
};