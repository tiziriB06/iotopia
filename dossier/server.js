require('dotenv').config();
console.log(" Clé JWT après chargement :", process.env.JWT_SECRET);

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

console.log(" MONGO_URI =", process.env.MONGO_URI); // Vérification
console.log(" Clé JWT :", process.env.JWT_SECRET);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000; //  Port dynamique

//  Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));  // Pour analyser les données de formulaire URL-encoded

// Connexion à MongoDB Atlas
console.log(" URL MongoDB utilisée :", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI ,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(' MongoDB connecté'))
    .catch(err => console.error(' Erreur MongoDB:', err));

//  Log des requêtes reçues
app.use((req, res, next) => {
    console.log(`Requête reçue : "${req.method} ${req.url}"`);
    console.log(" Headers reçus :", req.headers);
    next();
});


//  Importer les routes **pour les participants et l’authentification**
const authRoutes = require('./routes/authentification'); 
const userRoutes = require('./routes/user'); // Gestion des comptes utilisateurs (profil, modif)
const coursRoutes = require('./routes/cours'); 
const sectionRoutes = require('./routes/section'); 
const niveauRoutes = require('./routes/niveau'); 
const quizRoutes = require('./routes/quiz'); 
const reponseRoutes = require('./routes/reponse'); 
const sessionRoutes = require('./routes/session'); 
const heroRoutes = require('./routes/hero');
const statistiquesRoutes = require('./routes/admin/statistiques');//// Importation de la route de statistiques admin



app.use('/admin/statistiques', statistiquesRoutes); // Ajout de la route pour les statistiques admin
app.use('/auth', authRoutes);  //  Authentification (signup, login, etc.)
app.use('/user', userRoutes);  //  Gestion des utilisateurs (hors admin)
app.use('/cours', coursRoutes);
app.use('/sections', sectionRoutes);
app.use('/niveaux', niveauRoutes);
app.use('/quiz', quizRoutes);
app.use('/reponses', reponseRoutes);
app.use('/session', sessionRoutes);
app.use('/heroes', heroRoutes);

//  Importer les routes **Admin (gestion des contenus et utilisateurs)**
const adminRoutes = require('./routes/admin/admin'); //  Centralisation des routes admin avec `isAdmin`
app.use('/admin', adminRoutes); //  Toutes les routes admin sont maintenant protégées automatiquement

//  Middleware pour gérer les routes non trouvées
app.use((req, res) => {
    res.status(404).json({ message: "Route non trouvée !" });
});

//  Démarrer le serveur avec un port libre
const server = app.listen(PORT, () => {
    const assignedPort = server.address().port;
    console.log(` Serveur lancé sur http://localhost:${assignedPort}`);
});

//  Gestion globale des erreurs du serveur
server.on('error', (err) => {
    console.error(" Erreur serveur :", err);
});
