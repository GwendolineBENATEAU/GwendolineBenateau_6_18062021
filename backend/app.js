//import express
const express = require('express');
//application Express
const app = express();

//import body-parser
const bodyParser = require('body-parser');

//import mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://adminSoPekocko:adminSoPassword@cluster0.f4gxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//import des routeurs
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');



//correction des Erreurs de CORS avec ajout de headers dans les réponses
app.use((req, res, next) => {
  //accéder à notre API depuis n'importe quelle origine *
  res.setHeader('Access-Control-Allow-Origin', '*');
  //ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin, X-Requested-With ...)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //envoyer des requêtes avec les méthodes mentionnées (GET, POST, ...)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//gestion des requêtes provenant de l'application front-end, il faut le package body-parser défini comme middleware global
//(analyse le corps de la requête et le formate pour en faciliter l'exploitation) pour extraire l'objet JSON de la demande 
app.use(bodyParser.json());

//enregistrement des routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);



//export de l'application
module.exports = app;