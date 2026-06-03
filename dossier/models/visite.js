const mongoose = require('mongoose');
const visiteSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Visite', visiteSchema);
