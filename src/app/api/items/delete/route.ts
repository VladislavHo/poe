// pages/api/items.ts
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const url = new URL(req.url); 
  const id = url.searchParams.get('id'); 
  if (typeof id === "string") {
    try {
      await prisma.item.delete({
        where: { id },
      });
      return new Response(JSON.stringify({ message: "Item deleted successfully" }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error as string }), { status: 500 });
    }
  } else {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }
}