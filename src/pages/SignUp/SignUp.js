import { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import fleche from "../../img/fleche.png";
import { useApiRequest } from "../../hooks/useApiRequest";

function SignUp() {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();
  const { data, error, loading, request } = useApiRequest();

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const user = await request("/auth/request-signup", "POST", {
        email: signUpData.email,
        mdp: signUpData.password,
        username: signUpData.name,
      });
      console.log(user);
      setShowVerificationPopup(true);
    } catch (err) {
      console.error("Erreur d'inscription :", err);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/auth/login", "POST", {
        email: signInData.email,
        mdp: signInData.password,
      });
      console.log("Connexion réussie :", response);
      localStorage.setItem("token", response.token);
      const user = await request("/user/profile", "GET");
      console.log(user);
      navigate("/perso");
    } catch (err) {
      console.error("Erreur de connexion :", err);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/auth/verify-signup", "POST", {
        email: signUpData.email,
        confirmationCode: verificationCode,
      });
      console.log("Code de vérification validé:", response);
      navigate("/valid");
    } catch (err) {
      console.error("Erreur lors de la vérification du code", err);
    }
  };

  const toggleView = () => {
    document.querySelector(".auth-card").classList.add("flipping");
    setTimeout(() => {
      setIsSignIn(!isSignIn);
      setTimeout(() => {
        document.querySelector(".auth-card").classList.remove("flipping");
      }, 50);
    }, 400);
  };

  return (
    <div className="auth-container">
      <div className="point"></div>
      <div className="point1"></div>
      <div className="point2"></div>
      <div className="point3"></div>
      <div className="point4"></div>
      {error && <p className="error-text">{error.message || "Une erreur est survenue."}</p>}
      {data && <p className="success-text">Inscription réussie !</p>}

      <div className="fleches-signup" onClick={() => navigate("/perso")}>
        <img src={fleche} className="fleche-signup" alt="←" />
        <img src={fleche} className="fleche-signup" alt="←" />
      </div>

      {showVerificationPopup && (
        <div className="verification-popup">
          <div className="popup-content">
            <h2>Vérification de l'inscription</h2>
            <p>Un code de vérification a été envoyé à votre email. Entrez-le ci-dessous.</p>
            <form onSubmit={handleVerificationSubmit}>
              <input
                type="text"
                placeholder="Code de 4 chiffres"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={4}
                className="verification-input"
              />
              <button type="submit" className="auth-button">
                valider
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={`auth-card ${isSignIn ? "sign-in-active" : "sign-up-active"}`}>
        {isSignIn ? (
          <>
            <div className="auth-section left">
              <h1 className="auth-title">Sign in</h1>
              <form onSubmit={handleSignIn} className="auth-form">
                <input
                  type="email"
                  placeholder="Email"
                  className="auth-input"
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="auth-input"
                  value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                />
                <button type="submit" className="auth-button">
                  SIGN IN
                </button>
              </form>
              <a role="button" onClick={() => navigate("/confirm")} className="auth-link">
                Mot de passe oublié ?
              </a>
            </div>
            <div className="auth-section right">
              <div className="welcome-content">
                <h2 className="welcome-title">Bienvenue dans</h2>
                <h2 className="brand-title">IOTopie !</h2>
                <p className="welcome-text">Nouveau ici ?</p>
                <button onClick={toggleView} className="auth-button">
                  SIGN UP
                </button>
              </div>
              <div className="diagonal-decoration right-diagonal"></div>
            </div>
          </>
        ) : (
          <>
            <div className="auth-section left">
              <div className="welcome-content">
                <h2 className="welcome-title">De retour sur</h2>
                <h2 className="brand-title">IOTopie !</h2>
                <p className="welcome-text">on t'attendait....Connecte-toi !</p>
                <button onClick={toggleView} className="auth-button">
                  SIGN IN
                </button>
              </div>
              <div className="diagonal-decoration left-diagonal"></div>
            </div>
            <div className="auth-section right">
              <h1 className="auth-title">Sign Up</h1>
              <form onSubmit={handleSignUp} className="auth-form">
                <input
                  type="text"
                  placeholder="Nom"
                  className="auth-input"
                  value={signUpData.name}
                  onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="auth-input"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="auth-input"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                />
                <button type="submit" className="auth-button">
                  SIGN UP
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUp;
