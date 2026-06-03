import { useState } from 'react';
import { EyeIcon, EyeOffIcon, LockIcon, CheckCircleIcon } from 'lucide-react';
import './creation.css';
import { useNavigate } from 'react-router-dom';

export default function Creat() {
    const [step, setStep] = useState(1);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const handleCurrentPasswordVerification = (e) => {
        e.preventDefault();
        if (currentPassword.length < 6) {
            setError('Mot de passe incorrect');
            return;
        }

        setError('');
        setStep(2);
    };

    const handlePasswordReset = (e) => {
        e.preventDefault();
        if (newPassword.length < 8) {
            setError('Le nouveau mot de passe doit contenir au moins 8 caractères');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
        setError('');
        setStep(3);
    };
    const navigate = useNavigate();
    return (
        <div className="cont">
            <div className="point"></div>
            <div className="point1"></div>
            <div className="point2"></div>
            <div className="point3"></div>
            <div className="point4"></div>
            <div className="password-card">
                <div className="header">
                    <h2>
                        {step === 1 && "Confirmation de sécurité"}
                        {step === 2 && "Créer un nouveau mot de passe"}
                        {step === 3 && "Mot de passe réinitialisé"}
                    </h2>
                    <p>
                        {step === 1 && "Veuillez confirmer votre mot de passe actuel"}
                        {step === 2 && "Créez un nouveau mot de passe sécurisé"}
                        {step === 3 && "Votre mot de passe a été réinitialisé avec succès"}
                    </p>
                </div>

                {step === 1 && (
                    <form className="form" onSubmit={handleCurrentPasswordVerification}>
                        <div className="input-group">
                            <div className="input-container">
                                <label htmlFor="current-password" className="sr-only">Mot de passe actuel</label>
                                <div className="icon-left">
                                    <LockIcon className="icon" />
                                </div>
                                <input
                                    id="current-password"
                                    name="current-password"
                                    type={showCurrentPassword ? "text" : "password"}
                                    required
                                    className="input"
                                    placeholder="Mot de passe actuel"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? (
                                        <EyeOffIcon className="icon" />
                                    ) : (
                                        <EyeIcon className="icon" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="error">{error}</p>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="primary-button"
                            >
                                Continuer
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form className="form" onSubmit={handlePasswordReset}>
                        <div className="input-groups">
                            <div className="input-container">
                                <label htmlFor="new-password" className="sr-only">Nouveau mot de passe</label>
                                <div className="icon-left">
                                    <LockIcon className="icon" />
                                </div>
                                <input
                                    id="new-password"
                                    name="new-password"
                                    type={showNewPassword ? "text" : "password"}
                                    required
                                    className="input"
                                    placeholder="Nouveau mot de passe"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? (
                                        <EyeOffIcon className="icon" />
                                    ) : (
                                        <EyeIcon className="icon" />
                                    )}
                                </button>
                            </div>

                            <div className="input-container">
                                <label htmlFor="confirm-password" className="sr-only">Confirmer le mot de passe</label>
                                <div className="icon-left">
                                    <LockIcon className="icon" />
                                </div>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    className="input"
                                    placeholder="Confirmer le mot de passe"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOffIcon className="icon" />
                                    ) : (
                                        <EyeIcon className="icon" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="error">{error}</p>
                        )}

                        <div className="button-group">
                            <button
                                type="submit"
                                className="primary-button"
                            >
                                Réinitialiser le mot de passe
                            </button>
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() => setStep(1)}
                            >
                                Retour
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <div className="success-container">
                        <div className="success-icon">
                            <CheckCircleIcon />
                        </div>
                        <h3>Mot de passe réinitialisé avec succès</h3>
                        <p>Votre mot de passe a bien été mis à jour.</p>
                        <div>
                            <button
                                type="button"
                                className="primary-button"
                                onClick={() => {
                                    navigate('/connexion')
                                }}
                            >
                                Se connecter
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}