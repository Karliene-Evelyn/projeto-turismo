import '../Home/style-home.css';

const home = () => {
  
  return (
    <div className='container'>
      
      <h1 className='titulo'>Desfrute de uma jornada com o máximo de conforto.</h1>
      
      <div className='search-btn'>
      <input 
        type="text" 
        placeholder="Pesquise seus destinos..."
    
      />
      <button className='button' type='submit'>Procurar</button>
      </div>
      1
      
      <div>
      
      </div>
      
      <h2>Lugares mais Procurados</h2>
      <ul>
        <li>Praia de Copacabana</li>
        <li>Balneário Camboriú</li>
        <li>Cachoeira da Fumaça</li>
      </ul>
    </div>
  );
}

export default home;