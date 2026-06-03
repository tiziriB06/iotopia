import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import './compte.css';
import Axel from "../../img/Axel.png";
import Luna from '../../img/luna.png';
import Nova from '../../img/Nova.png';
import Erreur from '../Erreur/erreur';
import { useNavigate } from 'react-router-dom';




function Compte() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            const userEmail = localStorage.getItem("userEmail");
            const response = await fetch('/users.json');
            const data = await response.json();
            const currentUser = data.find(user => user.email === userEmail);
            setUser(currentUser);
        };
        fetchUserData();
    }, []);

    if (!user) { return <Erreur />; }
    /*
  const handlePasswordChange = (e) => {
      setNewPassword(e.target.value);
  };
  const handleSubmit = (e) => {
      e.preventDefault();
 
      if (newPassword.length < 6) {
          setError("Le mot de passe doit comporter au moins 6 caractères.");
          return;*/

    return (
        <>
            <Navbar />

            <div className="point"></div>
            <div className="point1"></div>
            <div className="point2"></div>
            <div className="point3"></div>
            <div className="point4"></div>

            <div className="title-compte">
                <h2>Mon compte</h2>
            </div>

            <div className="information">
                <h2>Nom complet <span style={{ color: 'red' }}>*</span></h2>
                <input
                    type="text"
                    className="tab1"
                    placeholder="Entrez votre nom complet"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                { /*div className="tab1">{user.username}</div>*/}


                <h2>Email <span style={{ color: 'red' }}>*</span></h2>
                <input
                    type="email"
                    className="tab1"
                    placeholder="Entrez votre mail "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <h2>Mot de passe actuel  <span style={{ color: 'red' }}>*</span></h2>
                <div className="tab1">****</div>
                {/*<div className="tab1">{'*'.repeat(user.mdp.length)}</div>*/}


                <h2
                    className="clickable-title"
                    onClick={() => navigate('/modifmdp')}
                >
                    Nouveau mot de passe
                </h2>


                <div className="heross">
                    <img src={Axel} className="heross" />
                    {/*<img src={selectedHeroImage} alt={user.heroChoisi} className="heross" />*/}
                </div>
            </div>
        </>
    )
}
export default Compte;
