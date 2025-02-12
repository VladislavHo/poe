"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";

import { Item, ItemWithId } from '@/app/types/item';

import { useSession } from 'next-auth/react';
import { editItems, getItem } from '@/app/api/request/items';
import { redirect } from 'next/navigation';
import Notification from '../../Notification/Notification';
import './update.scss';
import { EYE_SVG } from '../../SVG/SVG';
import Image from 'next/image';
export default function UpdateItem({ id }: { id: string }) {
  const [success, setSuccess] = useState({
    open: false,
    message: "",
    error: false
  });
  const [activeImage, setActiveImage] = useState({
    name: false,
    supname: false,
    owner: false,
    description: false,
    shortDescription: false,
    categoryId: false,
    fee: false,
    itemClass: false,
    rarity: false,
    socket: false,
    quality: false,
    energyShield: false,
    requiresLevel: false,
    evasion: false,
    int: false,
    str: false,
    armour: false,
    dex: false,
    physicalDamage: false,
    strikeChange: false,
    attackSeconds: false,
    intBuff: false,
    buff_0_html: false,
    buff_1_html: false,
    buff_2_html: false,
    buff_white_html: false,
    buff_gold_html: false,

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
      name: items?.name || '',
      supname: items?.supname || '',
      owner: items?.owner || '',
      description: items?.description || '',
      shortDescription: items?.shortDescription || '',
      categoryId: items?.categoryId || '',
      fee: items?.fee || '',
      itemClass: items?.itemClass || '',
      rarity: items?.rarity || '',
      socket: items?.socket || '',
      quality: items?.quality || '',
      energyShield: items?.energyShield || '',
      requiresLevel: items?.requiresLevel || '',
      evasion: items?.evasion || '',
      str: items?.str || '',
      armour: items?.armour || '',
      dex: items?.dex || '',
      physicalDamage: items?.physicalDamage || '',
      strikeChange: items?.strikeChange || '',
      attackSeconds: items?.attackSeconds || '',
      intBuff: items?.intBuff || '',
      buff_0_html: items?.buff_0_html || '',
      buff_1_html: items?.buff_1_html || '',
      buff_2_html: items?.buff_2_html || '',
      buff_white_html: items?.buff_white_html || '',
      buff_gold_html: items?.buff_gold_html || '',
    }
  });
  useEffect(() => {
    if (items) {
      // Устанавливаем значения по умолчанию, когда items загружены
      setValue('name', items.name || '');
      setValue('supname', items.supname || '');
      setValue('owner', items.owner || '');
      setValue('description', items.description || '');
      setValue('shortDescription', items.shortDescription || '');
      setValue('categoryId', items.categoryId || '');
      setValue('fee', items.fee || '');
      setValue('itemClass', items.itemClass || '');
      setValue('rarity', items.rarity || '');
      setValue('socket', items.socket || '');
      setValue('quality', items.quality || '');
      setValue('energyShield', items.energyShield || '');
      setValue('requiresLevel', items.requiresLevel || '');
      setValue('evasion', items.evasion || '');
      setValue('str', items.str || '');
      setValue('armour', items.armour || '');
      setValue('dex', items.dex || '');
      setValue('physicalDamage', items.physicalDamage || '');
      setValue('strikeChange', items.strikeChange || '');
      setValue('attackSeconds', items.attackSeconds || '');
      setValue('intBuff', items.intBuff || '');
      setValue('buff_0_html', items.buff_0_html || '');
      setValue('buff_1_html', items.buff_1_html || '');
      setValue('buff_2_html', items.buff_2_html || '');
      setValue('buff_white_html', items.buff_white_html || '');
      setValue('buff_gold_html', items.buff_gold_html || '');
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
              <label>
                <input {...register("name")} placeholder="Name (Behemoth)" required />
                <button
                  type="button"
                  style={!activeImage.name ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} onClick={() => setActiveImage({ ...activeImage, name: !activeImage.name })}>
                  <EYE_SVG />
                </button>
                {activeImage.name && (
                  <div className="img--container">
                    <Image src="/img/card.png" alt="Card Image" width={300} height={150} />
                    <div className="lienter" style={{ width: "100px", height: "4px", position: "absolute", left: "50%", top: "25px", backgroundColor: "red" }}></div>
                  </div>
                )}
              </label>

              <label>
                <input {...register("supname")} placeholder="Supname (Warlock Boots)" required />
                <button
                  type="button"
                  style={!activeImage.supname ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} onClick={() => setActiveImage({ ...activeImage, supname: !activeImage.supname })}>
                  <EYE_SVG />
                </button>
                {activeImage.supname && (
                  <div className="img--container">
                    <Image src="/img/card.png" alt="Card Image" width={300} height={150} />
                    <div className="lienter" style={{ width: "100px", height: "4px", position: "absolute", left: "50%", top: "35px", backgroundColor: "red" }}></div>

                  </div>
                )}
              </label>

              <label>
                <input {...register("owner")} placeholder="Owner (Bean)" />
                <button
                  style={!activeImage.owner ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }}
                  onClick={() => setActiveImage({ ...activeImage, owner: !activeImage.owner })} type="button"><EYE_SVG /></button>
                {
                  activeImage.owner && (
                    <div className="img--container">
                      <Image src="/img/card.png" alt="Card Image" width={300} height={150} />
                      <div className="lienter" style={{ width: "100px", height: "4px", position: "absolute", left: "50%", top: "114px", backgroundColor: "red" }}></div>
                    </div>
                  )
                }
              </label>

              <label>
                <input {...register("shortDescription")} placeholder="Short Description (Armour Stack)" />
                <button
                  style={!activeImage.shortDescription ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }}
                  onClick={() => setActiveImage({ ...activeImage, shortDescription: !activeImage.shortDescription })} type="button"><EYE_SVG /></button>

                {
                  activeImage.shortDescription && (
                    <div className="img--container">
                      <Image src="/img/card.png" alt="Card Image" width={300} height={150} />
                      <div className="lienter" style={{ width: "100px", height: "4px", position: "absolute", left: "50%", top: "87px", backgroundColor: "red" }}></div>
                    </div>
                  )
                }
              </label>

              <label>
                <textarea {...register("description")} placeholder="Description" required />
                <button
                  style={!activeImage.description ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }}

                  onClick={() => setActiveImage({ ...activeImage, description: !activeImage.description })} type="button"><EYE_SVG /></button>

                {
                  activeImage.description && (
                    <div className="img--container">
                      <Image src="/img/card.png" alt="Card Image" width={300} height={150} />
                      <div className="lienter" style={{ width: "100px", height: "4px", position: "absolute", left: "50%", top: "140px", backgroundColor: "red" }}></div>
                    </div>
                  )
                }
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

              <label>
                <input {...register("itemClass")} placeholder="Class" />
                <button
                  style={!activeImage.itemClass ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }}

                  onClick={() => setActiveImage({ ...activeImage, itemClass: !activeImage.itemClass })} type="button"><EYE_SVG /></button>

                {
                  activeImage.itemClass && (
                    <div className="img--container">
                      <Image src="/img/card.png" alt="Card Image" width={300} height={150} />
                      <div className="lienter" style={{ width: "100px", height: "4px", position: "absolute", left: "50%", top: "75px", backgroundColor: "red" }}></div>
                    </div>
                  )
                }
              </label>
              <label>
                <input {...register("rarity")} placeholder="Rarity" />
                <button type="button"><EYE_SVG /></button>
              </label>
              <label>
                <input type="number" {...register("fee")} placeholder="Fee" />
                <button
                  style={!activeImage.fee ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }}

                  onClick={() => setActiveImage({ ...activeImage, fee: !activeImage.fee })} type="button"><EYE_SVG /></button>

                {
                  activeImage.fee && (
                    <div className="img--container">
                      <Image src="/img/card.png" alt="Card Image" width={300} height={150} />
                      <div className="lienter" style={{ width: "100px", height: "4px", position: "absolute", left: "50%", top: "56px", backgroundColor: "red" }}></div>
                    </div>
                  )
                }
              </label>
              <label>
                <input {...register("socket")} placeholder="Sockets (W-W-W-W)" />
                {/* <button type="button"><EYE_SVG /></button> */}
              </label>

              <h3>Skills</h3>
              <h5>Quality</h5>
              <label>
                <input {...register("quality")} placeholder="Quality" />
                <button onClick={() => setActiveImage({ ...activeImage, quality: !activeImage.quality })} style={!activeImage.quality ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.quality && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "100px", height: "40px", position: "absolute", left: "32%", top: "23px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <h5>Energy Shield</h5>
              <label>
                <input {...register("energyShield")} placeholder="Energy Shield" />
                <button onClick={() => setActiveImage({ ...activeImage, energyShield: !activeImage.energyShield })} style={!activeImage.energyShield ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>

                {
                  activeImage.energyShield && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "100px", height: "40px", position: "absolute", left: "32%", top: "23px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <h5>Evasion</h5>
              <label>
                <input {...register("evasion")} placeholder="Evasion" />
                <button onClick={() => setActiveImage({ ...activeImage, evasion: !activeImage.evasion })} style={!activeImage.evasion ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.evasion && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "100px", height: "40px", position: "absolute", left: "32%", top: "23px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <h5>Physical Damage</h5>
              <label>
                <input {...register("physicalDamage")} placeholder="Physical Damage" />
                <button onClick={() => setActiveImage({ ...activeImage, physicalDamage: !activeImage.physicalDamage })} style={!activeImage.physicalDamage ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.physicalDamage && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "100px", height: "40px", position: "absolute", left: "32%", top: "23px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <h5>Critical Strike Change</h5>
              <label>
                <input {...register("strikeChange")} placeholder="Strike Change" />
                <button onClick={() => setActiveImage({ ...activeImage, strikeChange: !activeImage.strikeChange })} style={!activeImage.strikeChange ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.strikeChange && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "100px", height: "40px", position: "absolute", left: "32%", top: "23px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <h5>Attack per Seconds</h5>
              <label>
                <input {...register("attackSeconds")} placeholder="Attack Seconds" />
                <button onClick={() => setActiveImage({ ...activeImage, attackSeconds: !activeImage.attackSeconds })} style={!activeImage.attackSeconds ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>

                {
                  activeImage.attackSeconds && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "100px", height: "40px", position: "absolute", left: "32%", top: "23px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <h5>Requires Level</h5>
              <label>
                <input {...register("requiresLevel")} placeholder="Requires Level" />
                <button onClick={() => setActiveImage({ ...activeImage, requiresLevel: !activeImage.requiresLevel })} style={!activeImage.requiresLevel ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.requiresLevel && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "203px", height: "16px", position: "absolute", left: "16%", top: "64px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <h5>Int</h5>
              <label>
                <input {...register("intBuff")} placeholder="Int" />
                <button onClick={() => setActiveImage({ ...activeImage, intBuff: !activeImage.intBuff })} style={!activeImage.intBuff ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.intBuff && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "203px", height: "16px", position: "absolute", left: "16%", top: "64px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <h5>Str</h5>
              <label>
                <input {...register("str")} placeholder="Str" />
                <button onClick={() => setActiveImage({ ...activeImage, str: !activeImage.str })} style={!activeImage.str ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.str && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "203px", height: "16px", position: "absolute", left: "16%", top: "64px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <h5>Armour</h5>
              <label>
                <input {...register("armour")} placeholder="Armour" />
                <button onClick={() => setActiveImage({ ...activeImage, armour: !activeImage.armour })} style={!activeImage.armour ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.armour && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "203px", height: "16px", position: "absolute", left: "16%", top: "64px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <h5>Dex</h5>
              <label>
                <input {...register("dex")} placeholder="Dex" />
                <button onClick={() => setActiveImage({ ...activeImage, dex: !activeImage.dex })} style={!activeImage.dex ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.dex && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "203px", height: "16px", position: "absolute", left: "16%", top: "64px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>


              <label>
                <textarea {...register("buff_0_html")} placeholder="Buff 0" />
                <button onClick={() => setActiveImage({ ...activeImage, buff_0_html: !activeImage.buff_0_html })} style={!activeImage.buff_0_html ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.buff_0_html && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "265px", height: "28px", position: "absolute", left: "5%", top: "85px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>

              <label>
                <textarea {...register("buff_1_html")} placeholder="Buff 1" />
                <button onClick={() => setActiveImage({ ...activeImage, buff_1_html: !activeImage.buff_1_html })} style={!activeImage.buff_1_html ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.buff_1_html && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "265px", height: "28px", position: "absolute", left: "5%", top: "117px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <label>
                <textarea {...register("buff_2_html")} placeholder="Buff 2" />
                <button onClick={() => setActiveImage({ ...activeImage, buff_2_html: !activeImage.buff_2_html })} style={!activeImage.buff_2_html ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.buff_2_html && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "265px", height: "72px", position: "absolute", left: "5%", top: "165px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <label>
                <textarea {...register("buff_white_html")} placeholder="Buff White" />
                <button onClick={() => setActiveImage({ ...activeImage, buff_white_html: !activeImage.buff_white_html })} style={!activeImage.buff_white_html ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.buff_white_html && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "265px", height: "20px", position: "absolute", left: "5%", top: "234px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              
              <label>
                <textarea {...register("buff_gold_html")} placeholder="Buff Gold" />
                <button onClick={() => setActiveImage({ ...activeImage, buff_gold_html: !activeImage.buff_gold_html })} style={!activeImage.buff_gold_html ? { backgroundColor: "rgb(12, 17, 46)" } : { backgroundColor: "rgb(60, 66, 100)" }} type="button"><EYE_SVG /></button>
                {
                  activeImage.buff_gold_html && (
                    <div className="img--container">
                      <Image src="/img/card2.png" alt="Card Image" width={300} height={250} />
                      <div className="lienter" style={{ width: "265px", height: "20px", position: "absolute", left: "5%", top: "149px", border: '1px solid red' }}></div>
                    </div>
                  )
                }
              </label>
              <button className='update-item--btn' type="submit"><span>Update Item</span></button>

            </form>
          </div>
        </div>



      </div>

    </>

  );
}
