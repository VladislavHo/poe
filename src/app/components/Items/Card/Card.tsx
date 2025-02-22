import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Copy_SVG, { Delete_SVG } from '../../SVG/SVG'
import { deleteItems } from '@/app/api/request/items'
import Notification from '../../Notification/Notification'
import { ItemWithCategory, ItemWithCategoryAndImage } from '@/app/types/item'
import { SessionContextValue } from 'next-auth/react'
import 'poe-item-hover/dist/index.css';
import { ItemHover } from 'poe-item-hover';
import Socket from '../../Sockets/Socet/Socket'
import "./card.scss"


interface CardProps {
  item: ItemWithCategoryAndImage;
  session: SessionContextValue;
  setFilteredItems: React.Dispatch<React.SetStateAction<ItemWithCategory[]>>;
}




export default function Card({ item, session, setFilteredItems }: CardProps) {
  const [hovered, setHovered] = useState(false);
  const [isCopied, setIsCopied] = useState({
    POB: false,
    WHISPER: false
  });

  const [success, setSuccess] = useState({
    open: false,
    message: "",
    error: false
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied((prevIsCopied) => ({
        ...prevIsCopied,
        [text]: true,
      }));

      setTimeout(() => {
        setIsCopied((prevIsCopied) => ({
          ...prevIsCopied,
          [text]: false,
        }));
      }, 2000);

      if (isCopied.POB && isCopied.WHISPER) {
      }
      setSuccess({ message: `Copied to clipboard`, error: false, open: true });
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess({ message: "", error: false, open: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, [success.open]);


  return (
    <>
      {success.open &&
        <Notification
          open={success.open}
          message={success.message}
          error={success.error} />}
      <div className='card' key={item.id}>
        {session.status === "authenticated" && (
          <div className="btn--controller">

            <button className='delete' onClick={() => {
              deleteItems(item?.id).then((res) => {
                if (res.status === 200) {
                  setSuccess({ message: "Item deleted", error: false, open: true });
                  setFilteredItems((prevItems: ItemWithCategory[]) => prevItems.filter((i) => i.id !== item.id));
                } else {
                  setSuccess({ message: "Error while deleting", error: true, open: true });
                }
              })
            }}>
              <Delete_SVG />
            </button>
          </div>
        )}

        <div className="description">
          {hovered && <ItemHover itemData={`${item.description}`} />}

        </div>

        <div
          className="card-image--container"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >



          {hovered && <Socket sockets={`${item.sockets?.toUpperCase()}`} />}
          

          <Image
            src={`/uploads/${item?.image?.name}`}
            alt={"Logo"}

            width={65}
            height={45}
          />
        </div>

        <div className="card-info">
          <div className="card-info--name">
            <h3 className='name'>{item.name}</h3>
            <h4 className='supname'>{item.subname}</h4>
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
            <button className='pob' onClick={() => copyToClipboard(item?.description ?? '')}><span>POB</span> <Copy_SVG /></button>
            <button className='whisper' onClick={() => copyToClipboard(`@EchoShop Hi, I'd like to mirror `)}><span>WHISPER</span><Copy_SVG /></button>
          </div>
        </div>
      </div>

    </>
  )
}
