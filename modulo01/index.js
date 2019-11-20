const express = require("express");

const server = express();

server.use(express.json());

const users = ["Gabriel", "Diego", "Pedro", "Victor", "José"];

//Middleware -  é um interceptador
server.use((req, res, next) => {
  console.time("Request");
  console.log("A requisição foi chamada!");
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next(); //continuar executando os próximos middleware abaixo

  console.timeEnd("Request"); //tempo da requisição
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User not found on request body." });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.id];
  if (!user) {
    return res.status(400).json({ error: "User does not exist." });
  }

  req.user = user;

  return next();
}

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
server.get("/user/:id", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

//Criação de um novo usuário
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//Edição de um usuário já cadastrado
server.put("/user/:id", checkUserExists, checkUserInArray, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  users[id] = name;
  return res.json(users);
});

//Deletar um usuário
server.delete("/user/:id", checkUserInArray, (req, res) => {
  const { id } = req.params;

  users.splice(id, 1);

  return res.send();
});

server.listen(3000);
