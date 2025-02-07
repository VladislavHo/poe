"use client";
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler  } from "react-hook-form";

import { Item } from '@/app/types/item';
import Image from 'next/image';
import './create_item.scss'
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';




export default function ModalCreateItem() {
  const { register, handleSubmit } = useForm<Item>();
  const session = useSession();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);

    useEffect(() => {
      if (session.status === "unauthenticated") {
        redirect("/")
      }
    }, [session]);
  const onSubmit: SubmitHandler<Item> = async (data: Item) => {
    const newData = { ...data, imageId };

    await fetch('/api/items/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newData }),
    });
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };



  const handleSubmitImage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedImage) return;


    const formData = new FormData();
    formData.append('image', selectedImage);
    try {
      const response = await fetch('/api/image/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      const data = await response.json();
      console.log(data, 'image');
      setImageId(data.id);
      if (response.ok) {
        setMessage(data.message);
        setError(null); // Сбрасываем ошибку
      } else {
        setError(data.error);
        setMessage(null); // Сбрасываем сообщение
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred. Please try again.");
      setMessage(null);
    }
  };
  return (
    <>
      <div className="create_field">
        <div className="create_field__input">
          <button className='prev' onClick={() => window.history.back()}><span>Prev</span></button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder="Name" required />
            <input {...register("supname")} placeholder="Supname" required />
            <input {...register("league")} placeholder="League" />
            <input {...register("owner")} placeholder="Owner" />
            <textarea {...register("description")} placeholder="Description" required />
            <input {...register("shortDescription")} placeholder="Short Description" />
            {/* <input {...register("categoryId")} placeholder="Category ID" required />
         */}
            <select id="" {...register("categoryId")}>
              <option value="1">Boots(s)</option>
              <option value="2">Quiver(s)</option>
              <option value="3">Sword(s)</option>
              <option value="4">Chest Armour(s)</option>
              <option value="5">Ring(s)</option>
              <option value="6">Gloves(s)</option>
              <option value="7">Wand(s)</option>
              <option value="8">Helmet(s)</option>
              <option value="9">Jewel(s)</option>
              <option value="10">Shield(s)</option>

            </select>
            <input {...register("itemClass")} placeholder="Item Class" />
            <input {...register("rarity")} placeholder="Rarity" />
            <input type="number" {...register("fee")} placeholder="Fee" />
            {/* <input {...register("requirements")} placeholder="Requirements" /> */}
            <input type="number" {...register("itemLevel")} placeholder="Item Level" />
            {/* <input {...register("implicitEffects")} placeholder="Implicit Effects" /> */}
            {/* <input {...register("additionalStatistics")} placeholder="Additional Statistics" /> */}
            <button className='added-item--btn' disabled={imageId === null} type="submit"><span>Add Item</span></button>
          </form>
        </div>

        <div className='create_field__image'>
          <form onSubmit={handleSubmitImage}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {imagePreview &&
              <div className="image--container">

                <Image src={imagePreview} alt="Image preview" width={150} height={150} />
              </div>

            }
            <button disabled={imagePreview === null} type="submit">
              <span>Upload</span>
            </button>
          </form>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>

    </>

  );
}
