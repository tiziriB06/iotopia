// Importation des modules nécessaires
const User = require('../models/user');
const VerificationCode = require('../models/verificationCode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Importation des middlewares
const authMiddleware = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/authAdmin');

const blacklist = [];

require('dotenv').config();

// 1. Demande d'inscription - Envoie un code de vérification
exports.requestSignup = async (req, res) => {
    try {
        const { email, mdp, username } = req.body;

        // Validation des entrées
        if (!email || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
            return res.status(400).json({ message: "Email invalide" });
        }

        if (!mdp || !username) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        
        // Vérification de l'existence de l'utilisateur
        if (await User.findOne({ email })) {
            return res.status(409).json({ message: 'Email déjà utilisé' });
        }

        // Génération du code de vérification
        const code = crypto.randomInt(1000, 9999).toString();
        
        // Stockage du code et des informations dans la base de données
        // D'abord supprimer tout code existant pour cet email
        await VerificationCode.deleteOne({ email });
        
        // Créer un nouveau code de vérification
        const verificationCode = new VerificationCode({
            email,
            code,
            userData: {
                mdp,
                username
            },
            expires: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
        });
        
        await verificationCode.save();

        // Envoi du code par email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"ioTopia" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Confirmation d'inscription",
            html: `
                <h2>Merci pour votre inscription !</h2>
                <p>Votre code de vérification est : <strong>${code}</strong></p>
                <p>Ce code expirera dans 15 minutes.</p>
                <p>Si vous n'avez pas demandé cette inscription, veuillez ignorer cet email.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email de vérification envoyé à ${email}`);
        
        return res.status(200).json({ 
            message: "Code de vérification envoyé à votre email",
            status: "VERIFICATION_PENDING"
        });
    } catch (error) {
        console.error("Erreur lors de la demande d'inscription:", error);
        return res.status(500).json({ 
            message: "Échec de l'envoi du code de vérification",
            error: error.message
        });
    }
};

// 2. Vérification du code et création du compte
exports.verifySignupCode = async (req, res) => {
    try {
        const { email, confirmationCode } = req.body;

        if (!email || !confirmationCode) {
            return res.status(400).json({ message: "Email et code de confirmation requis" });
        }

        // Vérification du code dans la base de données
        const verificationData = await VerificationCode.findOne({ 
            email, 
            code: confirmationCode,
            expires: { $gt: new Date() } // Vérifier que le code n'est pas expiré
        });

        if (!verificationData) {
            return res.status(400).json({ message: "Code invalide ou expiré" });
        }

        // Création du compte avec les données stockées
        const hashedPassword = await bcrypt.hash(verificationData.userData.mdp, 10);
        const user = new User({
            email,
            mdp: hashedPassword,
            role: "Participant", // Par défaut
            username: verificationData.userData.username,
            isVerified: true
        });

        await user.save();
        
        // Suppression du code de vérification utilisé
        await VerificationCode.deleteOne({ _id: verificationData._id });

        // Génération du token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(201).json({ 
            message: 'Inscription réussie !', 
            token,
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
                username: user.username
            }
        });
    } catch (error) {
        console.error("Erreur lors de la vérification du code:", error);
        return res.status(500).json({ 
            message: "Erreur lors de la vérification du code",
            error: error.message
        });
    }
};

// 3. Fonction de connexion (login)
exports.login = async (req, res) => { 
    try {
        const { email, mdp } = req.body;

        if (!email || !mdp) {
            return res.status(400).json({ message: "Tous les champs requis doivent être fournis." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const isMatch = await bcrypt.compare(mdp, user.mdp);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        console.log("Connexion réussie pour :", user.email);
        
        res.status(200).json({ 
            message: 'Connexion réussie !', 
            token, 
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// 4. Fonction de déconnexion (logout)
exports.logout = (req, res) => { 
    try {
        const token = req.headers.authorization?.split(" ")[1]; 

        if (token) {
            blacklist.push(token); 
            console.log("Token ajouté à la blacklist :", token);
        }

        res.status(200).json({ message: 'Déconnexion réussie !' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// 5. Mot de passe oublié
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: "L'email est requis." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Génération d'un code à 4 chiffres
        const resetCode = crypto.randomInt(1000, 9999).toString();
        
        // Stockage du code et de sa date d'expiration dans la base de données
        user.resetPasswordCode = resetCode;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // Expire dans 15 minutes
        
        await user.save();

        // Configuration de nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Envoi de l'email
        await transporter.sendMail({
            from: `"ioTopia" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Votre code de réinitialisation de mot de passe",
            text: `Votre code de réinitialisation est : ${resetCode}. Il expire dans 15 minutes.`
        });

        console.log(`Email de réinitialisation envoyé à: ${email}`);
        return res.status(200).json({ message: "Code de réinitialisation envoyé à votre e-mail." });

    } catch (error) {
        console.error("Erreur dans forgotPassword:", error);
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// 6. Réinitialisation du mot de passe

//    le truc de local storage:
//Email	✅ Oui	Pour éviter de le redemander
//resetCode (4 chiffres)	❌ Non	Trop sensible, jamais connu côté frontend


exports.resetPassword = async (req, res) => {
    try {
        const { email, resetcode, newPassword } = req.body;

        if (!email || !resetcode || !newPassword) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        // Utilisez l'option select pour inclure explicitement les champs masqués
        const user = await User.findOne({ email }).select('+resetPasswordCode +resetPasswordExpires');

        if (!user) {
            return res.status(400).json({ message: "Code invalide ou expiré." });
        }

        if (user.resetPasswordCode !== resetcode || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: "Code invalide ou expiré." });
        }
        

        // Vérifier à nouveau le code
        if (user.resetPasswordCode !== resetcode) {
            return res.status(400).json({ message: "Problème avec l'enregistrement du code." });
        }

        // Hachage du nouveau mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.mdp = hashedPassword;
        
        // Effacement des champs de réinitialisation
        user.resetPasswordCode = undefined;
        user.resetPasswordExpires = undefined;
        
        await user.save();

        return res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
    } catch (error) {
        console.error("Erreur dans resetPassword:", error);
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

