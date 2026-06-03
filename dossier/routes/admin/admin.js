const express = require('express');
const { isAdmin } = require('../../middleware/authAdmin'); 
const quizAdminRoutes = require('./quizAdmin');
const sectionAdminRoutes = require('./sectionAdmin');
const niveauAdminRoutes = require('./niveauAdmin');
const coursAdminRoutes = require('./coursAdmin');
const userAdminRoutes = require('./userAdmin');
const statistiquesRoutes = require('./statistiques');


const router = express.Router();

// Middleware global pour protéger toutes les routes admin
router.use(isAdmin);

// Routes pour chaque gestion admin
router.use('/quiz', quizAdminRoutes);
router.use('/sections', sectionAdminRoutes);
router.use('/niveaux', niveauAdminRoutes);
router.use('/cours', coursAdminRoutes);
router.use('/users', userAdminRoutes);
router.use('/statistiques', statistiquesRoutes);

module.exports = router;
