const express = require("express");
const app = express();
const { Pool } = require('pg'); 
const cors = require('cors');

// Configure PostgreSQL connection details
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'DescubraStm-DB',
    password: '1234',
    port: 5432 // Default port for PostgreSQL
  });

app.use(express.json());
app.use(cors());

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
        res.send({ msg: "Erro ao processar o login." }); // Mensagem de erro genérica
    }
});


app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});
