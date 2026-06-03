// routes/authentification.js
const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes d'inscription en deux étapes
router.post('/request-signup', authController.requestSignup);  // Première étape - Demande de code
router.post('/verify-signup', authController.verifySignupCode);  // Deuxième étape - Vérification et création


// Authentification classique
router.post('/login', authController.login);  // Connexion
router.post('/logout', authMiddleware, authController.logout);  // Déconnexion

// Gestion des mots de passe
router.post('/forgot-password', authController.forgotPassword);  // Demande de réinitialisation
router.post('/reset-password', authController.resetPassword);  // Réinitialisation avec code


module.exports = router;