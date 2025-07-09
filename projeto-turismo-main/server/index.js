const express = require("express");
const app = express();
const { Pool } = require('pg'); 
const cors = require('cors');
const cookieParser = require("cookie-parser");

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'DescubraStm-DB',
  password: '1234',
  port: 5432
});

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM usuario WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 1) {
      
      res.cookie('usuarioLogado', email, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false
      });

      res.send({ msg: "Login bem-sucedido!" });
    } else {
      res.send({ msg: "Credenciais inválidas." });
    }
  } catch (err) {
    console.error(err);
    res.send({ msg: "Erro ao processar o login." });
  }
});


app.get("/verificar-login", (req, res) => {
  const usuario = req.cookies.usuarioLogado;
  if (usuario) {
    res.send({ logado: true });
  } else {
    res.send({ logado: false });
  }
});


app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});
