const express = require('express');
const User = require('../../models/user'); // Modèle User
const authMiddleware = require('../../middleware/authMiddleware'); // Middleware JWT
const { isAdmin } = require('../../middleware/authAdmin'); // Middleware admin
const mongoose = require('mongoose');

const router = express.Router();

// ✅ Récupérer tous les utilisateurs (admin uniquement)
router.get('/', authMiddleware, isAdmin, async (req, res) => {
    console.log("📢 Headers reçus :", req.headers);
    console.log("📢 Token extrait :", req.headers.authorization);
    console.log("📢 Utilisateur après décryptage :", req.user);

    if (!req.user) {
        return res.status(403).json({ message: "Utilisateur non authentifié." });
    }

    try {
        const users = await User.find().select('-mot_de_passe');
        res.status(200).json(users);
    } catch (error) {
        console.error("❌ Erreur récupération utilisateurs :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});


// ✅ Récupérer un utilisateur spécifique (admin uniquement)
router.get('/:id', authMiddleware, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "ID utilisateur invalide." });
        }

        const user = await User.findById(id).select('-mot_de_passe');
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("❌ Erreur récupération utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// ✅ Modifier uniquement le rôle d'un utilisateur (admin)
router.put('/:id/role', authMiddleware, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "ID utilisateur invalide." });
        }

        if (!role || !['admin', 'participant'].includes(role.toLowerCase())) {
            return res.status(400).json({ message: "Rôle invalide. Doit être 'admin' ou 'participant'." });
        }

        const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: "Rôle mis à jour avec succès.", user: updatedUser });
    } catch (error) {
        console.error("❌ Erreur modification rôle utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// ✅ Supprimer un utilisateur (admin)
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "ID utilisateur invalide." });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        console.error("❌ Erreur suppression utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;
