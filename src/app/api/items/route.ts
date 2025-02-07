import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);

  const id = url.searchParams.get("id");

  if (typeof id === "string") {
    const item = await prisma.item.findUnique({
      where: { id },
      include: {
        category: true,
        image: true
      },
    });

    if (!item) {
      return new Response(JSON.stringify({ error: "Item not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(item), { status: 200 });
  }
  const items = await prisma.item.findMany({
    include: {
      category: true,
      image: true
    },
  });

  if (!items) {
    return new Response(JSON.stringify({ error: "No items found" }), { status: 404 });
  }


  return new Response(JSON.stringify(items), { status: 200 });
}