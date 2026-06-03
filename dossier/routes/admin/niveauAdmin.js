const express = require('express');
const Niveau = require('../../models/niveau');
const mongoose = require('mongoose');

const router = express.Router();

//  Ajouter un niveau (Admin)
router.post('/', async (req, res) => {
    try {
        console.log("📥 Données reçues :", req.body);

        const { num_niv, id_sct } = req.body;

        //  Vérifier que tous les champs requis sont fournis
        if (!num_niv || !id_sct) {
            return res.status(400).json({ message: "Le numéro et l'ID de la section sont obligatoires." });
        }

        //  Vérifier si l'ID de la section est valide
        if (!mongoose.Types.ObjectId.isValid(id_sct)) {
            return res.status(400).json({ message: "ID de section invalide." });
        }

        //  Vérifier si le niveau existe déjà dans la même section
        const niveauExiste = await Niveau.findOne({ num_niv, id_sct });
        if (niveauExiste) {
            return res.status(400).json({ message: "Ce niveau existe déjà dans cette section." });
        }

        const nouveauNiveau = new Niveau({ num_niv, id_sct });
        await nouveauNiveau.save();

        res.status(201).json({ message: "Niveau ajouté avec succès", niveau: nouveauNiveau });
    } catch (error) {
        console.error("❌ Erreur ajout niveau :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

//  Modifier un niveau (Admin)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { num_niv, id_sct } = req.body;

        //  Vérifier que l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID invalide." });
        }

        //  Vérifier si le niveau existe
        const niveau = await Niveau.findById(id);
        if (!niveau) {
            return res.status(404).json({ message: "Niveau non trouvé." });
        }

        // ✅ Vérifier qu'au moins un champ est fourni pour la mise à jour
        if (!num_niv && !id_sct) {
            return res.status(400).json({ message: "Veuillez fournir au moins un champ à mettre à jour." });
        }

        // ✅ Vérifier si le numéro de niveau est déjà utilisé dans cette section
        if (num_niv && num_niv !== niveau.num_niv) {
            const niveauExiste = await Niveau.findOne({ num_niv, id_sct: id_sct || niveau.id_sct });
            if (niveauExiste) {
                return res.status(400).json({ message: "Ce numéro de niveau est déjà utilisé dans cette section." });
            }
        }

        const niveauModifie = await Niveau.findByIdAndUpdate(
            id,
            { num_niv, id_sct },
            { new: true, runValidators: true }
        );

        res.json({ message: "Niveau mis à jour avec succès.", niveau: niveauModifie });
    } catch (error) {
        console.error("❌ Erreur modification niveau :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// 🔴 Supprimer un niveau (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Vérifier que l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID invalide." });
        }

        // ✅ Vérifier si le niveau existe
        const niveau = await Niveau.findById(id);
        if (!niveau) {
            return res.status(404).json({ message: "Niveau non trouvé." });
        }

        await Niveau.findByIdAndDelete(id);

        res.json({ message: "Niveau supprimé avec succès." });
    } catch (error) {
        console.error("❌ Erreur suppression niveau :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;
