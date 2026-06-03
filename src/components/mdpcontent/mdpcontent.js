import React, { useState, useRef } from 'react';
import Password from '../../img/Password.png';
import '../../pages/mdp/Motdepasse.css';
import { useNavigate } from 'react-router-dom';

function Mdpcontent() {
    const [code, setCode] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const handleChange = (value, index) => {
        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleSubmit = () => {
        const fullCode = code.join('');
        console.log('Code entré :', fullCode);
    };

    return (
        <div className="verification-container">
            <div className="point"></div>
            <div className="point1"></div>
            <div className="point2"></div>
            <div className="point3"></div>

            <div className="verification-box">
                {/* Conteneur icône + titre */}
                <div className="icon-title-container">
                    <img src={Password} alt="Mot de passe" className="password-icon" />
                    <h1 className="titlemdp">Mot de passe oublié ?</h1>
                </div>

                <p className="descriptionmdp">
                    Le code a été envoyé à votre boîte email.<br />
                    Entrez-le s’il vous plaît :
                </p>

                <div className="code-inputs">
                    {code.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={value}
                            ref={(el) => (inputRefs.current[index] = el)}
                            onChange={(e) => handleChange(e.target.value, index)}
                            className="code-input"
                        />
                    ))}
                </div>

                <p className="resend">
                    Code non reçu ?{' '}
                    <button
                        className="resend-link"
                        onClick={() => navigate('/mdp')}
                        type="button"
                    >
                        Renvoyer code
                    </button>
                </p>

                <button
                    onClick={() => {
                        handleSubmit();
                        navigate('/lost');
                    }}
                    className="submit-buttonmdp"
                >
                    Valider
                </button>
            </div>
        </div>
    );
}

export default Mdpcontent;