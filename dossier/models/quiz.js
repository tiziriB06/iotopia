const mongoose = require('mongoose');
const { Schema } = mongoose;

const quizSchema = new Schema({
    question: { 
        type: String, 
        required: true 
    },

    hint: { 
        type: String, 
        default: "" // Indice/aide pour l'utilisateur
    },
    id_niv: { 
        type: Schema.Types.ObjectId, 
        ref: 'Niveau', // Précise que cet ObjectId fait référence à un document dans la collection "Niveau"
        required: true 
    },
    // Type de question:'tf' (vrai/faux),'text' (réponse textuelle),'select' (sélection unique)
    type_question: { 
        type: String, 
        enum: ['mcq', 'tf', 'text', 'select'],
        required: true,
        default: 'select'
    },
    num_quiz: {
        type: String,  // Pour permettre des formats comme "01", "02", etc.
        required: true
    },
    reponses: [{ 
        type: String,
        required: function() {
            // Pas obligatoire pour les questions de type texte
            return this.type_question !== 'text';

            //les réponses ne sont obligatoires que si le type de question n'est pas 'text'
            // (puisque dans ce cas, c'est l'utilisateur qui rédige la réponse).
        }
    }],
    bonne_rep: {
        type: Schema.Types.Mixed, // Peut être string ou array selon le type de question
        required: true,
        validate: {
            validator: function(v) {
                if (this.type_question === 'text') {
                    // Pour les réponses textuelles, on peut avoir plusieurs réponses acceptables
                    return Array.isArray(v) ? v.length > 0 : typeof v === 'string' && v.trim().length > 0;
                } else {
                    // Pour vrai/faux ou sélection unique, une seule réponse
                    return typeof v === 'string' && v.trim().length > 0;
                }
            },
            message: props => 'Format de réponse invalide pour le type de question!'
            //C'est un paramètre que Mongoose passe automatiquement à la fonction de message d'erreur.
            // Il contient des informations sur la validation échouée. Mongoose l'injecte sans qu'on 
            // ait besoin de le déclarer ailleurs.
        }
    },
    // Pour les questions de type 'text' qui sont en fait du code
    initialCode: {
        type: String,
        default: ""
    },
    // Options supplémentaires selon le type de question
    options: {
        case_sensitive: { // Pour les réponses textuelles: sensible à la casse ou non
            type: Boolean,
            default: false
        },
        partial_match: { // Pour les réponses textuelles: correspondance partielle acceptée ou non
            type: Boolean,
            default: false
        }
    }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;