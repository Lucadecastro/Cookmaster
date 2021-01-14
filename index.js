require('dotenv').config({ path: '.luca' });
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controller/userController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', (req, res) => {
  userController.createUser(req, res); // ESSE É O CONTROLLER QUE A ROTA VAI CHAMAR
}); // ESSE É O PONTO DE ENTRADA DA SUA APLICAÇÃO

app.post('/login', (req, res) => {
  userController.startLogin(req, res);
});

app.post('/recipes', (req, res) => {
  
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Docking on port ${PORT}`);
});
