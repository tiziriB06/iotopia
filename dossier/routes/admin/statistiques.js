const express = require('express');
const router = express.Router();
const { isAdmin } = require('../../middleware/authAdmin');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Visite = require('../../models/visite');
const Reponse = require('../../models/reponse');
const Section = require('../../models/section');
const Quiz = require('../../models/quiz');
const User = require('../../models/user');

// Route protégée pour statistiques
router.get('/', isAdmin, async (req, res) => {
    try {
        // Récupération des dates si fournies
        let { startDate, endDate } = req.query;
        
        // Valeurs par défaut pour les dates si non fournies
        if (!startDate) {
            // Par défaut: 30 jours en arrière
            const defaultStartDate = new Date();
            defaultStartDate.setDate(defaultStartDate.getDate() - 30);
            startDate = defaultStartDate.toISOString().split('T')[0].split('-').reverse().join('-'); // Format DD-MM-YYYY
        }
        
        if (!endDate) {
            // Par défaut: aujourd'hui
            const defaultEndDate = new Date();
            endDate = defaultEndDate.toISOString().split('T')[0].split('-').reverse().join('-'); // Format DD-MM-YYYY
        }
        
        // Récupération des paramètres spécifiques pour chaque statistique
        const { 
            niveauSectionId,       // Pour filtrer niveauMoyenParSection
            scoreSectionId,        // Pour filtrer scoreUtilisateurs (section)
            scoreNiveau            // Pour filtrer scoreUtilisateurs (niveau)
        } = req.query;

        // Filtrage par période
        const dateFilter = {};
        dateFilter.createdAt = {};
        
        try {
            // Parse date string (handling DD-MM-YYYY format)
            const parts = startDate.split('-');
            if (parts.length === 3) {
                // Assuming DD-MM-YYYY format
                const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                dateFilter.createdAt.$gte = new Date(formattedDate);
            } else {
                dateFilter.createdAt.$gte = new Date(startDate);
            }
        } catch (err) {
            console.error('Error parsing startDate:', err);
            dateFilter.createdAt.$gte = new Date(0); // Default to epoch start
        }
        
        try {
            // Parse date string (handling DD-MM-YYYY format)
            const parts = endDate.split('-');
            if (parts.length === 3) {
                // Assuming DD-MM-YYYY format
                const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                dateFilter.createdAt.$lte = new Date(formattedDate);
            } else {
                dateFilter.createdAt.$lte = new Date(endDate);
            }
        } catch (err) {
            console.error('Error parsing endDate:', err);
            dateFilter.createdAt.$lte = new Date(); // Default to current date
        }

        console.log('Date filter applied:', JSON.stringify(dateFilter));
        console.log('Niveau Section ID:', niveauSectionId);
        console.log('Score Section ID:', scoreSectionId);
        console.log('Score Niveau:', scoreNiveau);

        // 1. Nombre total de visites
        const totalVisites = await Visite.countDocuments(dateFilter);
        console.log('Visite count:', totalVisites);

        // 2. Nombre total d'utilisateurs inscrits
        const totalUsers = await User.countDocuments(dateFilter);
        console.log('User count:', totalUsers);

        // 3. Nombre total de réponses
        const totalReponses = await Reponse.countDocuments(dateFilter);
        console.log('Reponse count:', totalReponses);

        // 4. Popularité des sections
        const populariteSections = await Reponse.aggregate([
            { $match: dateFilter },
            {
                $lookup: {
                    from: 'quiz',
                    localField: 'id_quiz',
                    foreignField: '_id',
                    as: 'quizInfo'
                }
            },
            { $unwind: '$quizInfo' },
            {
                $lookup: {
                    from: 'sections',
                    localField: 'quizInfo.id_niv',
                    foreignField: '_id',
                    as: 'sectionInfo'
                }
            },
            { $unwind: '$sectionInfo' },
            {
                $group: {
                    _id: '$sectionInfo._id',
                    nomSection: { $first: '$sectionInfo.nom' },
                    totalReponses: { $sum: 1 }
                }
            },
            { $sort: { totalReponses: -1 } }
        ]);
        console.log('Popularité sections:', populariteSections);

        // 5. Difficulté des sections (taux de mauvaises réponses)
        const difficulteSections = await Reponse.aggregate([
            { $match: dateFilter },
            {
                $lookup: {
                    from: 'quiz',
                    localField: 'id_quiz',
                    foreignField: '_id',
                    as: 'quizInfo'
                }
            },
            { $unwind: '$quizInfo' },
            {
                $lookup: {
                    from: 'sections',
                    localField: 'quizInfo.id_niv',
                    foreignField: '_id',
                    as: 'sectionInfo'
                }
            },
            { $unwind: '$sectionInfo' },
            {
                $group: {
                    _id: '$sectionInfo._id',
                    nomSection: { $first: '$sectionInfo.nom' },
                    total: { $sum: 1 },
                    mauvaises: {
                        $sum: {
                            $cond: [{ $eq: ['$est_correcte', false] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    nomSection: 1,
                    tauxErreur: {
                        $round: [
                            { $multiply: [{ $divide: ['$mauvaises', '$total'] }, 100] },
                            1
                        ]
                    }
                }
            },
            { $sort: { tauxErreur: -1 } }
        ]);
        console.log('Difficulté sections:', difficulteSections);

        // 6. Score moyen des utilisateurs filtré par section et niveau (si fournis)
        // Cette fois-ci, on calcule la moyenne globale, pas individuelle
        const scoreAggregation = [
            // Filtrer par date
            { $match: dateFilter },
            
            // Joindre avec les quiz pour obtenir le niveau
            {
                $lookup: {
                    from: 'quiz',
                    localField: 'id_quiz',
                    foreignField: '_id',
                    as: 'quizInfo'
                }
            },
            { $unwind: '$quizInfo' },
            
            // Joindre avec les sections pour obtenir le nom de la section
            {
                $lookup: {
                    from: 'sections',
                    localField: 'quizInfo.id_niv',
                    foreignField: '_id',
                    as: 'sectionInfo'
                }
            },
            { $unwind: '$sectionInfo' },
        ];
        
        // Ajouter le filtre par section pour le score si fourni
        if (scoreSectionId) {
            scoreAggregation.push({
                $match: {
                    'sectionInfo._id': new ObjectId(scoreSectionId)
                }
            });
        } else {
            // S'il n'y a pas de section définie, on prend la première section disponible par défaut
            const defaultSection = await Section.findOne({}, { _id: 1 }).sort({ _id: 1 });
            if (defaultSection) {
                scoreAggregation.push({
                    $match: {
                        'sectionInfo._id': defaultSection._id
                    }
                });
                console.log('Default section used for score:', defaultSection._id);
            }
        }
        
        // Ajouter le filtre par niveau pour le score si fourni
        if (scoreNiveau) {
            scoreAggregation.push({
                $match: {
                    'quizInfo.niveau': parseInt(scoreNiveau, 10)
                }
            });
        } else {
            // S'il n'y a pas de niveau défini, on prend le niveau 1 par défaut
            scoreAggregation.push({
                $match: {
                    'quizInfo.niveau': 1
                }
            });
            console.log('Default niveau used for score: 1');
        }
        
        // Continuer l'agrégation pour le calcul du score moyen global (pas individuel)
        scoreAggregation.push(
            // Grouper par section et niveau (plus par utilisateur)
            {
                $group: {
                    _id: {
                        sectionId: '$sectionInfo._id',
                        niveau: '$quizInfo.niveau'
                    },
                    nomSection: { $first: '$sectionInfo.nom' },
                    scoreTotal: {
                        $sum: {
                            $cond: [{ $eq: ['$est_correcte', true] }, 1, 0]
                        }
                    },
                    totalReponses: { $sum: 1 }
                }
            },
            
            // Calculer le pourcentage moyen de réponses correctes
            {
                $project: {
                    _id: 0,
                    sectionId: '$_id.sectionId',
                    niveau: '$_id.niveau',
                    nomSection: 1,
                    totalReponses: 1,
                    scoreMoyen: {
                        $round: [
                            { $multiply: [{ $divide: ['$scoreTotal', '$totalReponses'] }, 100] },
                            1
                        ]
                    }
                }
            },
            
            // Trier par section, niveau
            {
                $sort: {
                    nomSection: 1,
                    niveau: 1
                }
            }
        );
        
        const scoreUtilisateurs = await Reponse.aggregate(scoreAggregation);

        // 7. Niveau moyen atteint par les utilisateurs (filtré par section si fourni)
        const niveauFilter = { ...dateFilter };
        
        // Si une section est spécifiée pour le niveau moyen
        if (niveauSectionId) {
            try {
                niveauFilter.sectionId = new ObjectId(niveauSectionId);
            } catch (err) {
                console.error('Erreur lors de la conversion de niveauSectionId en ObjectId:', err);
                // Continuer sans ce filtre
            }
        } else {
            // S'il n'y a pas de section définie, on prend la première section disponible par défaut
            const defaultSection = await Section.findOne({}, { _id: 1 }).sort({ _id: 1 });
            if (defaultSection) {
                niveauFilter.sectionId = defaultSection._id;
                console.log('Default section used for niveau:', defaultSection._id);
            }
        }
        
        const niveauMoyenParSection = await User.aggregate([
            // Filtrer par date et section
            { $match: niveauFilter },
            // Regrouper par section et calculer la moyenne des niveaux
            {
                $group: {
                    _id: '$sectionId',
                    niveauMoyen: { $avg: '$niveau' }
                }
            },
            // Joindre avec la collection sections pour obtenir le nom de la section
            {
                $lookup: {
                    from: 'sections',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'sectionInfo'
                }
            },
            { $unwind: { path: '$sectionInfo', preserveNullAndEmptyArrays: true } },
            // Formater le résultat avec arrondi
            {
                $project: {
                    _id: 0,
                    sectionId: '$_id',
                    nomSection: { $ifNull: ['$sectionInfo.nom', 'Section inconnue'] },
                    niveauMoyen: { $round: [{ $ifNull: ['$niveauMoyen', 0] }, 2] }
                }
            }
        ]);
        
        // Envoi des données
        res.json({
            totalVisites,
            totalUsers,
            totalReponses,
            populariteSections,
            difficulteSections,
            scoreUtilisateurs,
            niveauMoyenParSection
        });

    } catch (err) {
        console.error('Erreur dans /admin/statistiques :', err.message);
        console.error('Stack trace:', err.stack);
        res.status(500).json({ message: 'Erreur serveur interne.' });
    }
});

module.exports = router;