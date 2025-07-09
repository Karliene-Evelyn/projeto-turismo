import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryComponent = ({ match }) => {
  const [categoryPoints, setCategoryPoints] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryPoints = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/ponto-turistico/categoria/${match.params.nomeCategoria}`);
        setCategoryPoints(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchCategoryPoints();
  }, [match.params.nomeCategoria]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Pontos Turísticos da Categoria: {match.params.nomeCategoria}</h2>
      <ul>
        {categoryPoints.map(point => (
          <li key={point.id}>
            <a href={`/ponto-turistico/${point.id}`}>{point.nome}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryComponent;
