// SearchBar.jsx
import React from 'react';

function SearchBar({ className }) {
  return (
    <input
      type="text"
      placeholder="Pesquise seus locais..."
      className={className}
    />
  );
}

export default SearchBar;
