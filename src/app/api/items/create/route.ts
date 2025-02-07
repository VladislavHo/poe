import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.json();

  try {

    const item = await prisma.item.create({
      data
    });

    if (!item) {
      throw new Error('Item not created');
    }


    return new Response(JSON.stringify(item), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: 'Item not created' }), { status: 500 });
  }
}