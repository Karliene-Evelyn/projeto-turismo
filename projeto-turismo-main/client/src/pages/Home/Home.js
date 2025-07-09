import React, { useState } from 'react';
import SearchBar from './Componentes/SearchBar';
import PointDetail from './Componentes/PointDetail';
import './style-home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [pointId, setPointId] = useState(null);
  const [pontosTuristicos, setPontosTuristicos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePointIdUpdate = (id) => {
    setPointId(id);
  };

  const handleCategoryClick = async (categoriaSelecionada) => {
    try {
      const response = await axios.get(`http://localhost:3001/ponto-turistico/categoria/${categoriaSelecionada}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar pontos turísticos por categoria.');
      }
  
      const data = response.data;
      if (data.length === 0) {
        console.log('Nenhum ponto turístico encontrado para a categoria:', categoriaSelecionada);
        return; 
      }
  
      setPontosTuristicos(data);
  
      if (data.length > 0) {
        const firstResultId = data[0].id; 
        navigate(`/ponto-turistico/${firstResultId}`, { state: { images: data[0].images } }); 
      }
    } catch (error) {
      console.error('Erro ao buscar pontos turísticos por categoria:', error);
      
    }
  };

  return (
    <div className="home-page">
      <h1>Desfrute de uma jornada com o máximo de conforto.</h1>
      <div className='search'>
        <SearchBar />
      </div>
  
      {pointId && <PointDetail id={pointId} />}
      

    </div>
  );
};

export default Home;

