// const { Router } = require('express');
const userModel = require('../model/userModel');
const validationService = require('../service/validationService');
const authenticator = require('../service/authenticator');

const createUser = async (req, res) => {
  validationService.validateNewUser(req, res); // O CONTROLLER SÓ CONTROLA
  const { name, email, password } = req.body;
  const newUser = await userModel.createUser(name, email, password);
  res.status(201).json({ user: newUser });
};

const startLogin = async (req, res) => {
  validationService.validateLogin(req, res);
  console.log('Console log passou aqui');
  const { email, password } = req.body;
  try {
    const loggedUser = await userModel.findByLogin(email, password);
    const payload = {
      id: loggedUser._id,
      email: loggedUser.email,
      role: loggedUser.role,
    };
    res.status(200).json({ token: await authenticator.generateJWT(payload) });
  } catch (err) {
    res.status(400).json({ message: 'Login not completed', error: err });
  }
};

// const routers = Router();

// routers.post('/', async (req, res) => {
//   validationService.validateNewUser(req, res);
//   const { name, email, password } = req.body;
//   const newUser = await userModel.createUser(name, email, password);
//   if (!newUser) return res.status(400).json({ message: 'Cannot create User' });
//   return res.status(201).json(newUser);
// });

module.exports = { createUser, startLogin };
