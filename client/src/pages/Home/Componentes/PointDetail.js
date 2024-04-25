import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PointDetail = () => {
  const [pointData, setPointData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPointData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/ponto-turistico/${id}`);
        console.log('Dados da resposta:', response.data); // Verificar os dados retornados
        setPointData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do ponto turístico:', error);
        setPointData(null); // Limpar os dados do ponto turístico em caso de erro
      }
    };

    if (id) {
      fetchPointData();
    } else {
      setPointData(null); // Limpar os dados do ponto turístico se o ID for indefinido
    }
  }, [id]);

  if (!pointData) {
    return <p>Nenhum ponto turístico encontrado.</p>;
  }

  const { nome, descricao } = pointData;

  return (
    <div>
      <h2>{nome}</h2>
      <div>
        <p>Descrição: {descricao}</p>
      </div>
    </div>
  );
};

export default PointDetail;
