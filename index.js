const express = require("express");
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
let groceries = []

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PATCH, POST, GET, DELETE');
  next();
});

app.post('/groceries', function (req, res) {
  const newItem = {
    id: uuidv4(),
    name: req.body.name,
    ready: req.body.ready
  }
  groceries.push(newItem);
  res.send(newItem);
});

app.get('/groceries', function (req, res) {
  res.send(groceries);
});

app.patch('/groceries', function (req, res) {
  const id = req.body.id;
  let ready = false;
  groceries = groceries.map(item => { 
    if (item.id === id) {
      item.ready = !item.ready
      ready = item.ready
    }
  
    return item
  })
  res.send({ id, ready });
});

app.delete('/groceries/:id', function (req, res) {
  const id = req.params.id;
  groceries = groceries.filter(item => item.id !== id)
  res.send({ id });
});

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});