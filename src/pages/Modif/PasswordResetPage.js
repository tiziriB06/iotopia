import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, LockIcon, CheckCircleIcon } from 'lucide-react';
import './modif.css';

export default function PasswordResetPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(2);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div className="space">
      <div className="password-card">
        <div className="headersp">
          <h2>
            {step === 2 && "Créer un nouveau mot de passe"}
            {step === 3 && "Mot de passe réinitialisé"}
          </h2>
          <p>
            {step === 2 && "Créez un nouveau mot de passe sécurisé"}
            {step === 3 && "Votre mot de passe a été réinitialisé avec succès"}
          </p>
        </div>

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

            {error && <p className="error">{error}</p>}

            <div className="button-group">
              <button type="submit" className="primary-button">
                Réinitialiser le mot de passe
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
            <button className="laeti" onClick={() => navigate('/succes')}>
              Se connecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}