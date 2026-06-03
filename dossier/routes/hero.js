// routes/hero.js
const express = require('express');
const router = express.Router();
const Hero = require('../models/hero');
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware');

// GET /heroes - Récupérer tous les héros
router.get('/', authMiddleware, async (req, res) => {
    try {
        const heroes = await Hero.find();
        
        return res.status(200).json({
            message: "Liste des héros récupérée avec succès",
            heroes
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des héros:", error);
        return res.status(500).json({
            message: "Erreur serveur lors de la récupération des héros",
            error: error.message
        });
    }
});



// POST /heroes/select - Sélectionner un héros par son nom
router.post('/select', authMiddleware, async (req, res) => {
    try {
        const { name } = req.body; // Utilisation du nom exact du modèle: "name"
        const userId = req.user.id;
        
        if (!name) {
            return res.status(400).json({ message: "Le nom du héros est requis" });
        }
        
        // Rechercher le héros par son nom
        const hero = await Hero.findOne({ name });
        if (!hero) {
            return res.status(404).json({ message: `Héros "${name}" non trouvé` });
        }
        
        // Mettre à jour l'utilisateur avec le héros sélectionné
        const user = await User.findByIdAndUpdate(
            userId,
            { selectedHero: hero._id },
            { new: true }
        ).populate('selectedHero');
        
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        
        return res.status(200).json({
            message: `Héros "${name}" sélectionné avec succès`,
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
                username: user.username,
                selectedHero: user.selectedHero
            }
        });
    } catch (error) {
        console.error("Erreur lors de la sélection du héros:", error);
        return res.status(500).json({
            message: "Erreur serveur lors de la sélection du héros",
            error: error.message
        });
    }
});
module.exports = router;