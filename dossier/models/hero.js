
const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    niveau: {
        type: Number,
        required: true
    },
    image: {
        type: String, // Chemin ou URL de l'image du héros
        required: true
    },
    // Caractéristiques principales
    characteristics: {
        // Ces noms correspondent aux caractéristiques dans votre design
        caracteristique1: { // Ex: Connectivité, Vitesse de scan, Puissance de piratage...
            name: String,
            value: Number, // Valeur entre 0 et 100
            color: String  // Couleur pour la barre (optionnelle)
        },
        caracteristique2: {
            name: String,
            value: Number,
            color: String
        },
        caracteristique3: {
            name: String,
            value: Number,
            color: String
        },
        caracteristique4: {
            name: String,
            value: Number,
            color: String
        },
        caracteristique5: {
            name: String,
            value: Number,
            color: String
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);