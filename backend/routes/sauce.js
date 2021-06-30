const express = require('express');

//routeur Express
const router = express.Router();

//import du controleur
const sauceCtrl = require('../controllers/sauce');


//application des controleurs dans les routes CRUD correspondantes
router.post('/', sauceCtrl.create);

router.post('/:id/like', sauceCtrl.like);

router.put('/:id', sauceCtrl.update);

router.delete('/:id', sauceCtrl.delete);

/* router.get('/:id', sauceCtrl.readOne); */

router.get('/', sauceCtrl.readAll);



module.exports = router;