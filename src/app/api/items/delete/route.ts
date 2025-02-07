// pages/api/items.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest } from "next";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const url = new URL(req.url); // Создаем объект URL из запроса
  const id = url.searchParams.get('id'); // Получаем id из query параметров// Получаем id из query параметров
  if (typeof id === "string") {
    try {
      await prisma.item.delete({
        where: { id },
      });
      return new Response(JSON.stringify({ message: "Item deleted successfully" }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error deleting item" }), { status: 500 });
    }
  } else {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }
}