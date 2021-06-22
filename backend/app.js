//importer express
const express = require('express');

//application express
const app = express();

//configuration de la réponse avec des fonctions middlewares qui se suivent
app.use((req, res, next) => 
{
  console.log('Requête reçue !');//premier enregistre « Requête reçue ! » dans la console et passe l'exécution ;
  next();
});

app.use((req, res, next) => 
{
  res.status(201);//deuxième ajoute un code d'état 201 à la réponse et passe l'exécution ;
  next();
});

app.use((req, res, next) => 
{
  res.json({ message: 'Votre requête a bien été reçue !' });//troisième envoie la réponse JSON et passe l'exécution ;
  next();
});

app.use((req, res, next) => 
{
  console.log('Réponse envoyée avec succès !');//dernier élément de middleware enregistre « Réponse envoyée avec succès ! » dans la console.
});



//export de l'application
module.exports = app;