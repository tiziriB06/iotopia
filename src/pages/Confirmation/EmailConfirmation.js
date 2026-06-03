import { useState } from 'react';
import './confirmation.css';
import { useNavigate } from 'react-router-dom';

const EmailConfirmation = () => {
    const [email, setEmail] = useState('');
    const [confirmedEmail, setConfirmedEmail] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };


    const handleConfirmEmail = () => {

        setErrorMessage('');

        if (!email) {
            setErrorMessage('Veuillez entrer une adresse email');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("L'adresse email n'est pas valide");
            return;
        }
        setConfirmedEmail(email);
        setIsSaved(true);
        navigate('/mdp');

        console.log('Email sauvegardé:', email);
        localStorage.setItem('userEmail', email);
    };

    return (
        <div className="email-confirmation">
            <h1>Confirmation de votre adresse email</h1>

            <div className="email-form">
                <label htmlFor="email">Votre adresse email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@domaine.com"
                />
            </div>

            <button onClick={handleConfirmEmail}>
                Confirmer
            </button>
            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}

            {isSaved && (
                <div className="success-message">
                    Votre adresse email {confirmedEmail} a été enregistrée avec succès!
                </div>
            )}
        </div>
    );
};

export default EmailConfirmation;
