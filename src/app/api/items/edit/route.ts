import { authConfig } from "@/app/configs/auth";
import { PrismaClient } from "@prisma/client";

import { getServerSession } from "next-auth";




const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const data = await req.json();
  const id = req.url.split("id=")[1];


  const session = await getServerSession(authConfig);


  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }



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