const express = require('express');
const Section = require('../../models/section');
const mongoose = require('mongoose');

const router = express.Router();

// 🟢 Ajouter une section (Admin)
router.post('/', async (req, res) => {
    try {
        const { type_sct, img_sct, description_sct } = req.body;

        if (!type_sct) {
            return res.status(400).json({ message: "Le type de la section est obligatoire." });
        }

        // ✅ Vérifier si une section avec le même type existe déjà
        const existSection = await Section.findOne({ type_sct });
        if (existSection) {
            return res.status(400).json({ message: "Une section avec ce type existe déjà." });
        }

        const nouvelleSection = new Section({ type_sct, img_sct, description_sct });
        await nouvelleSection.save();

        res.status(201).json({ message: "Section ajoutée avec succès", section: nouvelleSection });
    } catch (error) {
        console.error("❌ Erreur ajout section :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// 🟡 Modifier une section (Admin)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type_sct, img_sct, description_sct } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID invalide." });
        }

        const section = await Section.findById(id);
        if (!section) {
            return res.status(404).json({ message: "Section non trouvée." });
        }

        // ✅ Vérifier qu'au moins un champ est fourni
        if (!type_sct && !img_sct && !description_sct) {
            return res.status(400).json({ message: "Veuillez fournir au moins un champ à mettre à jour." });
        }

        // ✅ Vérifier si un autre article a déjà ce type (évite les doublons)
        if (type_sct && type_sct !== section.type_sct) {
            const existSection = await Section.findOne({ type_sct });
            if (existSection) {
                return res.status(400).json({ message: "Une section avec ce type existe déjà." });
            }
        }

        const sectionModifiee = await Section.findByIdAndUpdate(
            id,
            { type_sct, img_sct, description_sct },
            { new: true, runValidators: true }
        );

        res.json({ message: "Section mise à jour avec succès.", section: sectionModifiee });
    } catch (error) {
        console.error("❌ Erreur modification section :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// 🔴 Supprimer une section (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID invalide." });
        }

        const section = await Section.findById(id);
        if (!section) {
            return res.status(404).json({ message: "Section non trouvée." });
        }

        await Section.findByIdAndDelete(id);

        res.json({ message: "Section supprimée avec succès." });
    } catch (error) {
        console.error("❌ Erreur suppression section :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;
