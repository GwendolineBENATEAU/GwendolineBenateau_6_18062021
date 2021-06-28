//import express
const express = require('express');
//import body-parser
const bodyParser = require('body-parser');
//import mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://adminSoPekocko:adminSoPassword@cluster0.f4gxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//application express
const app = express();


//configuration de la réponse avec des middlewares qui se suivent (le dernier renvoie la réponse au client)
//1.correction des Erreurs de CORS avec ajout de headers dans les réponses
app.use((req, res, next) => {
  //accéder à notre API depuis n'importe quelle origine *
  res.setHeader('Access-Control-Allow-Origin', '*');
  //ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin, X-Requested-With ...)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //envoyer des requêtes avec les méthodes mentionnées (GET, POST, ...)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//2.Pour gérer la demande POST provenant de l'application front-end, il nous faudra le package body-parser 
//(analyse le corps de la requête et le formate pour en faciliter l'exploitation) pour extraire l'objet JSON de la demande 
//puis, définissez sa fonction json comme middleware global pour votre application
app.use(bodyParser.json());
//enfin, traitement des requêtes ici ...

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});



//export de l'application
module.exports = app;