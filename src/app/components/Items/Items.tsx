"use client";

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { CategoryWithItems, Item, ItemWithCategory, ItemWithCategoryAndImage } from '@/app/types/item';
import { getCategorys } from '@/app/api/request/category';
import Card from './Card/Card';
import { getItems } from '@/app/api/request/items';

import "./items.scss"




export default function Items() {
  const session = useSession();
  const [items, setItems] = useState<ItemWithCategory[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemWithCategory[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [hoveredItemId, setHoveredItemId] = useState<string | null | undefined>(null); // Используем id для отслеживания ховера
  const [isCategory, setIsCategory] = useState(false);
  const [category, setCategory] = useState([]);





  useEffect(() => {
    getItems().then((res) => {
      setItems(res.items);
      setFilteredItems(res.items);
      getCategorys().then((res) => setCategory(res.items));
    });
  }, []);


  useEffect(() => {
    const itemsByCategory = items.filter((item) => item?.categoryId === hoveredItemId);
    setFilteredItems(itemsByCategory);
    setIsCategory(true);
  }, [items]);

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




  return (
    <>
      <section className='main'>
        <div className="l-main">
          <div className="main-header--container">
            <form>
              <input onChange={handleFilterChange} value={filter} type="text" />
              <button type='button' className='search--btn'><span>Ok</span></button>
            </form>

            <div className="sort">
              <div className="sort--container">
                <label htmlFor="sort--category"><p>Sort by type</p>
                  <input onChange={() => setIsCategory(!isCategory)} type="checkbox" name="category" id="sort--category" />
                </label>
              </div>
            </div>
          </div>

          <div className="cards" style={!isCategory ? { display: "flex", flexDirection: "column", gap: '30px' } : {}}>
            {
              isCategory ?
                <>
                  {filteredItems && (filteredItems as ItemWithCategoryAndImage[]).map((item) => (
                    <Card
                      item={item}
                      session={session}
                      setHoveredItemId={setHoveredItemId}
                      setFilteredItems={setFilteredItems}
                      hoveredItemId={hoveredItemId}
                      key={item.id}
                    />
                  ))}
                </> :
                <>



                  {category && category.map((categoryItem: CategoryWithItems) => {

                    const hasItems: boolean = filteredItems.some((item: ItemWithCategory) => item?.category?.id === categoryItem?.id);

                    if (categoryItem.id === "11") return null
                    return (
                      <div className="cards-sort--container" key={categoryItem.id}>
                        {hasItems && <h3>{categoryItem.title}</h3>}

                        <div className="cards--sort">
                          {filteredItems && (filteredItems as ItemWithCategoryAndImage[]).map((item) => {
                            if (item.category.id === categoryItem.id) {
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
                      </div>
                    );
                  })}

                </>
            }

          </div>
        </div>

      </section >
    </>
  );

}
