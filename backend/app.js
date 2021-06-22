//importer express
const express = require('express');

//application express
const app = express();

//configuration de la réponse
app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});


//export de l'application
module.exports = app;