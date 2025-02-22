// pages/api/items.ts
import { authConfig } from "@/app/configs/auth";
import { PrismaClient } from "@prisma/client";

import { getServerSession } from "next-auth";




const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const id = req.url.split("id=")[1];
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (typeof id === "string") {
    try {
      const item = await prisma.item.findUnique({
        where: { id },
        include: { image: true }
      });

      if (!item) {
        return new Response(JSON.stringify({ error: "Item not found" }), { status: 404 });
      }

      // Удаляем элемент
      await prisma.item.delete({
        where: { id }
      });

      // Проверяем и удаляем изображение, если оно не связано с другими элементами
      if (item.image) {
        const imageId = item.image.id;
        const associatedItems = await prisma.item.findMany({
          where: { imageId: imageId }
        });

        if (associatedItems.length === 0) {
          await prisma.image.delete({
            where: { id: imageId }
          });
        }
      }

      return new Response(JSON.stringify({ message: "Item deleted successfully" }), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "An error occurred while deleting the item." }), { status: 500 });
    }
  } else {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }
}