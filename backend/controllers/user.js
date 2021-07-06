//import du package de chiffrement bcrypt
const bcrypt = require('bcrypt');
//import du package jsonwebtoken
const jwt = require('jsonwebtoken');
//import du modèle de données Mongoose
const User = require('../models/User');


//implémentation de 2 middlewares d'authentification utilisateur

//***************************************création d'un utilisateur dans la base de données***************************************
exports.signup = (req, res, next) => {
    //appelle de la fonction de hachage bcrypt dans le mot de passe (= cryptage du mdp) avec salage du mdp 10 fois
    bcrypt.hash(req.body.password, 10)
    //fonction asynchrone donc renvoie d'une Promise dans laquelle on reçoit le hash généré
      .then(hash => {
          //création d'un utilisateur avec le mdp crypté et l'@ passée dans le corp de la requete 
        const user = new User({
          email: req.body.email,
          password: hash
        });
        //et enregistrement de cet utilisateur dans la base de données
        user.save()
        //renvoie d'une réponse de réussite en cas de succès, et des erreurs avec le code d'erreur en cas d'échec
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


//***************************************recherche de l'utilisateur dans la base de donnée***************************************
  exports.login = (req, res, next) => {
    //recherche de l'utilisateur dans la base de donnée via son @
    User.findOne({ email: req.body.email })
      .then(user => {
        //utilisateur non trouvé (pas @)
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //utilisateur trouvé donc comparaison du mdp avec le hash enregistré dans la base de donnée
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            //mdp incorrect
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            //mdp ok
            res.status(200).json({
              //renvoie d'un user id au front et d'un token encodé
              userId: user._id,
              //utilisation de la fonction sign de jsonwebtoken pour encoder un token qui sera renvoyé au front avec la rép et
              //qui contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token)
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      //erreur liée uniquement à des pb de connexion serveur
      .catch(error => res.status(500).json({ error }));
  };