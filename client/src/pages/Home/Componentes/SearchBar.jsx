import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3001/pesquisa', { searchTerm });
      console.log('Dados da pesquisa:', response.data);

      if (response.data.length > 0) {
        const firstResultId = response.data[0]?.id; // Alterado para 'id' em vez de 'ID'
        navigate(`/ponto-turistico/${firstResultId}`);
      } else {
        console.log('Nenhum ponto turístico encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar:', error);
    }
  };
  
  return (
    <div className="search-container">
      <input className='search-input'
        type="text"
        placeholder="Pesquise seus destinos..."
        value={searchTerm}
        onChange={handleChange}
      />
      <FaSearch className='search-icon' onClick={handleSearch} />
      
      <div className='bt-search'>
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
    </div>
  );
};

export default SearchBar;
