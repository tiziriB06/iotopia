const mongoose = require('mongoose');
const statSchema = new mongoose.Schema({
    section: { type: String, required: true },
    visitors: { type: Number, default: 1 }
}, { timestamps: true }); // createdAt utilisé pour le filtrage par période

module.exports = mongoose.model('Stat', statSchema);
