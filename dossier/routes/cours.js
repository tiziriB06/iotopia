// routes/cours.js
const express = require('express');
const Cours = require('../models/cours');

const router = express.Router();

// Récupérer tous les cours (interface participant)
router.get('/', async (req, res) => {
    try {
        const cours = await Cours.find();
        res.json(cours);
    } catch (error) {
        console.error("Erreur récupération cours :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});



module.exports = router;