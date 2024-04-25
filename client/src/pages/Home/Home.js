import React, { useState } from 'react';
import SearchBar from './Componentes/SearchBar';
import PointDetail from './Componentes/PointDetail';
import CategoryComponent from './Componentes/CategoryComponent';
import './style-home.css';

const Home = () => {
  const [pointId, setPointId] = useState(null);

  const handlePointIdUpdate = (id) => {
    setPointId(id);
  };

  const updatePointsByCategory = async (categoryId) => {
    try {
      const response = await fetch(`/ponto-turistico/categoria/${categoryId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar pontos turísticos por categoria.');
      }
      const data = await response.json();
      console.log(data); // Verifique se os dados dos pontos turísticos são recebidos corretamente da API
      // Atualize o estado dos pontos turísticos com os dados recebidos da API
      // setPontosTuristicos(data);
    } catch (error) {
      console.error(error);
      // Trate o erro adequadamente
    }
  };
  

  return (
    <div className="home-page">
      <h1>Desfrute de uma jornada com o máximo de conforto.</h1>
      <div className='search'>
        <SearchBar />
      </div>
  
      {pointId && <PointDetail id={pointId} />}
      
      <div>
        <CategoryComponent categoryId={1} categoryName="Praias" updatePoints={updatePointsByCategory} />
        <CategoryComponent categoryId={2} categoryName="Balneários" updatePoints={updatePointsByCategory} />
        <CategoryComponent categoryId={3} categoryName="Cachoeiras" updatePoints={updatePointsByCategory} />
      </div>
    </div>
  );
};

export default Home;
