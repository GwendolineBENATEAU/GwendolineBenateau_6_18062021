//import du package http de node
const http = require('http');

//appel de la méthode createServer qui sera appellée à chaque execution du serveur
const server = http.createServer((req, res) => 
{
    res.end('Voilà la réponse du dernier test serveur !');
});

//configuration de l'écoute
server.listen(process.env.PORT || 3000);

