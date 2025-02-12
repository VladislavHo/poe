import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(req: Request) {



  try {
    const url = new URL(req.url);

    const id = url.searchParams.get("id");

    if (typeof id === "string") {
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          items: {
            include: {
              image: true
            }
          }
        }
      });

      if (!category) {
        return new Response(JSON.stringify({ error: "Category not found" }), { status: 404 })
      }

      return new Response(JSON.stringify(category), { status: 200 })
    }
    const category = await prisma.category.findMany({
      include: {
        items: true
      }
    })


    if (!category) {
      return new Response(JSON.stringify({ error: "Category not found" }), { status: 404 })
    }


    return new Response(JSON.stringify(category), { status: 200 })


  } catch (error) {
    return new Response(JSON.stringify({ error: error as string }), { status: 500 })

  }
}