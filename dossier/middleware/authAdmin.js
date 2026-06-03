const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: "Accès refusé. Aucun token fourni." });
    }

    try {
        const token = req.headers.authorization.split(" ")[1]; // Récupérer le token sans "Bearer"
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("🆔 Utilisateur injecté dans req.user :", decoded); // ➡️ Ajout de cette ligne

        if (decoded.role.toLowerCase() !== "admin") {
            return res.status(403).json({ message: "Accès refusé. Permission administrateur requise." });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide !" });
    }
};

module.exports = { isAdmin };