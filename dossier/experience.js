const mongoose = require('mongoose');
const { Schema } = mongoose;  

const quizSchema = new Schema({
    question: { type: String, required: true },  
    img_quiz: { type: String },  
    id_niv: { type: Schema.Types.ObjectId, ref: 'Niveau', required: true },  
    reponses: [{ type: String, required: true }],  
    bonne_rep: { type: String, required: true }  
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;

//  Un participant peut récupérer  l'historique de toutes ses réponses
router.get('/participant', authMiddleware, async (req, res) => {
    try {
        const id_participant = req.user.userId; //  Récupérer l'ID du participant depuis le token JWT

        //  Récupérer les réponses du participant
        const reponses = await Reponse.find({ id_participant }).select('-bonne_rep'); // Ne pas afficher la bonne réponse

        if (reponses.length === 0) {
            return res.status(404).json({ message: "Aucune réponse trouvée pour ce participant." });
        }

        res.status(200).json(reponses);
    } catch (error) {
        console.error(" Erreur récupération réponses :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;


