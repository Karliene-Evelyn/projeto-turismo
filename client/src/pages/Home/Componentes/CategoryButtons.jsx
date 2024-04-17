// CategoryButtons.jsx
import React from 'react';

function CategoryButtons({ categories }) {
  return (
    <div>
      {categories.map((category, index) => (
        <button key={index}>
          <img src={category.image} alt={category.name} />
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryButtons;
