import React from 'react';
import './buff.scss'; // Убедитесь, что путь правильный
import { ItemWithId } from '@/app/types/item';


const styleTextBlue: React.CSSProperties = {
  color: 'rgb(119, 133, 255)',
  fontSize: '0.8rem',
  textTransform: 'none',
  letterSpacing: '1.5px',
  textAlign: 'center',
};

const styleTextGold: React.CSSProperties = {
  color: 'rgb(255, 253, 119)',
  fontSize: '0.8rem',
  textTransform: 'none',
  letterSpacing: '1.5px',
  textAlign: 'center',
};

const styleTextBlueWhite: React.CSSProperties = {
  color: 'rgb(180, 187, 255)',
  fontSize: '0.8rem',
  textTransform: 'none',
  letterSpacing: '1.5px',
  textAlign: 'center',
};
const Buff = ({ item }: {item: ItemWithId}) => {

  return (
    <div className='buff'>
      <div className="title">
        <h3>{item.name}</h3>
        <p>{item.supname}</p>
      </div>
      <div className="number--buff">
        {item.quality && (
          <p>Quality: <span>{item.quality}</span></p>
        )}


        {
          item.armour && (
            <p>Armour: <span>{item.armour}</span></p>
          )
        }
        {item.physicalDamage && (
          <p>Physical Damage: <span>{item.physicalDamage}</span></p>
        )}
        {item.strikeChange && (
          <p>Critical Strike Chance: <span>{item.strikeChange}</span></p>
        )}
        {item.attackSeconds && (
          <p>Attacks per Second: <span>{item.attackSeconds}</span></p>
        )}
        {
          item.energyShield && (
            <p>Energy Shield: <span>{item.energyShield}</span></p>
          )
        }

        {
          item.evasion && (
            <p>Evasion: <span>{item.evasion}</span></p>
          )
        }

      </div>
      <div className="liener"></div>
      <div className="lvl--buff">
        {
          item.requiresLevel && (
            <p>Requires Level: <span>{item.requiresLevel}</span></p>
          )
        }


        {
          item.intBuff && (
            <p>Int: <span>{item.intBuff}</span></p>
          )
        }


        {
          item.str && (
            <p>Str: <span>{item.str}</span></p>
          )
        }


        {
          item.dex && (
            <p>Dex: <span>{item.dex}</span></p>
          )
        }

      </div>
      {item.buff_0_html && (
        <>
          <div className="liener"></div>
          {item.buff_0_html.split('\n').map((item: string, index: number) => <p style={styleTextBlueWhite} className='buff--text-1' key={index}>{item}</p>)}
        </>
      )}
      <div className="liener"></div>
      {
        item.buff_1_html && item.buff_1_html.split('\n').map((item: string, index: number) => <p style={styleTextBlue} className='buff--text-1' key={index}>{item}</p>)
      }

      <div className="liener"></div>
      {
        item.buff_gold_html && item.buff_gold_html.split('\n').map((item: string, index: number) => <p style={styleTextGold} className='buff--text-3' key={index}>{item}</p>)
      }
      {
        item.buff_2_html && item.buff_2_html.split('\n').map((item: string, index: number) => <p style={styleTextBlue} className='buff--text-2' key={index}>{item}</p>)
      }
      {
        item.buff_white_html && item.buff_white_html.split('\n').map((item: string, index: number) => <p style={styleTextBlueWhite} className='buff--text-3' key={index}>{item}</p>)
      }
    </div>
  );
};

export default Buff;


