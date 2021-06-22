//import du package http de node
const http = require('http');

//import de l'application express
const app = require('./app');


//configuration de l'écoute de l'app express
app.set('port', process.env.PORT || 3000);

//appel de la méthode createServer qui sera appellée à chaque execution du serveur
const server = http.createServer(app);

//configuration de l'écoute du server
server.listen(process.env.PORT || 3000);

