const JWT = require('jsonwebtoken');

const getSecretKey = () => '5ada8ec1b8752bc7a3b12ec8dd6b52a5285947bf';

const generateJWT = async (payload) => JWT.sign(payload, getSecretKey());

const decodeJWT = async (token) => JWT.verify(token, getSecretKey());

module.exports = { generateJWT, decodeJWT };
