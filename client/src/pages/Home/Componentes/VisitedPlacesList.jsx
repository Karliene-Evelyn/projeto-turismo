// VisitedPlacesList.jsx
import React from 'react';

function VisitedPlacesList({ places, className }) {
  return (
    <ul className={className}>
      {places.map((place, index) => (
        <li key={index}>
          <img src={place.image} alt={place.name} />
          <span>{place.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default VisitedPlacesList;
    