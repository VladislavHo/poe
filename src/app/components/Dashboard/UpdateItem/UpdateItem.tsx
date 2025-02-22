"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";

import { Item, ItemWithId } from '@/app/types/item';

import { useSession } from 'next-auth/react';
import { editItems, getItem } from '@/app/api/request/items';
import { redirect } from 'next/navigation';
import Notification from '../../Notification/Notification';
import './update.scss';

export default function UpdateItem({ id }: { id: string }) {
  const [success, setSuccess] = useState({
    open: false,
    message: "",
    error: false
  });



  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess({ message: "", error: false, open: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, [success.open]);


  const session = useSession();
  const [items, setItems] = useState<Item | null>(null);
  const { register, handleSubmit, setValue } = useForm<Item>({
    defaultValues: {
      description: items?.description || '',
      categoryId: items?.categoryId || '',
    }
  });
  useEffect(() => {
    if (items) {
      // Устанавливаем значения по умолчанию, когда items загружены
      setValue('description', items.description || '');

      setValue('categoryId', items.categoryId || '');

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


  const onSubmit = async (data: Item) => {
    const newData: ItemWithId = { ...data, id };
    const res = await editItems({ data: newData });
    if (res.status === 200) {
      setSuccess({ message: "Success", error: false, open: true });
    } else {
      setSuccess({ message: "There was an error adding", error: true, open: true });
    }
  }

  return (
    <>
      {success.open &&
        <Notification
          open={success.open}
          message={success.message}
          error={success.error} />}
      <div className="create_field">
        <div className="l-create_field">
          <div className="create_field__input">
            <button className='prev' onClick={() => redirect("/dashboard")}><span>Dashboard</span></button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3>Added link</h3>
              <label>
                <textarea {...register("description")} placeholder="Description" required />

              </label>

              <label>
                <select {...register("categoryId")}>
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

              </label>

              <button className='update-item--btn' type="submit"><span>Update Item</span></button>

            </form>
          </div>
        </div>



      </div>

    </>

  );
}
