"use client";
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";

import { Item } from '@/app/types/item';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { createItem } from '@/app/api/request/items';
import Notification from '../../Notification/Notification';
import { uploadImage } from '@/app/api/request/image';
import './create_item.scss'
import Link from 'next/link';
import { PoE2ItemParser } from 'poe-item-parser';





export default function ModalCreateItem() {

  const { register, handleSubmit } = useForm<Item>();
  const session = useSession();
  const [success, setSuccess] = useState({
    open: false,
    message: "",
    error: false
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);


  const [imageId, setImageId] = useState<string | null>(null);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      redirect("/")
    }
  }, [session]);
  const onSubmit: SubmitHandler<Item> = async (data: Item) => {
    const itemParser = new PoE2ItemParser(`${data.description}`).getItem();
    const newData = { ...data, imageId, name: itemParser.itemName.lines[0], subname: itemParser.itemName.lines[1] };

    const res = await createItem({ data: newData })

    if (res.status === 200) {
      setSuccess({ message: "Success", error: false, open: true });
    } else {
      setSuccess({ message: "There was an error adding", error: true, open: true });
    }

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
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess({ message: "", error: false, open: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, [success.open]);


  const handleSubmitImage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedImage) return;


    const formData = new FormData();
    formData.append('image', selectedImage);


    const response = await uploadImage({ data: formData });
    if (response.status === 200) {
      setSuccess({ message: "Success", error: false, open: true });
      setImageId(response.image.id);
    } else {
      setSuccess({ message: "There was an error adding", error: true, open: true });
    }

  };
  return (
    <>
      {success.open && <Notification
        open={success.open}
        message={success.message}
        error={success.error} />}

      <div className="create_field">
        <div className="l-create_field">
          <div className="create_field__input">
            {/* <button className='prev' onClick={() => redirect("/dashboard")}><span>Dashboard</span></button> */}
            <Link href="/dashboard"><button className='prev'><span>Dashboard</span></button></Link>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                <h3>Added link</h3>
                <textarea rows={10} cols={50} {...register("description")} placeholder="Copy Text" required />

              </label>

              <label>
                <h3>fee</h3>
                <input type="text" {...register("fee")} placeholder="Fee" />
              </label>
              <label>
                <h3>class</h3>
                <input type="text" {...register("className")} placeholder="Class Name" />
              </label>
              <label>
                <h3>short Description</h3>
                <input type="text" {...register("shortDescription")} placeholder="Short Description" />
              </label>
              <label>
                <h3>OWNER</h3>
                <input type="text" {...register("owner")} placeholder="OWNER NAME" />
              </label>
              <label>
                <h3>Sockets</h3>
                <input type="text" {...register("sockets")} placeholder="Sockets (W-W-W-W-W-W)" />
              </label>

              <label>
              <h3>Category</h3>
                <select {...register("categoryId")}>
                  <option value="1">Boots(s)</option>
                  <option value="10">Quiver(s)</option>
                  <option value="2">Sword(s)</option>
                  <option value="3">Chest Armour(s)</option>
                  <option value="4">Ring(s)</option>
                  <option value="5">Gloves(s)</option>
                  <option value="6">Wand(s)</option>
                  <option value="7">Helmet(s)</option>
                  <option value="8">Jewel(s)</option>
                  <option value="9">Shield(s)</option>
                  <option value="11">Standart</option>
                </select>

              </label>


              <button onClick={() => redirect("/dashboard")} className='added-item--btn' disabled={imageId === null} type="submit"><span>Add Item</span></button>
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
              <button disabled={imagePreview === null} type="submit" >
                <span>Upload</span>
              </button>
            </form>

          </div>
        </div>

      </div>

    </>

  );
}