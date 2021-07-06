//import du modèle de données Mongoose
const Sauce = require('../models/Sauce');


//implémentation des middlewares correspondants aux routes CRUD pour la gestion des sauces

//**************************************** création et enregistrement des sauces dans la base de données ****************************************
exports.create = (req, res, next) => {
	const sauceCreate = JSON.parse(req.body.sauce);
    //suppresion du champ id généré par le front
    delete sauceCreate._id;

    //création d'une nouvelle sauce en objet JavaScript contenant toutes les informations requises du corps de requête
    const sauce = new Sauce({
        ...sauceCreate,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
	if(req.body.like === 1)
    {
        //utilisation de la méthode updateOne() dans notre modèle Sauce qui permet de maj
		Sauce.updateOne({_id: req.params.id}, {$inc: {likes: req.body.like++}, $push: {usersLiked: req.body.userId}})
			.then(() => res.status(200).json({ message: 'Like ajouté !'}))
			.catch(error => res.status(400).json({ error }))
	} 
    else if( req.body.like === -1)
    {
		Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: (req.body.like++)*-1}, $push: {usersDisliked: req.body.userId}})
			.then(() => res.status(200).json({ message: 'Dislike ajouté !'}))
			.catch(error => res.status(400).json({ error }))
	} 
    else 
    {
		Sauce.findOne({_id: req.params.id})
			.then(sauce => {
				if(sauce.usersLiked.includes(req.body.userId))
                {
					Sauce.updateOne({_id: req.params.id}, {$pull: {usersLiked: req.body.userId}, $inc: {likes: -1}})
						.then(() => res.status(200).json({ message: 'Like retiré !'}))
						.catch(error => res.status(400).json({ error }))
				} 
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
    const sauceUpdate = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { 
        ...req.body 
    };
    //utilisation de la méthode updateOne() dans notre modèle Sauce qui permet de maj
    Sauce.updateOne({ _id: req.params.id }, { ...sauceUpdate, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
};


//**************************************** supression d'une sauce ****************************************
exports.delete = (req, res, next) => 
{
    //utilisation la méthode findOne() dans notre modèle Sauce pour trouver la sauce unique ayant le même _id que le paramètre de la requête 
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`/images/${filename}`, () => {
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
