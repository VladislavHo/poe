

import bcrypt from "bcrypt";
import prisma from "../../../../../lib/prisma";

import { getServerSession } from "next-auth/next"

import { authConfig } from "@/app/configs/auth";


export async function POST(req: Request) {
  const body = await req.json()

  const { email, oldPassword, newPassword } = body;
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  if (!email || !oldPassword || !newPassword) {
    return new Response(JSON.stringify({ error: 'Email, old password, and new password are required' }), { status: 400 });
  }

  try {
    const user = await prisma.admin.findUnique({ where: { email } });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: 'Invalid old password' }), { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return new Response(JSON.stringify({ message: 'Password changed successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error}), { status: 500 });
  }
}