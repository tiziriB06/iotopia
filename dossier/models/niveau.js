const mongoose = require('mongoose');
const { Schema } = mongoose;

const niveauSchema = new Schema({
    num_niv: { type: Number, required: true },
    id_sct: { type: Schema.Types.ObjectId, ref: 'Section', required: true }
}, { timestamps: true });  

const Niveau = mongoose.model('Niveau', niveauSchema);
module.exports = Niveau;
