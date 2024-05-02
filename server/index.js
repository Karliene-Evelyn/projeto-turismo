const express = require("express");
const app = express();
const { Pool } = require('pg'); 
const cors = require('cors');


  const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'DescubraStm-DB',
      password: '1234',
      port: 5432 // Default port for PostgreSQL
    });


  app.use(express.json());
  app.use(cors()); 

app.get("/ponto-turistico/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const pontoTuristico = await pool.query('SELECT * FROM PontoTuristico WHERE id = $1', [id]);

    if (pontoTuristico.rows.length === 0) {
      res.status(404).json({ msg: "Ponto turístico não encontrado." });
      return;
    }

    const pontoTuristicoData = pontoTuristico.rows[0];

    const imagens = await pool.query('SELECT * FROM Imagem WHERE IDPonto = $1', [id]);
    const imagensDoPonto = imagens.rows;

    const servicos = await pool.query('SELECT s.* FROM Servico s INNER JOIN PontoTuristicoServico pts ON s.ID = pts.IDServico WHERE pts.IDPonto = $1', [id]);
    const servicosDoPonto = servicos.rows;

    const avaliacoes = await pool.query('SELECT * FROM Avaliacao WHERE IDPonto = $1', [id]);
    const avaliacoesDoPonto = avaliacoes.rows;

    const pontoTuristicoComInfo = {
      ...pontoTuristicoData,
      imagens: imagensDoPonto,
      servicos: servicosDoPonto,
      avaliacoes: avaliacoesDoPonto
    };

    res.json(pontoTuristicoComInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao buscar detalhes do ponto turístico." });
  }
});



  app.post("/pesquisa", async (req, res) => {
    const searchTerm = req.body.searchTerm;
  
    try {
      // Alterado para corresponder ao nome da tabela e à coluna corretos
      const resultados = await pool.query('SELECT ID, nome, descricao, horario, idcategoria FROM PontoTuristico WHERE nome ILIKE $1', [`%${searchTerm}%`]);
      res.json(resultados.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar resultados da pesquisa." });
    }
  });
  

  app.post("/cadastro", async (req, res) => { // Using async/await for cleaner error handling
    const email = req.body.email;
    const password = req.body.password;

    try {
      // Check for existing user
      const checkUser = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);

      if (checkUser.rows.length === 0) {
        // Insert new user if not found
        const newUser = await pool.query('INSERT INTO usuario (email, password) VALUES ($1, $2)', [email, password]);
        res.send({ msg: "Cadastrado com sucesso!" });
      } else {
        res.send({ msg: "Usuario ja cadastrado." });
      }
    } catch (err) {
      console.error(err);
      res.send({ msg: "Erro ao processar cadastro." }); // Generic error message
    }
  });

  app.post("/login", async (req, res) => {
      const email = req.body.email;
      const password = req.body.password;

      try {
          // Verificar se o usuário existe com o email e senha fornecidos
          const loginUser = await pool.query('SELECT * FROM usuario WHERE email = $1 AND password = $2', [email, password]);

          if (loginUser.rows.length === 1) {
              // Se o usuário existir, enviar uma resposta de sucesso
              res.send({ msg: "Login bem-sucedido!" });
          } else {
              // Se o usuário não existir ou as credenciais estiverem incorretas, enviar uma mensagem de erro
              res.send({ msg: "Credenciais inválidas. Verifique seu email e senha." });
          }
      } catch (err) {
          console.error(err);
          res.send({ msg: "Erro ao processar o login." }); 
      }
  });


  app.listen(3001, () => {
    console.log("Rodando na porta 3001");
  });