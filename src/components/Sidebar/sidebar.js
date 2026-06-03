import React from 'react';
import './sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';

import dash from '../../img/Dashboard.png';
import laeti from '../../img/laeti.png';
import user from '../../img/Utilisateur.png';
import logo from '../../img/logo.png';
import crs from '../../img/cours.png';

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (link) => location.pathname.toLowerCase() === link.toLowerCase();


    return (
        <div className="Sidebar">
            {/* Section du haut : Logo */}
            <div className="sidebar-top">
                <div
                    className="logo-container"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                    aria-label="Logo"
                >
                    <img
                        src={logo}
                        alt="Logo"
                        className="icon-logo"
                    />
                </div>
            </div>

            {/* Section milieu : Profil */}
            <div className="profile-section">
                <div className="profile-container">
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Admin Profile"
                        className="profile-picture"
                    />
                    <div className="profile-name">Admin</div>
                </div>
            </div>

            {/* Boutons de navigation */}
            <div className="sidebar-buttons">
                <button
                    className={`sidebar-button icon-dashboard ${isActive('/Dashboard') ? 'active' : ''}`}
                    onClick={() => navigate('/Dashboard')}
                    style={{
                        backgroundColor: isActive('/Dashboard') ? '#ffffff33' : 'transparent',
                        color: isActive('/Dashboard') ? '#ffffff' : '#cccccc',
                        cursor: 'pointer',
                    }}
                >
                    <img
                        src={dash}
                        alt="Dashboard"
                        className="icon-dashboard"
                        style={{
                            filter: isActive('/Dashboard') ? 'invert(0%)' : 'none',
                        }}
                    />
                    Dashboard
                </button>

                <button
                    className={`sidebar-button icon-user ${isActive('/Users') ? 'active' : ''}`}
                    onClick={() => navigate('/Users')}
                    style={{
                        backgroundColor: isActive('/Users') ? '#ffffff33' : 'transparent',
                        color: isActive('/Users') ? '#ffffff' : '#cccccc',
                        cursor: 'pointer',
                    }}
                >
                    <img
                        src={user}
                        alt="Utilisateurs"
                        className="icon-user"
                        style={{
                            filter: isActive('/Users') ? 'invert(0%)' : 'none',
                        }}
                    />
                    Utilisateurs
                </button>

                <button
                    className={`sidebar-button icon-quiz ${isActive('/dashboardquiz') ? 'active' : ''}`}
                    onClick={() => navigate('/dashquiz')}
                    style={{
                        backgroundColor: isActive('/dashboardquiz') ? '#ffffff33' : 'transparent',
                        color: isActive('/dashquiz') ? '#ffffff' : '#cccccc',
                        cursor: 'pointer',
                    }}
                >
                    <img
                        src={laeti}
                        className="icon-quiz"
                        style={{
                            filter: isActive('/dashquiz') ? 'invert(0%)' : 'none',
                        }}
                    />
                    Quiz
                </button>


                <button
                    className={`sidebar-button icon-cours ${isActive('/Cours') ? 'active' : ''}`}
                    onClick={() => navigate('/dashcours')}
                    style={{
                        backgroundColor: isActive('/dashcours') ? '#ffffff33' : 'transparent',
                        color: isActive('/Cours') ? '#ffffff' : '#cccccc',
                        cursor: 'pointer',
                    }}
                >
                    <img
                        src={crs}
                        alt="Cours"
                        className="icon-cours"
                        style={{
                            filter: isActive('/dashcours') ? 'invert(0%)' : 'none',
                        }}
                    />
                    Cours
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
