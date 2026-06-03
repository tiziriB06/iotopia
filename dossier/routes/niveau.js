const express = require('express');
const Niveau = require('../models/niveau');
const authMiddleware = require('../middleware/authMiddleware');
const Session = require('../models/session');

const router = express.Router();

// Récupérer un niveau par ID (seulement utilisateurs connectés)
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const niveau = await Niveau.findById(req.params.id);
        if (!niveau) {
            return res.status(404).json({ message: "Niveau non trouvé" });
        }
        res.json(niveau);
    } catch (error) {
        console.error("Erreur récupération niveau :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// Récupérer les niveaux d'une section spécifique (seulement utilisateurs connectés)
router.get('/section/:id_section', authMiddleware, async (req, res) => {
    try {
        const sectionIdFromParams = req.params.id_section;
        console.log("ID Section reçu dans la route:", sectionIdFromParams); // LOG 1
        console.log("Type de ID Section reçu:", typeof sectionIdFromParams); // LOG 2

        const niveaux = await Niveau.find({ id_sct: sectionIdFromParams });
        console.log("Résultat de Niveau.find:", niveaux); // LOG 3
        res.json(niveaux);
    } catch (error) {
        console.error(" Erreur récupération niveaux par section :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// Cette route est déjà protégée, pas besoin de changement
router.get('/section/:id_section/status', authMiddleware, async (req, res) => {
    try {
        const id_section = req.params.id_section;
        const id_participant = req.user.id;
        
        // Récupérer tous les niveaux de la section
        const niveaux = await Niveau.find({ id_sct: id_section }).sort({ num_niv: 1 });
        
        if (!niveaux.length) {
            return res.status(404).json({ message: "Aucun niveau trouvé pour cette section." });
        }
        
        // Récupérer les sessions de l'utilisateur pour ces niveaux
        const sessions = await Session.find({ 
            id_participant, 
            id_niv: { $in: niveaux.map(n => n._id) } 
        });
        
        // Préparer le statut de chaque niveau
        const niveauxAvecStatut = niveaux.map(niveau => {
            // Trouver la session pour ce niveau si elle existe
            const session = sessions.find(s => s.id_niv.toString() === niveau._id.toString());
            
            // Déterminer si le niveau est débloqué
            let estDebloque = false;
            
            // Le niveau 1 est toujours débloqué
            if (niveau.num_niv === 1) {
                estDebloque = true;
            } else {
                // Un niveau est débloqué si le niveau précédent est validé
                const niveauPrecedent = niveaux.find(n => n.num_niv === niveau.num_niv - 1);
                if (niveauPrecedent) {
                    const sessionPrecedente = sessions.find(s => 
                        s.id_niv.toString() === niveauPrecedent._id.toString() && s.niv_valide
                    );
                    estDebloque = !!sessionPrecedente;
                }
            }
            
            // Déterminer le statut et le nombre d'étoiles
            const statut = session && session.niv_valide ? 'completed' :
                           estDebloque ? 'unlocked' : 'locked';
            
            // Calculer les étoiles en fonction du score (si niveau complété)
            let etoiles = 0;
            if (session && session.niv_valide) {
                if (session.score >= 90) etoiles = 3;
                else if (session.score >= 70) etoiles = 2;
                else etoiles = 1;
            }
            
            return {
                _id: niveau._id,
                num_niv: niveau.num_niv,
                statut: statut,
                score: session ? session.score : 0,
                etoiles: etoiles
            };
        });
        
        res.status(200).json(niveauxAvecStatut);
    } catch (error) {
        console.error("Erreur récupération statut niveaux:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;