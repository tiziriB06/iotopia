const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new mongoose.Schema({
    id_participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    id_niv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Niveau',
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    niv_valide: {
        type: Boolean,
        default: false
    },
    
    quiz_reponses: [  // Renommé de 'id_quiz' à 'quiz_reponses' pour plus de clarté
        {
            quiz_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Quiz',
                required: true
            },
            reponse_choisie: {
                type: String, // Réponse donnée par l'utilisateur
                required: true
            },
            est_correcte: {
                type: Boolean, // Réponse correcte ou incorrecte
                default: false
            },
            date_reponse: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
