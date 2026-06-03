// routes/admin/coursAdmin.js
const express = require('express');
const router = express.Router();
const Cours = require('../../models/cours');
const mongoose = require('mongoose');
const { isAdmin } = require('../../middleware/authAdmin');

// Ajouter un cours (Admin uniquement)
router.post('/', isAdmin, async (req, res) => {
    try {
        const { 
            titre_cours, 
            img_cours, 
            description_cours, 
            lien_cours 
        } = req.body;

        // Vérifications des champs requis
        if (!titre_cours || !description_cours || !lien_cours) {
            return res.status(400).json({ 
                message: "Les champs titre_cours, description_cours et lien_cours sont obligatoires." 
            });
        }

        // Vérifier si un cours avec le même titre existe déjà
        const coursExiste = await Cours.findOne({ titre_cours });
        if (coursExiste) {
            return res.status(400).json({ message: "Un cours avec ce titre existe déjà." });
        }

        // Vérifier que le lien est une URL valide
        try {
            new URL(lien_cours);
        } catch (e) {
            return res.status(400).json({ message: "Le lien fourni n'est pas une URL valide." });
        }

        const nouveauCours = new Cours({ 
            titre_cours, 
            img_cours, 
            description_cours, 
            lien_cours 
        });
        
        await nouveauCours.save();

        res.status(201).json({ 
            message: "Cours ajouté avec succès", 
            cours: nouveauCours 
        });
    } catch (error) {
        console.error("Erreur ajout cours :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// Modifier un cours par titre (Admin uniquement)
router.put('/', isAdmin, async (req, res) => {
    try {
        const { 
            titre_cours,        // Titre actuel du cours à modifier
            nouveau_titre,      // Nouveau titre (optionnel)
            img_cours, 
            description_cours, 
            lien_cours 
        } = req.body;

        // Vérifier si le titre est fourni
        if (!titre_cours) {
            return res.status(400).json({ message: "Le titre du cours à modifier est obligatoire." });
        }

        // Vérifier si le cours existe
        const cours = await Cours.findOne({ titre_cours });
        if (!cours) {
            return res.status(404).json({ message: `Cours "${titre_cours}" non trouvé.` });
        }

        // Vérifier qu'au moins un champ est fourni pour la mise à jour
        if (!nouveau_titre && img_cours === undefined && 
            !description_cours && !lien_cours) {
            return res.status(400).json({ 
                message: "Veuillez fournir au moins un champ à mettre à jour." 
            });
        }

        // Vérifier si un autre cours a déjà le nouveau titre
        if (nouveau_titre && nouveau_titre !== titre_cours) {
            const titrePris = await Cours.findOne({ titre_cours: nouveau_titre });
            if (titrePris) {
                return res.status(400).json({ message: `Un cours avec le titre "${nouveau_titre}" existe déjà.` });
            }
        }

        // Vérifier que le lien est une URL valide
        if (lien_cours) {
            try {
                new URL(lien_cours);
            } catch (e) {
                return res.status(400).json({ message: "Le lien fourni n'est pas une URL valide." });
            }
        }

        // Construire l'objet de mise à jour
        const updateData = {};
        if (nouveau_titre) updateData.titre_cours = nouveau_titre;
        if (img_cours !== undefined) updateData.img_cours = img_cours;
        if (description_cours) updateData.description_cours = description_cours;
        if (lien_cours) updateData.lien_cours = lien_cours;

        const coursModifie = await Cours.findOneAndUpdate(
            { titre_cours },
            updateData,
            { new: true, runValidators: true }
        );

        res.json({ 
            message: "Cours mis à jour avec succès.", 
            cours: coursModifie 
        });
    } catch (error) {
        console.error("Erreur modification cours :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// Supprimer un cours par titre (Admin uniquement)
router.delete('/', isAdmin, async (req, res) => {
    try {
        const { titre_cours } = req.body;

        // Vérifier si le titre est fourni
        if (!titre_cours) {
            return res.status(400).json({ message: "Le titre du cours à supprimer est obligatoire." });
        }

        // Vérifier si le cours existe
        const cours = await Cours.findOne({ titre_cours });
        if (!cours) {
            return res.status(404).json({ message: `Cours "${titre_cours}" non trouvé.` });
        }

        await Cours.findOneAndDelete({ titre_cours });

        res.json({ message: `Cours "${titre_cours}" supprimé avec succès.` });
    } catch (error) {
        console.error("Erreur suppression cours :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// Récupérer tous les cours (Admin uniquement)
router.get('/', isAdmin, async (req, res) => {
    try {
        const cours = await Cours.find();
        res.json(cours);
    } catch (error) {
        console.error("Erreur récupération cours :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// Récupérer un cours par titre (Admin uniquement)
router.get('/details', isAdmin, async (req, res) => {
    try {
        const { titre_cours } = req.query;
        
        if (!titre_cours) {
            return res.status(400).json({ message: "Le titre du cours est obligatoire." });
        }
        
        const cours = await Cours.findOne({ titre_cours });
        if (!cours) {
            return res.status(404).json({ message: `Cours "${titre_cours}" non trouvé` });
        }
        
        res.json(cours);
    } catch (error) {
        console.error("Erreur récupération cours :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;