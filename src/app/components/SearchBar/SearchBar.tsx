import React  from 'react';
import './search_bar.scss'; 


const SearchBar = ({ handleFilterChange, filter }: {filter: string , handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void}) => {

  const handleFocus = (event: { target: { style: { width: string; cursor: string; }; }; }) => {
    event.target.style.width = '100%';
    event.target.style.cursor = 'text';
  };

  const handleBlur = (event: { target: { style: { width: string; }; }; }) => {
    if (filter.length === 0) {
      event.target.style.width = '0';
    }
  };

  return (
    <div className="search-container">
      <input
        type="search"
        id="s"
        value={filter}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default SearchBar;