//import des modules d'extension
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//schéma de données avec la méthode schema mise à disposition par Mongoose
const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

//plugin mongoose-unique-validator assure qu'aucun utilisateurs ne peuvent avoir la même adresse e-mail.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);