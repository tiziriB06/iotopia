import React, { useState } from "react";
import fleche from "../../img/fleche.png";
import trophy from "../../img/trophy.png";
import livres from "../../img/livres.png";
import { useNavigate } from "react-router-dom";

function Roadmap() {
    const [activeStep, setActiveStep] = useState(null);
    const navigate = useNavigate()
    const handleStepClick = (step) => {
        setActiveStep(step);
    };

    return (
        <div className="roadmap-container">
            <h2 className="roadmap-title">Road Map</h2>
            <p className="roadmap-description">
                Découvrez le fonctionnement de l'IOTopie : de l'inscription à la maîtrise de l'IoT
            </p>

            <div className="steps-row">
                <div className={`roadmap-step ${activeStep === 2 ? "active" : ""}`}>
                    <img src={livres} className="step-icon" />
                    <h3>Choix de la section et un héros</h3>
                    <p>Sélectionnez la catégorie qui vous intéresse : programmation , réseaux, capteurs, sécurité...sans oublier le héro qui vous motive le plus</p>
                </div>
                <div className={`roadmap-step ${activeStep === 4 ? "active" : ""}`}>
                    <h3>Lancement du Quiz</h3>
                    <p>Testez vos connaissances avec des quiz interactifs et stimulants.</p>
                </div>
            </div>

            <div className="roadmap-line-container">
                <div className="roadmap-line"></div>
                {[1, 2, 3, 4, 5].map((num) => (
                    <span
                        key={num}
                        className={`step-number ${activeStep >= num ? "active" : ""}`}
                        onClick={() => handleStepClick(num)}
                    >
                        {num}
                    </span>
                ))}
            </div>

            <div className="steps-row">
                <div className={`roadmap-step ${activeStep === 1 ? "active" : ""}`}>
                    <h3>Inscription & connexion</h3>
                    <p>Créez un compte ou connectez-vous pour commencer votre parcours en apprentissage d'IoT.</p>
                </div>
                <div className={`roadmap-step ${activeStep === 3 ? "active" : ""}`}>
                    <h3>Choix du niveau</h3>
                    <p>Commencez par le niveau 1 et progressez en débloquant les niveaux supérieurs.</p>
                </div>
                <div className={`roadmap-step ${activeStep === 5 ? "active" : ""}`}>
                    <img src={trophy} className="trophy-icon" />
                    <h3>Évaluation & score</h3>
                    <p>Recevez votre score, consultez vos progrès et débloquez de nouveaux niveaux.</p>
                </div>
            </div>

            <div className="button-wrapper">
                <div className="arrows">
                    <img src={fleche} className="arrow" />
                    <img src={fleche} className="arrow" />
                </div>
                <button className="roadmap-button" onClick={() => navigate('/begin')}>Let's begin!</button>
            </div>

        </div>
    );
}

export default Roadmap;




