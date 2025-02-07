"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";

import { Item } from '@/app/types/item';

import { useSession } from 'next-auth/react';
import { getItem } from '@/app/api/request/items';
import { redirect } from 'next/navigation';
import './update.scss';
export default function UpdateItem({ id }: { id: number }) {
  const session = useSession();
  const [items, setItems] = useState<any>([]);
  const { register, handleSubmit, setValue } = useForm<any>({
    defaultValues: {
      name: items.name,
      supname: items.supname,
      league: items.league,
      owner: items.owner,
      description: items.description,
      shortDescription: items.shortDescription,
      categoryId: items.categoryId,
      itemLevel: items.itemLevel,
      fee: items.fee,
      itemClass: items.itemClass,
      rarity: items.rarity,

    }
  });
  useEffect(() => {
    if (items) {
      // Устанавливаем значения по умолчанию, когда items загружены
      setValue('name', items.name);
      setValue('supname', items.supname);
      setValue('league', items.league);
      setValue('owner', items.owner);
      setValue('description', items.description);
      setValue('shortDescription', items.shortDescription);
      setValue('categoryId', items.categoryId);
      setValue('itemLevel', items.itemLevel);
      setValue('fee', items.fee);
      setValue('itemClass', items.itemClass);
      setValue('rarity', items.rarity);
    }
  }, [items, setValue]);
  useEffect(() => {
    if (session.status === "unauthenticated") {
      redirect("/")
    }
  }, [session]);


  useEffect(() => {
    getItem({ id }).then((res) => {
      setItems(res.item);
    })
  }, [id]);

  console.log(items)

  const onSubmit = async (data: Item) => {
    const newData = { ...data };
    await fetch(`/api/items/edit?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newData }),
    });
  }

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
            <button className='added-item--btn' type="submit"><span>Add Item</span></button>
          </form>
        </div>


      </div>

    </>

  );
}
