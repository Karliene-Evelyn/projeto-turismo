import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryComponent = ({ categoryId, categoryName, updatePoints }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/categoria/${categoryId}`);
    updatePoints(categoryId); // Chama a função de atualização de pontos turísticos no componente pai
  };

  return (
    <div className="category" onClick={handleClick}>
      <span>{categoryName}</span>
    </div>
  );
};

export default CategoryComponent;
