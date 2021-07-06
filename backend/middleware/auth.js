//import du module jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => 
{
  try 
  {
    //extraction du token du header Authorisation de la requête entrante avec la fonction split (récupération après mot-clé Bearer' ')
    const token = req.headers.authorization.split(' ')[1];
    //décodage du token avec la fonction verify
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //puis extraction de l'ID utilisateur contenu dans le token
    const userId = decodedToken.userId;

    //si la demande contient un ID utilisateur, comparaison avec celui extrait du token sinon si différents : erreur
    if (req.body.userId && req.body.userId !== userId) 
    {
      throw 'Identifiant utilisateur non valable !';
    } 
    //dans le cas contraire, utilisateur authentifié donc next
    else 
    {
      next();
    }
  } 

  catch 
  {
    res.status(401).json({error: error | 'Requête non authentifiée !'});
  }
};