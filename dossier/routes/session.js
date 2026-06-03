const express = require('express');
const Session = require('../models/session');
const Quiz = require('../models/quiz');
const User = require('../models/user');
const Niveau = require('../models/niveau');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * 🔹 Créer ou récupérer une session
 * Route : POST /start
 */
router.post('/start', authMiddleware, async (req, res) => {
    try {
        const id_participant = req.user.id;
        const { id_niv } = req.body;

        if (!id_niv || !mongoose.Types.ObjectId.isValid(id_niv)) {
            return res.status(400).json({ message: "ID du niveau invalide ou manquant." });
        }

        const niveau = await Niveau.findById(id_niv);
        if (!niveau) {
            return res.status(404).json({ message: "Niveau introuvable." });
        }

        let session = await Session.findOne({ id_participant, id_niv });

        if (!session) {
            session = new Session({ id_participant, id_niv, score: 0, quiz_reponses: [] });
            await session.save();
        }

        const sessionDetails = await Session.findById(session._id)
            .populate('id_participant', 'nom email')
            .populate('id_niv', 'nom');

        res.status(200).json({ message: "Session récupérée/créée avec succès.", session: sessionDetails });
    } catch (error) {
        console.error("Erreur création session :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

/**
 * 🔹 Vérifier passage au niveau suivant
 * Route : GET /verifier-passage/:id_niv
 */
router.get('/validation-niveau/:id_niv', authMiddleware, async (req, res) => {
    try {
        const id_participant = req.user.id;
        const { id_niv } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id_niv)) {
            return res.status(400).json({ message: "ID niveau invalide." });
        }

        const session = await Session.findOne({ id_participant, id_niv });

        if (!session) {
            return res.status(404).json({ message: "Session non trouvée." });
        }

        const quizQuestions = await Quiz.find({ id_niv }).select('_id');
        const totalQuestions = quizQuestions.length;
        const answeredQuestions = session.quiz_reponses.length;

        // ✅ On vérifie que toutes les questions ont été répondues
        if (answeredQuestions < totalQuestions) {
            return res.status(400).json({ message: `Vous devez répondre à toutes les questions (${answeredQuestions}/${totalQuestions}).` });
        }

        const SCORE_MINIMUM = 50;

        // ✅ Si le score est suffisant, on valide le niveau
        if (session.score >= SCORE_MINIMUM) {
            if (!session.niv_valide) {
                session.niv_valide = true;
                await session.save();
            }
            return res.status(200).json({ message: "Félicitations ! Niveau validé, vous pouvez passer au suivant.", peut_passer: true });
        } else {
            return res.status(200).json({ message: `Score insuffisant : ${session.score}/${SCORE_MINIMUM}`, peut_passer: false });
        }

    } catch (error) {
        console.error("Erreur vérification passage :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});


/**
 * 🔹 Voir sa session
 * Route : GET /:id_niv
 */
router.get('/:id_niv', authMiddleware, async (req, res) => {
    try {
        const id_participant = req.user.id;
        const { id_niv } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id_niv)) {
            return res.status(400).json({ message: "ID niveau invalide." });
        }

        const session = await Session.findOne({ id_participant, id_niv })
            .populate('id_participant', 'nom email')
            .populate('id_niv', 'nom');

        if (!session) {
            return res.status(404).json({ message: "Session introuvable." });
        }

        res.status(200).json(session);
    } catch (error) {
        console.error("Erreur récupération session :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

/**
 * 🔹 Refaire un niveau : réinitialise la session
 * Route : POST /restart
 */
router.post('/restart', authMiddleware, async (req, res) => {
    try {
        const id_participant = req.user.id;
        const { id_niv } = req.body;

        if (!id_niv || !mongoose.Types.ObjectId.isValid(id_niv)) {
            return res.status(400).json({ message: "ID niveau invalide ou manquant." });
        }

        const session = await Session.findOne({ id_participant, id_niv });

        if (!session) {
            return res.status(404).json({ message: "Session non trouvée." });
        }

        session.quiz_reponses = [];
        session.score = 0;
        await session.save();

        res.status(200).json({ message: "Session réinitialisée. Vous pouvez recommencer le niveau." });
    } catch (error) {
        console.error("Erreur redémarrage session :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;
