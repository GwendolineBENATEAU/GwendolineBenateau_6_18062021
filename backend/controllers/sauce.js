//import du modèle de données Mongoose
const Sauce = require('../models/Sauce');
const fs = require('fs');



//implémentation des middlewares correspondants aux routes CRUD pour la gestion des sauces

//**************************************** création et enregistrement des sauces dans la base de données ****************************************
exports.create = (req, res, next) => {
    //analyse à l'aide de JSON.parse() pour obtenir un objet utilisable
	const sauceCreate = JSON.parse(req.body.sauce);
    //suppresion du champ id généré par le front
    delete sauceCreate._id;

    //création d'une nouvelle sauce en objet JavaScript contenant toutes les informations requises du corps de requête
    const sauce = new Sauce({
        ...sauceCreate,
        //modif url de l'image : req.protocol pour obtenir le premier segment http, '://' puis req.get('host') pour résoudre l'hôte du serveur
        //enfin '/images/' et le nom de fichier pour compléter notre URL
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        //Mise à zéro des likes et dislikes ainsi que usersLiked et usersDisliked dans tableau vides
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
     //enregistrement de l'object une méthode save() qui renvoie une Promise
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};


//**************************************** gestion des likes et dislike des sauces ****************************************
exports.like = (req, res, next) => {
    //si j'aime = 1, l'utilisateur aime la sauce, 
	if(req.body.like === 1)
    {
        //recherche de la sauce et incrémentation du nb de like avec l'opérateur de maj $inc + ajout de l'identifiant de l'utilisateur avec $push
		Sauce.updateOne({_id: req.params.id}, {$inc: {likes: req.body.like++}, $push: {usersLiked: req.body.userId}})
			.then(() => res.status(200).json({ message: 'Like ajouté !'}))
			.catch(error => res.status(400).json({ error }))
	} 
    //si j'aime = -1, l'utilisateur n'aime pas la sauce
    else if(req.body.like === -1)
    {
        //recherche de la sauce et incrémentation du nb de dislike à la forme négative + ajout de l'identifiant de l'utilisateur au tableau approprié
		Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: (req.body.like++)*-1}, $push: {usersDisliked: req.body.userId}})
			.then(() => res.status(200).json({ message: 'Dislike ajouté !'}))
			.catch(error => res.status(400).json({ error }))
	} 
    //sinon j'aime = 0, l'utilisateur annule son like ou dislike
    else 
    {
		Sauce.findOne({_id: req.params.id})
			.then(sauce => {
                //utilisation de la méthode includes() qui permet de déterminer si le tableau des usersLiked contient le userId de l'utilisateur pour maj
				if(sauce.usersLiked.includes(req.body.userId))
                {
					Sauce.updateOne({_id: req.params.id}, {$pull: {usersLiked: req.body.userId}, $inc: {likes: -1}})
						.then(() => res.status(200).json({ message: 'Like retiré !'}))
						.catch(error => res.status(400).json({ error }))
				} 
                //sinon includes() détermine si le tableau des usersDisliked contient le userId de l'utilisateur pour maj
                else if(sauce.usersDisliked.includes(req.body.userId))
                {
					Sauce.updateOne({_id: req.params.id}, {$pull: {usersDisliked: req.body.userId}, $inc: {dislikes: -1}})
						.then(() => res.status(200).json({ message: 'Dislike retiré !'}))
						.catch(error => res.status(400).json({ error }))
				}
			})
			.catch(error => res.status(400).json({ error }))
	}
};


//**************************************** modification d'une sauce ****************************************
exports.update = (req, res, next) => 
{
    //regarde si req.file existe ou non
   if (req.file) 
   {
        //si l'image est à modifier il faut supprimer l'ancienne image en la recherchant via son id
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => 
            {
                //récupération du nom du fichier image
                const filename = sauce.imageUrl.split('/images/')[1];
                //appel de la fonction unlink pour supprimer le fichier image retrouvé
                fs.unlink(`images/${filename}`, () => {
                    //une fois que l'ancienne image est supprimée on procède à la mise à jour des éléments de l'object
                    const sauceUpdate = 
                    {
                        //on parse de l'object
                        ...JSON.parse(req.body.sauce),
                         //et on traite la nouvelle image
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceUpdate, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } 
    else 
    {
        // si l'image n'est pas modifiée, on traite simplement l'objet entrant avec la méthode updateOne()
        const sauceUpdate = { ...req.body };
        Sauce.updateOne({ _id: req.params.id }, { ...sauceUpdate, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
            .catch(error => res.status(400).json({ error }));
    }   
};


//**************************************** supression d'une sauce ****************************************
exports.delete = (req, res, next) => 
{
    //recherche avec la méthode findOne() dans notre modèle Sauce pour trouver la sauce unique ayant le même _id que le paramètre de la requête 
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            //récupération du nom du fichier
            const filename = sauce.imageUrl.split('/images/')[1];
            //appel de la fonction unlink pour supprimer le fichier image recherché
            fs.unlink(`images/${filename}`, () => {
                //La méthode deleteOne() correspondant au document à supprimer avec envoi d'une réponse de réussite ou d'échec au front-end
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(400).json({ error }));
};
  

//**************************************** lire-récupérer une sauce spécifique via l'id dans la base de données ****************************************
exports.readOne = (req, res, next) => 
{
    //utilisation la méthode findOne() dans notre modèle Sauce pour trouver la sauce unique ayant le même _id que le paramètre de la requête 
    Sauce.findOne({ _id: req.params.id })
        //cette sauce est ensuite retourné dans des Promises et envoyé au front-end
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};


//**************************************** lire-récupérer toutes les sauces dans la base de données ****************************************
exports.readAll = (req, res, next) => 
{
	//utilisation la méthode find() dans notre modèle afin de renvoyer un tableau contenant tous les sauces dans notre base de données
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};
