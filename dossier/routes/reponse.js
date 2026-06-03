const express = require('express');
const Reponse = require('../models/reponse');
const Quiz = require('../models/quiz');
const User = require('../models/user');
const Session = require('../models/session');
const mongoose = require('mongoose');

const authMiddleware = require('../middleware/authMiddleware'); // Vérifie si l'utilisateur est connecté

const router = express.Router();

// Un participant répond à un quiz
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { id_quiz, reponse_choisie } = req.body;
        const id_participant = req.user.userId; //  Récupérer l'ID depuis le token JWT

        if (!id_quiz || !reponse_choisie) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires." });
        }

        if (!mongoose.Types.ObjectId.isValid(id_participant) || !mongoose.Types.ObjectId.isValid(id_quiz)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        //  Vérifier si le quiz existe
        const quiz = await Quiz.findById(id_quiz);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz non trouvé." });
        }

        if (!quiz.id_niv) {
            return res.status(500).json({ message: "Problème de données : le quiz n'a pas de niveau associé." });
        }

        let est_correcte = false;

        switch (quiz.type_question) {
            case 'text':
                // Pour les questions textuelles
                if (Array.isArray(quiz.bonne_rep)) {
                    // Plusieurs réponses possibles
                    if (quiz.options && quiz.options.case_sensitive) {
                        // Sensible à la casse
                        est_correcte = quiz.bonne_rep.includes(reponse_choisie);
                    } else {
                        // Insensible à la casse
                        est_correcte = quiz.bonne_rep.some(rep => 
                            rep.toLowerCase() === reponse_choisie.toLowerCase()
                        );
                    }

                    // Si correspondance partielle est activée
                    if (!est_correcte && quiz.options && quiz.options.partial_match) {
                        est_correcte = quiz.bonne_rep.some(rep => {
                            if (quiz.options.case_sensitive) {
                                return reponse_choisie.includes(rep) || rep.includes(reponse_choisie);
                            } else {
                                return reponse_choisie.toLowerCase().includes(rep.toLowerCase()) || 
                                       rep.toLowerCase().includes(reponse_choisie.toLowerCase());
                            }
                        });
                    }
                } else {
                    // Une seule réponse possible
                    if (quiz.options && quiz.options.case_sensitive) {
                        est_correcte = quiz.bonne_rep === reponse_choisie;
                    } else {
                        est_correcte = quiz.bonne_rep.toLowerCase() === reponse_choisie.toLowerCase();
                    }

                    // Si correspondance partielle est activée
                    if (!est_correcte && quiz.options && quiz.options.partial_match) {
                        if (quiz.options.case_sensitive) {
                            est_correcte = reponse_choisie.includes(quiz.bonne_rep) || 
                                          quiz.bonne_rep.includes(reponse_choisie);
                        } else {
                            est_correcte = reponse_choisie.toLowerCase().includes(quiz.bonne_rep.toLowerCase()) || 
                                          quiz.bonne_rep.toLowerCase().includes(reponse_choisie.toLowerCase());
                        }
                    }
                }
                break;
        default:
             // Pour les types 'select', 'tf', etc.
             est_correcte = quiz.bonne_rep === reponse_choisie;
      }  
        //  Enregistrer la réponse
        const nouvelleReponse = new Reponse({
            id_participant,
            id_quiz,
            reponse_choisie,
            est_correcte
        });
        await nouvelleReponse.save();

        //  Mise à jour du score si la réponse est correcte
        if (est_correcte) {
            let session = await Session.findOne({ id_participant, id_niv: quiz.id_niv });

            if (session) {
                session.score += 10; // + Ajoute 10 points
                
                // Ajouter la réponse au tableau quiz_reponses
                session.quiz_reponses.push({
                    quiz_id: id_quiz,
                    reponse_choisie: reponse_choisie,
                    est_correcte: true,
                    date_reponse: new Date()
                });
                
                await session.save();
            } else {
                // Si c'est la première réponse dans ce niveau, créer une session
                const nouvelleSession = new Session({
                    id_participant,
                    id_niv: quiz.id_niv,
                    quiz_reponses: [{  // Utiliser quiz_reponses au lieu de id_quiz
                        quiz_id: id_quiz,
                        reponse_choisie: reponse_choisie,
                        est_correcte: true,
                        date_reponse: new Date()
                    }],
                    score: 10
                });
                await nouvelleSession.save();
            }
        }

        // Retourner la réponse sans afficher la bonne réponse
        //Cette ligne de code renvoie une réponse JSON au client (l'application frontend) 
        // après que l'utilisateur a soumis sa réponse à une question.
        // mais ne révèle pas quelle était la bonne réponse 
        res.status(201).json({
            message: est_correcte ? "Bonne réponse !" : "Mauvaise réponse.",
            reponse: {
                id_quiz,
                reponse_choisie,
                est_correcte
            }
        });

    } catch (error) {
        console.error(" Erreur :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});



module.exports = router;