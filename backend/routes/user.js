//import du module express
const express = require('express');

//lancement du routeur Express
const router = express.Router();

//import du controleur user
const userCtrl = require('../controllers/user');


const rateLimit = require("express-rate-limit");
//4 possibilite de se connecter, toutes les 15 min
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limite de 5 tentatives
    message:
      "Tentatives de connexion trop nombreuse, veuillez réessayer dans 15 min"
  });

//application des controleurs dans les routes d'authentification correspondantes
router.post('/signup', userCtrl.signup);
router.post('/login', limiter, userCtrl.login);



module.exports = router;