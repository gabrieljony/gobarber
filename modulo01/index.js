const express = require("express");

const server = express();

server.use(express.json());

const users = ["Gabriel", "Diego", "Pedro", "Victor", "José"];

//Query params = ?teste=1
//Route params = /users/1
//Request boby = { "name": "Gabriel", "email": "gabriel_jony@hotmail.com"}

server.get("/teste", (req, res) => {
  const nome = req.query.nome;
  return res.json({ message: `Hello ${nome}!` });
});

//CRUD - Create, Read, Update, Delete

//Busca por todos usuários
server.get("/users", (req, res) => {
  return res.json(users);
});

//Busca por usuário, passando como parâmetro o id
server.get("/user/:id", (req, res) => {
  const { id } = req.params;
  return res.json(users[id]);
});

//Criação de um novo usuário
server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//Edição de um usuário já cadastrado
server.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  users[id] = name;
  return res.json(users);
});

//Deletar um usuário
server.delete("/user/:id", (req, res) => {
  const { id } = req.params;

  users.splice(id, 1);

  return res.send();
});

server.listen(3000);
