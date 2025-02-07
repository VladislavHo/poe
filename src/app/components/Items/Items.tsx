"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react'
import Copy_SVG, { Delete_SVG, Edit_SVG } from '../SVG/SVG';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import { deleteItems, getItems } from '@/app/api/request/items';
import "./items.scss"

export default function Items() {
  const session = useSession();
  const [items, setItems] = useState<any>([]);
  const [filteredItems, setFilteredItems] = useState<any>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    getItems().then((res) => {
      setItems(res.items);
      setFilteredItems(res.items);
    })
  }, []);

  useEffect(() => {
    // Фильтрация элементов по имени и супер имени
    const results = items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.supname.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredItems(results);
  }, [filter, items]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFilter(event.target.value);
  };
  return (

    <>
      <section className='main'>
        <form>
          <input
            onChange={handleFilterChange} value={filter} type="text" />
          <button type='button' className='search--btn'><span>Ok</span></button>
        </form>
        <div className="cards">
          {
            filteredItems && filteredItems.map((item: any) => (
              <div className='card' key={item.id}>
                {
                  session.status === "authenticated" && (
                    <div className="btn--controller">
                      <button type='button' className='edit' onClick={() => { redirect(`/dashboard/edit-item/${item.id}`) }}>
                        <Edit_SVG />
                      </button>
                      <button className='delete' onClick={() => deleteItems(item.id)}>
                        <Delete_SVG />
                      </button>
                    </div>
                  )
                }

                <div className="card-image--container">
                  <Image
                    src={`/uploads/${item.image.name}`}
                    alt={item.name}
                    layout="auto"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="card-info">
                  <div className="card-info--name">
                    <h3 className='name'>{item.name}</h3>
                    <h4 className='supname'>{item.supname}</h4>

                  </div>
                  <div className="card-info--fee">
                    <p className='card-info--fee-text'>fee: <span>{item.fee}</span> <Image src="/img/fee.webp" alt="Logo" width={20} height={20} /></p>

                  </div>
                  <div className="card-info--class">
                    <p className='item-class--text'>{item.itemClass}</p>
                    <p className='short--text'>{item.shortDescription}</p>

                  </div>
                  <div className="card-info--owner">
                    <p className='owner--text'>Owner</p>
                    <p className='owner--name'>{item.owner}</p>
                  </div>
                  <div className="card-info--btn">
                    <button className='pob'><span>POB</span> <Copy_SVG /></button>
                    <button className='whisper'><span>WHISPER</span><Copy_SVG /></button>
                  </div>
                </div>

              </div>
            ))
          }
        </div>
      </section>


    </>
  )
}
