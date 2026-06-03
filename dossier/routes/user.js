// routes/user.js
const express = require('express');
const mongoose = require('mongoose'); 
const User = require('../models/user');
const Hero = require('../models/hero');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * Récupérer le profil de l'utilisateur connecté
 * Route : GET /user/profile
 */
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // Rechercher l'utilisateur avec son héros sélectionné
        const user = await User.findById(req.user.id)
            .select('-mdp -resetPasswordCode -resetPasswordExpires')
            .populate('selectedHero');
        
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        
        // Renvoyer les informations du profil avec username, email et héros
        res.status(200).json({ 
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                selectedHero: user.selectedHero,
                isVerified: user.isVerified,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error("Erreur récupération profil :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

/**
 * Mettre à jour le mot de passe de l'utilisateur
 * Route : PUT /user/update-password
 */
router.put('/update-password', authMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Veuillez fournir l'ancien et le nouveau mot de passe." });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.mdp);
        if (!isMatch) {
            return res.status(400).json({ message: "Ancien mot de passe incorrect." });
        }

        const salt = await bcrypt.genSalt(10);
        user.mdp = await bcrypt.hash(newPassword, salt);

        await user.save();
        res.status(200).json({ message: "Mot de passe mis à jour avec succès." });

    } catch (error) {
        console.error("Erreur modification mot de passe :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

/**
 * Changer le nom d'utilisateur
 * Route : PUT /user/update-username
 */
router.put('/update-username', authMiddleware, async (req, res) => {
    const { newUsername } = req.body;

    if (!newUsername) {
        return res.status(400).json({ message: "Veuillez fournir un nouveau nom d'utilisateur." });
    }

    try {
        // Vérification si le nom d'utilisateur est déjà pris
        const existingUser = await User.findOne({ username: newUsername });
        if (existingUser && existingUser._id.toString() !== req.user.id) {
            return res.status(400).json({ message: "Ce nom d'utilisateur est déjà utilisé." });
        }

        // Mise à jour de l'utilisateur
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        user.username = newUsername;
        await user.save();
        
        res.status(200).json({ 
            message: "Nom d'utilisateur mis à jour avec succès.",
            username: newUsername
        });

    } catch (error) {
        console.error("Erreur changement de nom d'utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// Dans user.js
// PUT /user/update-hero - Changer le héros sélectionné par nom
router.put('/update-hero', authMiddleware, async (req, res) => {
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
            message: `Héros mis à jour avec succès vers "${name}"`,
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
                username: user.username,
                selectedHero: user.selectedHero
            }
        });
    } catch (error) {
        console.error("Erreur lors de la modification du héros:", error);
        return res.status(500).json({
            message: "Erreur serveur lors de la modification du héros",
            error: error.message
        });
    }
});

module.exports = router;