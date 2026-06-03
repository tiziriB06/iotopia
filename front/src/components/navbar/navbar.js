import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logoo from "../../img/logo.png";
import './navbar.css';
import heroesData from "../../components/donne.json";
import defaultProfile from "../../img/default.jpg";

function Navbar() {
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();
    const [selectedHero, setSelectedHero] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
            const storedHeroId = localStorage.getItem('selectedHeroId');
            const hero = storedHeroId
                ? heroesData.heroes.find(h => h.id === parseInt(storedHeroId))
                : null;
            setSelectedHero(hero);
        }
    }, []);

    const handleClick = () => setClicked(!clicked);

    return (
        <nav>
            <img src={logoo} alt="Logo" className="nav-logo" />

            <div className="nav-container">
                <ul id="navbar" className={clicked ? "nav-active" : ""}>

                    <li className="navbarelement"><a role="button" onClick={() => navigate('/')}>Accueil</a></li>
                    <li className="navbarelement"><a role="button" onClick={() => navigate('/roadmap')}>Roadmap</a></li>
                    <li className="navbarelement"><a role="button" onClick={() => navigate('/dash')}>Dashboard</a></li>


                    {!isLoggedIn && (
                        <>
                            <li className="navbarelement"><a role="button" onClick={() => navigate('/connexion')}>Connexion</a></li>
                            <li className="navbarelement"><a role="button" onClick={() => navigate('/signup')}>S'inscrire</a></li>
                        </>
                    )}

                    <li className="profile-icon">
                        <div className="profile-pic" onClick={() => navigate(isLoggedIn ? '/profile' : '/Compte')}>
                            <img
                                src={isLoggedIn && selectedHero ? selectedHero.image : defaultProfile}

                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = defaultProfile;
                                }}
                            />
                            {isLoggedIn && selectedHero && (
                                <span className="profile-level">{selectedHero.level}</span>
                            )}
                        </div>
                    </li>

                </ul>
            </div>

            <div id="mobile" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
        </nav>
    );
}

export default Navbar;