//import du modèle de données Mongoose
const Sauce = require('../models/Sauce');


//********************************************implémentation des middlewares correspondants aux routes CRUD pour la gestion des sauces********************************************
//création et enregistrement des sauces dans la base de données (traitement des requêtes de type POST au-dessus des demandes GET)
exports.create = (req, res, next) => {
	
};

exports.like = (req, res, next) => {
	
};

exports.update = (req, res, next) => {
	
};

exports.delete = (req, res, next) => {
	
};

exports.readOne = (req, res, next) => {
	
};

exports.readAll = (req, res, next) => {
	
};






/* //************************ CREATION - Enregistrement des Things dans la base de données************************
//traitement des requêtes de type POST au-dessus des demandes GET
exports.createThing = (req, res, next) => {
    //suppresion du champ id généré par le front
    delete req.body._id;
    //instance de votre modèle Thing en lui passant un objet JavaScript contenant toutes les informations requises du corps de requête
    const thing = new Thing({
        //L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
        ...req.body
    });
    //enregistrement de l'object une méthode save() qui renvoie une Promise
    thing.save()
        .then(() => res.status(201).json({
            message: 'Objet enregistré !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};


//************************ MODIFICATION - Mettre à jour un Thing existant*******************************************
exports.modifyThing = (req, res, next) => {
    //utilisation de la méthode updateOne() dans notre modèle Thing qui permet de maj le Thing qui correspond à l'objet que nous passons comme premier argument 
    //et aussi le paramètre id passé dans la demande et le remplaçons par le Thing passé comme second argument
    Thing.updateOne({
            _id: req.params.id
        }, {
            ...req.body,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet modifié !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};


//************************ SUPPRESSION - Suppression d'un Thing ****************************************************
exports.deleteThing = (req, res, next) => {
    //La méthode deleteOne() correspondant au document à supprimer avec envoi d'une réponse de réussite ou d'échec au front-end
    Thing.deleteOne({
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet supprimé !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};


//************************ LECTURE - Récupération d'un Thing spécifique via l'id de l'object************************
exports.getOneThing = (req, res, next) => {
    //utilisation la méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête 
    //avec deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre
    Thing.findOne({
            _id: req.params.id
        })
        //ce Thing est ensuite retourné dans des Promises et envoyé au front-end
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({
            error
        }));
};


//************************ LECTURE - Récupération de la liste de Things en vente***********************************
//route GET vers l'API/stuff afin qu'elle renvoie tous les Things dans la base de données
exports.getAllStuff = (req, res, next) => {
    //utilisation la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau contenant tous les Things dans notre base de données
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({
            error
        }));
}; */