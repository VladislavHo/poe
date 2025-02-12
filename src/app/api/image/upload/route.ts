import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/app/configs/auth';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Отключаем встроенный парсер
  },
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('image') as File;


  const session = await getServerSession(authConfig);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }


  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Проверка типа файла
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'File is not an image' }, { status: 400 });
  }

  // Проверка размера файла (например, не более 5 МБ)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File size exceeds the limit' }, { status: 400 });
  }

  const uploadDir = './public/uploads'; // Директория для сохранения изображений

  // Создаем директорию, если она не существует
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error('Error creating directory:', error);
    return NextResponse.json({ error: 'Error creating the upload directory' }, { status: 500 });
  }

  const filePath = path.join(uploadDir, file.name);

  try {
    // Сохраняем файл на сервере
    const buffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(buffer));

    console.log('File saved successfully:', filePath);
    // Сохраняем путь к изображению в базе данных
    // const newImage = await prisma.image.create({
    //   data: {
    //     name: file.name,
    //     path: filePath,
    //   },
    // });

    // const newImage = null
    console.log('Data to be saved:', {
      name: file.name,
      path: filePath,
    });

    const newImage = await prisma.image.create({
      data: {
        name: file.name,
        path: filePath
      }
    })

    console.log(newImage);



    // Проверяем, что newImage не равен null или undefined


    return NextResponse.json(newImage, { status: 200 });
  } catch (error) {
    console.error('Error creating image:', error);
    return NextResponse.json({ error: 'Error saving the image to the server' }, { status: 500 });
  }
}