//import du module express
const express = require('express');

//routeur Express
const router = express.Router();

//import du controleur pour la gestion des sauces
const sauceCtrl = require('../controllers/sauce');

//import du middleware d'authentification
const auth = require('../middleware/auth');


//application des controleurs dans les routes CRUD correspondantes avec protection (argument auth)
router.post('/', auth, sauceCtrl.create);
router.post('/:id/like', auth, sauceCtrl.like);
router.put('/:id', auth, sauceCtrl.update);
router.delete('/:id', auth, sauceCtrl.delete);
router.get('/:id', auth, sauceCtrl.readOne);
router.get('/', auth, sauceCtrl.readAll);



module.exports = router;