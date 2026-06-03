const express = require('express');
const Section = require('../models/section');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// 🔍 Récupérer toutes les sections (protégé - utilisateurs connectés uniquement)
router.get('/', authMiddleware, async (req, res) => {
    try {
        console.log("📥 Requête GET /sections reçue !");
        const sections = await Section.find().sort({ createdAt: -1 });
        console.log("📌 Sections trouvées :", sections.length);
        res.json(sections);
    } catch (error) {
        console.error("❌ Erreur récupération sections :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// 🔎 Récupérer une section par ID (protégé - utilisateurs connectés uniquement)
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);
        if (!section) {
            return res.status(404).json({ message: "Section non trouvée" });
        }
        console.log("🔍 Section trouvée :", section.type_sct);
        res.json(section);
    } catch (error) {
        console.error("❌ Erreur récupération section :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;