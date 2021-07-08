//import du module express
const express = require('express');

//lancement du routeur Express
const router = express.Router();

//import du controleur user
const userCtrl = require('../controllers/user');


//application des controleurs dans les routes d'authentification correspondantes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);



module.exports = router;