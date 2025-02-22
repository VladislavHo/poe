"use client";

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { CategoryWithItems, Item, ItemWithCategory, ItemWithCategoryAndImage } from '@/app/types/item';
import { getCategorys } from '@/app/api/request/category';
import Card from './Card/Card';
import { getItems } from '@/app/api/request/items';

import "./items.scss"
import SearchBar from '../SearchBar/SearchBar';
import Dropdown from '../Filter/Dropdown';




export default function Items() {
  const session = useSession();
  const [items, setItems] = useState<ItemWithCategory[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemWithCategory[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [isCategory, setIsCategory] = useState(false);
  const [categoryItems, setCategoryItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);







  useEffect(() => {
    getItems().then((res) => {
      setItems(res.data);
      setFilteredItems(res.data);

    });

    getCategorys().then((res) => {
      setCategoryItems(res.data);
    })
  }, []);


  useEffect(() => {


    setIsCategory(true);
  }, [items]);

  useEffect(() => {
    const results = items.filter((item: Item) =>
      item?.name.toLowerCase().includes(filter.toLowerCase()) ||
      (item.subname && item.subname.toLowerCase().includes(filter.toLowerCase()))
    );
    setFilteredItems(results);
  }, [filter, items]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);

  };





  return (
    <>
      <section className='main' id='main'>
        <div className="l-main">
          <div className="main-header--container">



            <SearchBar filter={filter} handleFilterChange={handleFilterChange} />


            <div className="sort">
              <div className="sort--container">

                <Dropdown setIsCategory={setIsCategory} categoryItems={categoryItems} setSelectedItems={setSelectedItems} selectedItems={selectedItems} />
              </div>
            </div>
          </div>

          <div className="cards" style={selectedItems.length <= 0 ? { display: "grid" } : {display: "block"}}>
            {
              selectedItems.length <= 0 ?
                <>
                  {filteredItems && (filteredItems as ItemWithCategoryAndImage[]).map((item) => (
                    <Card
                      item={item}
                      session={session}
                      setFilteredItems={setFilteredItems}
                      key={item.id}
                    />
                  ))}
                </> :
                <div className='cards--sort'>


                  {selectedItems.map((selectItem) => {
                    const items = filteredItems.filter(item => selectItem === item.category.title);

                    return (
                      <>
                        <h3>{selectItem}</h3>
                        <div className='filter--card' key={selectItem}>
                          {items.map(itm => (
                            <Card
                              item={itm}
                              session={session}
                              setFilteredItems={setFilteredItems}
                              key={itm.id}
                            />
                          ))}
                        </div>
                      </>

                    );
                  })}

                </div>
            }

          </div>
        </div>

      </section >
    </>
  );

}
