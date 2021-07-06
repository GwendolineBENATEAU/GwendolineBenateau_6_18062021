//import du package http de node
const http = require('http');

//import de l'application express
const app = require('./app');


//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => 
{
  const port = parseInt(val, 10);
  //si pas un numéro retourner la valeur
  if (isNaN(port)) 
  {
    return val;
  }
  //si numéro retourner port
  if (port >= 0) 
  {
    return port;
  }
  return false;
};

//configuration de l'écoute de l'app express selon la normalisation du port
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);



//la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => 
{
  if (error.syscall !== 'listen') 
  {
    throw error;
  }

  const address = server.address();
  //bind = type de l'adresse selon si chaine de caractère ou non
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  //gestion du code erreur
  switch (error.code) 
  {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;

    default:
      throw error;
  }
};

//création du serveur avec la méthode createServer qui sera appellée à chaque execution du serveur
const server = http.createServer(app);

//gestion de l'erreur
server.on('error', errorHandler);
server.on('listening', () => 
{
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  // écouteur d'évènements consignant le port ou le canal sur lequel le serveur s'exécute
  console.log('Listening on ' + bind);
});


//configuration de l'écoute du server
server.listen(port);
