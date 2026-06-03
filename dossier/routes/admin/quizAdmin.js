const express = require('express');
const router = express.Router();
const Quiz = require('../../models/quiz');
const Niveau = require('../../models/niveau');
const Section = require('../../models/section');
const mongoose = require('mongoose');

// Ajouter un quiz (Admin uniquement)
router.post('/', async (req, res) => {
    try {
        const { 
            question,           // Nom du quiz dans l'interface
            reponses, 
            bonne_rep,          // Réponse dans l'interface
            section_nom,        // Nom de la section (type_sct)
            num_niveau,         // Numéro du niveau
            num_quiz,           // Numéro du quiz
            type_question,      // Type de réponse (ex: V/F)
            hint                // Indice pour l'utilisateur
        } = req.body;

        // Vérifications des champs requis
        if (!question || !bonne_rep || !section_nom || !num_niveau || !num_quiz || !type_question) {
            return res.status(400).json({ 
                message: "Les champs question, bonne_rep, section_nom, num_niveau, num_quiz et type_question sont obligatoires." 
            });
        }

        // 1. Trouver l'ID de section à partir du nom (type_sct)
        const section = await Section.findOne({ type_sct: section_nom });
        if (!section) {
            return res.status(404).json({ message: `Section '${section_nom}' non trouvée.` });
        }

        // 2. Trouver l'ID du niveau en utilisant l'ID de section et le numéro de niveau
        const niveau = await Niveau.findOne({ 
            id_sct: section._id, 
            num_niv: parseInt(num_niveau)
        });

        if (!niveau) {
            return res.status(404).json({ 
                message: `Niveau '${num_niveau}' non trouvé pour la section '${section_nom}'.` 
            });
        }

        // 3. Vérifier si un quiz avec ce numéro existe déjà dans ce niveau
        const quizExiste = await Quiz.findOne({ 
            id_niv: niveau._id,
            num_quiz: num_quiz
        });

        if (quizExiste) {
            return res.status(400).json({ 
                message: `Un quiz avec le numéro '${num_quiz}' existe déjà pour ce niveau.` 
            });
        }

        // Convertir le type de question si nécessaire
        let typeQuestionCode = type_question;
        if (type_question === "V/F") {
            typeQuestionCode = "tf";
        }

        // Définir les réponses selon le type de question
        let reponsesArray = reponses;
        if (type_question === "V/F" && (!reponses || reponses.length === 0)) {
            reponsesArray = ["Vrai", "Faux"];
        }

        // Créer le nouveau quiz
        const nouveauQuiz = new Quiz({ 
            question, 
            reponses: reponsesArray, 
            bonne_rep, 
            id_niv: niveau._id,
            num_quiz: num_quiz,
            type_question: typeQuestionCode,
            hint: hint || ""      // Ajouter l'indice s'il est fourni
        });
        
        await nouveauQuiz.save();

        res.status(201).json({ message: "Quiz ajouté avec succès", quiz: nouveauQuiz });
    } catch (error) {
        console.error("Erreur ajout quiz :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// Modifier un quiz par section_nom, num_niveau et num_quiz (Admin uniquement)
router.put('/', async (req, res) => {
    try {
        const { 
            section_nom,        // Nom de la section existante
            num_niveau,         // Numéro du niveau existant
            num_quiz,           // Numéro du quiz existant à modifier
            
            // Nouvelles valeurs
            question,           // Nom du quiz (nouvelle valeur)
            reponses,           // Réponses possibles (nouvelle valeur)
            bonne_rep,          // Réponse correcte (nouvelle valeur)
            type_question,      // Type de question (nouvelle valeur)
            hint                // Indice (nouvelle valeur)
        } = req.body;

        // Vérifications des champs requis
        if (!section_nom || !num_niveau || !num_quiz) {
            return res.status(400).json({ 
                message: "Les champs section_nom, num_niveau et num_quiz sont obligatoires pour identifier le quiz." 
            });
        }

        // 1. Trouver l'ID de section à partir du nom
        const section = await Section.findOne({ type_sct: section_nom });
        if (!section) {
            return res.status(404).json({ message: `Section '${section_nom}' non trouvée.` });
        }

        // 2. Trouver l'ID du niveau
        const niveau = await Niveau.findOne({ 
            id_sct: section._id, 
            num_niv: parseInt(num_niveau) 
        });
        
        if (!niveau) {
            return res.status(404).json({ 
                message: `Niveau '${num_niveau}' non trouvé pour la section '${section_nom}'.` 
            });
        }
        
        // 3. Trouver le quiz existant
        const quizExistant = await Quiz.findOne({ 
            id_niv: niveau._id,
            num_quiz: num_quiz
        });
        
        if (!quizExistant) {
            return res.status(404).json({ 
                message: `Aucun quiz avec le numéro '${num_quiz}' trouvé pour ce niveau.` 
            });
        }
        
        // Construire l'objet de mise à jour
        const updateData = {};
        if (question !== undefined) updateData.question = question;
        if (bonne_rep !== undefined) updateData.bonne_rep = bonne_rep;
        if (hint !== undefined) updateData.hint = hint;
        
        // Gérer le type de question et les réponses
        if (type_question !== undefined) {
            if (type_question === "V/F") {
                updateData.type_question = "tf";
                updateData.reponses = ["Vrai", "Faux"];
            } else {
                updateData.type_question = type_question;
                if (reponses !== undefined) updateData.reponses = reponses;
            }
        } else if (reponses !== undefined) {
            updateData.reponses = reponses;
        }

        // Mettre à jour le quiz
        const quizModifie = await Quiz.findByIdAndUpdate(
            quizExistant._id,
            updateData,
            { new: true, runValidators: true }
        );

        res.json({ 
            message: "Quiz mis à jour avec succès.", 
            quiz: quizModifie 
        });
    } catch (error) {
        console.error("Erreur modification quiz :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// Supprimer un quiz par section_nom, num_niveau et num_quiz (Admin uniquement)
router.delete('/', async (req, res) => {
    try {
        const { section_nom, num_niveau, num_quiz } = req.body;

        // Vérifications des champs requis
        if (!section_nom || !num_niveau || !num_quiz) {
            return res.status(400).json({ 
                message: "Les champs section_nom, num_niveau et num_quiz sont obligatoires pour identifier le quiz." 
            });
        }

        // 1. Trouver l'ID de section à partir du nom
        const section = await Section.findOne({ type_sct: section_nom });
        if (!section) {
            return res.status(404).json({ message: `Section '${section_nom}' non trouvée.` });
        }

        // 2. Trouver l'ID du niveau
        const niveau = await Niveau.findOne({ 
            id_sct: section._id, 
            num_niv: parseInt(num_niveau) 
        });
        
        if (!niveau) {
            return res.status(404).json({ 
                message: `Niveau '${num_niveau}' non trouvé pour la section '${section_nom}'.` 
            });
        }
        
        // 3. Trouver le quiz existant
        const quizExistant = await Quiz.findOne({ 
            id_niv: niveau._id,
            num_quiz: num_quiz
        });
        
        if (!quizExistant) {
            return res.status(404).json({ 
                message: `Aucun quiz avec le numéro '${num_quiz}' trouvé pour ce niveau.` 
            });
        }

        // Supprimer le quiz
        await Quiz.findByIdAndDelete(quizExistant._id);

        res.json({ message: "Quiz supprimé avec succès." });
    } catch (error) {
        console.error("Erreur suppression quiz :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;