"use client"


import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react';
import { Category, ItemWithCategory, ItemWithCategoryAndImage } from '@/app/types/item';
import { CATEGORY_ID } from '@/app/configs/variable';
import { getCategory } from '@/app/api/request/category';
import Card from '../Items/Card/Card';

import "./standart.scss"
import Intro from '../Intro/Intro';
import Header from '../Header/Header';


export default function StandartPage() {
  const [category, setCategory] = React.useState<Category | null>(null);
  const [items, setItems] = useState<ItemWithCategoryAndImage[]>([]);
  const session = useSession();
  const [filteredItems, setFilteredItems] = useState<ItemWithCategory[]>([]);

  const [filter, setFilter] = useState<string>('');
  useEffect(() => {
    setFilteredItems(items);
  }, [filter, items]);

  // const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFilter(event.target.value);
  // };

  useEffect(() => {
    async function fetchDataCategory() {
      const res = await getCategory({ id: CATEGORY_ID.standart });
      setCategory(res.data);
      setItems(res.data.items);
    }
    fetchDataCategory();
  }, []);


  
  return (
    <>
      <Header />
      <Intro title={"STANDART"} section={"standart"} />
      <section className='standart' id='standart'>
        <div className="l-standart">
          {/* <SearchBar filter={filter} handleFilterChange={handleFilterChange} /> */}

          {category && (
            <>
              <h2>{category.title}</h2>
              <div className="cards">
                {filteredItems && (filteredItems as ItemWithCategoryAndImage[]).map((item) => {
                  if (CATEGORY_ID.standart === category.id) {
                    return (
                      <Card
                        item={item}
                        session={session}
                        setFilteredItems={setFilteredItems}
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
