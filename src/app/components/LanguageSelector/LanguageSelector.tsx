import React, { useState } from 'react';

import './languageSelector.scss';
import { ARROW_SVG, Kingdom_SVG, Korea_SVG, Russia_SVG } from '../SVG/SVG';


interface IOption {
  id: number;
  label: string;
  svg: React.JSX.Element;
}
export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption>({
    id: 1,
    label: "English",
    svg: <Kingdom_SVG />,
  });

  const options = [
    { id: 1, label: "English", svg: <Kingdom_SVG /> },
    { id: 2, label: "Русский", svg: <Russia_SVG /> },
    { id: 3, label: "한국어", svg: <Korea_SVG /> },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: IOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="select">
      <div
        className="select-selected"
        onClick={toggleDropdown}
      >
        {selectedOption.svg}
        <span className='arrow'>
          <ARROW_SVG />
        </span>
        {/* <span >{selectedOption.label}</span> */}
      </div>
      {isOpen && (
        <div
          className="select-items"
        >
          {options.map((option, index) => {
            if (option.id === selectedOption.id) return null
            return (
              <div
                className='select-item'
                key={index}
                onClick={() => handleOptionClick(option)}

              >
                {option.svg}
                {/* <span>{option.label}</span> */}
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}