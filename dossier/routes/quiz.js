const express = require('express');
const Quiz = require('../models/quiz');
const Niveau = require('../models/niveau');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Récupérer un quiz par ID (seulement utilisateurs connectés)
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: "Quiz non trouvé" });
        
        // Créer un objet de réponse sans la bonne réponse pour la sécurité
        const quizResponse = {
            _id: quiz._id,
            question: quiz.question,
            img_quiz: quiz.img_quiz,
            type_question: quiz.type_question,
            hint: quiz.hint, // S'assurer que l'indice est inclus
            id_niv: quiz.id_niv
        };
        
        // N'inclure les réponses possibles que pour les types qui en ont besoin
        if (quiz.type_question !== 'text') {
            quizResponse.reponses = quiz.reponses;
        }
        
        // Pour les questions de type 'code', inclure le code initial si disponible
        if (quiz.type_question === 'text' && quiz.initialCode) {
            quizResponse.initialCode = quiz.initialCode;
        }
        
        res.json(quizResponse);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// Récupérer les quiz par niveau (seulement utilisateurs connectés)
router.get('/niveau/:id_niv', authMiddleware, async (req, res) => {
    try {
        const quizList = await Quiz.find({ id_niv: req.params.id_niv });
        
        // Mapper pour exclure les bonnes réponses
        const secureQuizList = quizList.map(quiz => ({
            _id: quiz._id,
            question: quiz.question,
            img_quiz: quiz.img_quiz,
            type_question: quiz.type_question,
            hint: quiz.hint,
            id_niv: quiz.id_niv,
            reponses: quiz.type_question !== 'text' ? quiz.reponses : undefined,
            initialCode: quiz.type_question === 'text' && quiz.initialCode ? quiz.initialCode : undefined
        }));
        
        res.json(secureQuizList);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;