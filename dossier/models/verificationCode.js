// models/verificationCode.js
const mongoose = require('mongoose');

const verificationCodeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,  // Un seul code actif par email
        trim: true,
        lowercase: true
    },
    code: {
        type: String,
        required: true
    },
    userData: {
        type: Object,
        required: true,
        // Structure attendue: { mdp: String, username: String }
    },
    expires: {
        type: Date,
        required: true
    }
}, { timestamps: true });

// Index TTL pour supprimer automatiquement les codes expirés
verificationCodeSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('VerificationCode', verificationCodeSchema);