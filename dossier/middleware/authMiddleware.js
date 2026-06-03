const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    console.log(" Vérification du token en cours...");

    const token = req.header("Authorization");
    console.log(" Token reçu :", token);

    if (!token) {
        console.log(" Aucun token reçu !");
        return res.status(401).json({ message: "Accès refusé : Aucun token fourni." });
    }

    try {
        const cleanToken = token.replace("Bearer ", "").trim();
        console.log(" Token nettoyé :", cleanToken);

        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
        console.log(" Contenu du token décodé :", decoded);

        if (!decoded.userId) {
            console.log(" `userId` manquant dans le token décodé !");
            return res.status(403).json({ message: "Token invalide : `userId` manquant." });
        }

        req.user = { id: decoded.userId }; //  Correction ici
        console.log("req.user après injection :", req.user);

        next();
    } catch (error) {
        console.error(" Erreur de token :", error);
        res.status(403).json({ message: "Token invalide ou expiré." });
    }
};

