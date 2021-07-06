//importation des modules d'extension
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//application Express
const app = express();

//connexion à la BDD
mongoose.connect('mongodb+srv://adminSoPekocko:adminSoPassword@cluster0.f4gxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//correction des erreurs de CORS avec ajout de headers dans les réponses
app.use((req, res, next) => 
{
  //accéder à notre API depuis n'importe quelle origine *
  res.setHeader('Access-Control-Allow-Origin', '*');
  //ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin, X-Requested-With ...)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //envoyer des requêtes avec les méthodes mentionnées (GET, POST, ...)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//analyse du corps et formatage des requêtes provenant du frontend 
app.use(bodyParser.json());

//chargement des routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


//export de l'application
module.exports = app;