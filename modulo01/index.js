const express = require("express");

const server = express();

//Query params = ?teste=1
//Route params = /users/1
//Request boby = { "name": "Gabriel", "email": "gabriel_jony@hotmail.com"}

server.get("/teste", (req, res) => {
  const nome = req.query.nome;
  return res.json({ message: `Hello ${nome}!` });
});

server.get("/user/:id", (req, res) => {
  const { id } = req.params;
  return res.json({ message: `Buscando o usuário ${id}` });
});

server.listen(3000);
