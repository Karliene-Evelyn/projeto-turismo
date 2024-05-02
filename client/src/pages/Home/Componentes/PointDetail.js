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
        setPointData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do ponto turístico:', error);
        setPointData(null);
      }
    };

    if (id) {
      fetchPointData();
    } else {
      setPointData(null);
    }
  }, [id]);

  if (!pointData) {
    return <p>Nenhum ponto turístico encontrado.</p>;
  }

  const { nome, descricao, horario, imagens, servicos, avaliacoes } = pointData;

  return (
    <div className='container-ponto'>
      <div className='imagens-grid'>
        {imagens && imagens.map((imagem, index) => (
          <img key={index} src={imagem.caminho_da_imagem} alt={imagem.nome_da_imagem} className='imagem-item' />
        ))}
      </div>

      <div className='detalhes-pontos'>
        <div className='nome'>{nome}</div>
        <div>
          <div className='descricao'>{descricao}</div>
          <div className='horario'>Horário: {horario}</div>
        </div>

        <div className='servicos'>
          <p>Serviços Disponíveis:</p>
          <ul>
            {servicos && servicos.map((servico, index) => (
              <li key={index}>{servico.nome}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PointDetail;
