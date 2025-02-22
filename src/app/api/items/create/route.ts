import { authConfig } from "@/app/configs/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.json();


  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {

    const item = await prisma.item.create({
      data
    });
    
    if (!item) {
      throw new Error('Item not created');
    }



    return new NextResponse(JSON.stringify(item), { status: 201 });
  } catch (error) {

    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
}