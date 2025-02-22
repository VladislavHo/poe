import React, { useState, useEffect, useRef } from 'react';
import './dropdown.scss';
import { ARROW_SVG, Close_SVG } from '../SVG/SVG';

interface IDropdownProps {
  categoryItems: any[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  selectedItems: string[];

}

const Dropdown = ({ categoryItems, setSelectedItems, selectedItems }: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);


  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (category) => {
    setSelectedItems(prev => {
      if (prev.includes(category.title)) {
        return prev.filter(item => item !== category.title);
      } else {
        return [...prev, category.title];
      }
    });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <dl className="dropdown" ref={dropdownRef}>
      <dt>
        <button className='select_categories' onClick={toggleDropdown}>

          {selectedItems.length > 0 ? (
            <div className="selected--items">
              {
                selectedItems.map(item => (
                  <div className="item" key={item}>
                    <div className='selected'>
                      <span className='selected--item'>{item}</span>
                      <span className='close--item' onClick={() => {
                        setSelectedItems(prev => prev.filter(itm => itm !== item));
                      }}><Close_SVG /></span>
                    </div>

                  </div>
                ))
              }
            </div>

          ) : (

            <span className='placeholder'>Select group types</span>
          )}
          <div className="dropdown--control">
            {
              !!selectedItems.length && (
                <span className='close--items' onClick={() => {
                  setSelectedItems([])
                }}><Close_SVG /></span>
              )
            }
            <span className='arrow'>
              <ARROW_SVG />
            </span>
          </div>
        </button>
      </dt>
      <dd>
        {isOpen && (
          <div className="multiSelect">
            <ul>
              {categoryItems.map((option) => (
                <li key={option.id + option.title}>
                  <label>
                    <input
                      type="checkbox"
                      value={option.title}
                      onChange={() => handleCheckboxChange(option)}
                      checked={selectedItems.includes(option.title)}
                    />
                    <span>{option.title}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </dd>
    </dl>
  );
};

export default Dropdown;