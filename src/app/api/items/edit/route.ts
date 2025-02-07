import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const data = await req.json();
  const url = new URL(req.url);

  const id = url.searchParams.get("id");

  if (typeof id === "string") {
    try {
      const item = await prisma.item.update({
        where: { id },
        data
      });

      if (!item) {
        throw new Error('Item not updated');
      }


      return new Response(JSON.stringify(item), { status: 201 });
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ message: 'Item not updated' }), { status: 500 });
    }
  }

}