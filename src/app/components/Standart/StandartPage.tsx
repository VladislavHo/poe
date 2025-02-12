"use client"


import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react';
import { Item, ItemWithCategory, ItemWithCategoryAndImage } from '@/app/types/item';
import { CATEGORY_ID } from '@/app/configs/variable';
import { getCategory } from '@/app/api/request/category';
import Card from '../Items/Card/Card';

import "./standart.scss"
import Intro from '../Intro/Intro';
import Header from '../Header/Header';
interface ICategory {
  id: string;
  title: string;
}
export default function StandartPage() {
  const [category, setCategory] = React.useState<ICategory | null | undefined>(null);
  const [items, setItems] = useState<ItemWithCategoryAndImage[]>([]);
  const session = useSession();
  const [filteredItems, setFilteredItems] = useState<ItemWithCategory[]>([]);

  const [hoveredItemId, setHoveredItemId] = useState<string | null | undefined>(null);
  const [filter, setFilter] = useState<string>('');
  useEffect(() => {
    const results = items.filter((item: Item) =>
      item?.name.toLowerCase().includes(filter.toLowerCase()) ||
      (item.supname && item.supname.toLowerCase().includes(filter.toLowerCase()))
    );
    setFilteredItems(results);
  }, [filter, items]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    async function fetchDataCategory() {
      const res = await getCategory({ id: CATEGORY_ID.standart });
      setCategory(res.item);
      setItems(res.item.items);
    }
    fetchDataCategory();
  }, []);

  return (
    <>
      <Header />
      <Intro />
      <section className='standart'>
        <div className="l-standart">
          <form>
            <input onChange={handleFilterChange} value={filter} type="text" />
            <button type='button' className='search--btn'><span>Ok</span></button>
          </form>
          {category && (
            <>
              <h2>{category.title}</h2>
              <div className="cards">
                {filteredItems && (filteredItems as ItemWithCategoryAndImage[]).map((item) => {
                  if (item.category.id === category.id) {
                    return (
                      <Card
                        item={item}
                        session={session}
                        setHoveredItemId={setHoveredItemId}
                        setFilteredItems={setFilteredItems}
                        hoveredItemId={hoveredItemId}
                        key={item.id}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </>
          )}
        </div>

      </section>
    </>
  );
}
