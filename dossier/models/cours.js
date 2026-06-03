// models/cours.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const coursSchema = new Schema({
    titre_cours: { type: String, required: true },
    img_cours: { type: String },
    description_cours: { type: String, required: true },
    lien_cours: { type: String, required: true } // URL vers le contenu du cours
}, { timestamps: true }); // Garder timestamps pour des besoins de gestion

const Cours = mongoose.model('Cours', coursSchema);
module.exports = Cours;