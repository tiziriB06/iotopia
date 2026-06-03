const mongoose = require('mongoose');
const { Schema } = mongoose;

const reponseSchema = new Schema({
    id_participant: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
    id_quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },  
    reponse_choisie: { type: String, required: true },  
    est_correcte: { type: Boolean, required: true },
    date_reponse: { type: Date, default: Date.now }  // Ajout du champ de date
}, { timestamps: true });

const Reponse = mongoose.model('Reponse', reponseSchema);
module.exports = Reponse;
