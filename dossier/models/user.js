const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,       // Supprime les espaces inutiles
        lowercase: true   // Convertit l'email en minuscules 
    },
    isVerified: {
        type: Boolean,
        default: false // Par défaut non vérifié
    },
    mdp: { 
        type: String, 
        required: true 
    },
    username: {
        type: String,
        required: true,  
        unique: true,   
        trim: true       // Supprime les espaces inutiles
    },
    role: { 
        type: String, 
        enum: ['Admin', 'Participant'],
        required: true      
    },
    
    
    selectedHero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hero',
        default: null
    },
    
    confirmationCode: {
        type: String,
        select: false // Ne sera pas retourné dans les requêtes
    },
    confirmationExpires: {
        type: Date,
        select: false
    },
    resetPasswordCode: {
        type: String,
        select: false 
    }, // Stocke le code temporaire
    resetPasswordExpires: { 
        type: Date,
        select: false 
    } // Stocke la date d'expiration du code
    
}, { 
    timestamps: true,    // Ajoute `createdAt` et `updatedAt`
    discriminatorKey: 'type'    // Utilisé pour l'héritage de schémas
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);