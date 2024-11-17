import React from 'react';
import './SearchBar.css';

const SearchBar = ({ query, onQueryChange, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        placeholder="Search by title, author, or genre..."
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
