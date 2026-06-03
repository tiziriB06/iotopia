import React, { useState, useEffect } from 'react';
import './dashbord.css';
import imgdsh from '../../img/Dashboard.png';
import DatePicker from 'react-datepicker';
import Sidebar from '../../components/Sidebar/sidebar.js';
import 'react-datepicker/dist/react-datepicker.css';

function DashboardPage() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [visitCount, setVisitCount] = useState(1243);
    const [userCount, setUserCount] = useState(542);
    const [difficultyData, setDifficultyData] = useState({
        codage: 75,
        capteurs: 60,
        reseau: 85,
        securite: 45
    });
    const [popularityData, setPopularityData] = useState({
        codage: 65,
        capteurs: 45,
        reseau: 80,
        securite: 30
    });

    const [isScoreModalVisible, setIsScoreModalVisible] = useState(false);
    const [isLevelModalVisible, setIsLevelModalVisible] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedSectionOnly, setSelectedSectionOnly] = useState(null);

    // Données mockées
    const mockScores = {
        codage: [75, 80, 82, 78, 85, 88, 76, 90, 83, 79, 84, 87],
        capteurs: [72, 78, 85, 80, 82, 76, 88, 84, 79, 83, 81, 86],
        reseau: [80, 75, 78, 82, 85, 79, 83, 87, 81, 84, 80, 88],
        securite: [78, 82, 85, 79, 83, 86, 80, 84, 87, 81, 85, 82]
    };

    const mockLevels = {
        codage: 6.2,
        capteurs: 5.8,
        reseau: 7.1,
        securite: 6.5
    };

    // Simulation des données en fonction des dates
    useEffect(() => {
        if (startDate && endDate) {
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Calcul des valeurs simulées
            const baseVisits = 1000;
            const baseUsers = 400;
            const durationFactor = diffDays / 7;

            setVisitCount(Math.floor(baseVisits * durationFactor * (0.9 + Math.random() * 0.2)));
            setUserCount(Math.floor(baseUsers * durationFactor * (0.8 + Math.random() * 0.4)));

            setDifficultyData({
                codage: Math.floor(Math.random() * 30) + 70,
                capteurs: Math.floor(Math.random() * 40) + 40,
                reseau: Math.floor(Math.random() * 30) + 60,
                securite: Math.floor(Math.random() * 50) + 30
            });

            setPopularityData({
                codage: Math.floor(Math.random() * 30) + 60,
                capteurs: Math.floor(Math.random() * 40) + 30,
                reseau: Math.floor(Math.random() * 25) + 70,
                securite: Math.floor(Math.random() * 30) + 20
            });
        }
    }, [startDate, endDate]);

    // Composant Barre de progression
    const ProgressBar = ({ value, label, section }) => (
        <div className="progress-bar">
            <div className="progress-bar-label">{label}</div>
            <div className="progress-bar-bg">
                <div
                    className={`progress-bar-fill progress-${section}`}
                    style={{ width: `${value}%` }}
                ></div>
            </div>
            <div className="progress-bar-value">{value}%</div>
        </div>
    );

    // Nouveau composant DonutChart corrigé
    const DonutChart = ({ data }) => {
        const size = 180;
        const strokeWidth = 17;
        const center = size / 2;
        const radius = center - strokeWidth;

        const colors = {
            codage: '#8B5CF6',
            capteurs: '#BC67A3',
            reseau: '#E06020',
            securite: '#8B5CF6'
        };

        const svgGradients = {
            codage: (
                <linearGradient id="grad-codage" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#513690" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
            ),
            capteurs: (
                <linearGradient id="grad-capteurs" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#BC67A3" />
                    <stop offset="100%" stopColor="#562F4B" />
                </linearGradient>
            ),
            reseau: (
                <linearGradient id="grad-reseau" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E06020" />
                    <stop offset="100%" stopColor="#7A3411" />
                </linearGradient>
            ),
            securite: (
                <linearGradient id="grad-securite" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#513690" />
                </linearGradient>
            )
        };

        const sortedSections = Object.entries(data).sort((a, b) => b[1] - a[1]);

        return (
            <div className="donut-chart">
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <defs>
                        {Object.entries(svgGradients).map(([section, gradient]) => (
                            <React.Fragment key={section}>
                                {gradient}
                            </React.Fragment>
                        ))}
                    </defs>

                    {sortedSections.map(([section, value], index) => {
                        const currentRadius = radius - (index * (strokeWidth * 0.8));
                        const circumference = 2 * Math.PI * currentRadius;
                        const strokeDashoffset = circumference - (value / 100) * circumference;

                        return (
                            <g key={section}>
                                <circle
                                    cx={center}
                                    cy={center}
                                    r={currentRadius}
                                    fill="transparent"
                                    stroke="#ffffff20"
                                    strokeWidth={strokeWidth}
                                />
                                <circle
                                    cx={center}
                                    cy={center}
                                    r={currentRadius}
                                    fill="transparent"
                                    stroke={`url(#grad-${section})`}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    transform={`rotate(-90 ${center} ${center})`}
                                />
                            </g>
                        );
                    })}

                    <text
                        x={center}
                        y={center}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="500"
                    >
                        Popularité
                    </text>
                </svg>

                <div className="donut-legend">
                    {sortedSections.map(([section, value]) => (
                        <div key={section} className="legend-item">
                            <span
                                className="legend-color"
                                style={{ backgroundColor: colors[section] }}
                            />
                            <span className="legend-label">
                                {section === 'codage' ? 'Codage' :
                                    section === 'capteurs' ? 'Capteurs' :
                                        section === 'reseau' ? 'Réseau' : 'Sécurité'}: {value}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Fonctions helpers
    const getFormattedDate = (date) => {
        if (!date) return '';
        const options = { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    };

    const getCurrentScore = () => {
        if (!selectedSection || !selectedLevel) return '-';
        return `${mockScores[selectedSection][selectedLevel - 1]}%`;
    };

    const getCurrentLevel = () => {
        if (!selectedSectionOnly) return '-';
        return mockLevels[selectedSectionOnly].toFixed(1);
    };

    return (
        <div>
            {/* Conteneur principal avec flou conditionnel */}
            <div className={`page ${isDatePickerVisible || isScoreModalVisible || isLevelModalVisible ? 'blurred' : ''}`}>
                {/* Header avec titre et bouton de dates */}
                <div className="headerr">
                    <div className="date-selection">
                        <button className="date-buttn" onClick={() => setIsDatePickerVisible(true)}>
                            Choisir les dates
                        </button>
                        <div className="selected-dates-overlay">
                            {startDate && endDate ? (
                                <p>Dates sélectionnées : {getFormattedDate(startDate)} - {getFormattedDate(endDate)}</p>
                            ) : startDate ? (
                                <p>Date de début sélectionnée : {getFormattedDate(startDate)}</p>
                            ) : null}
                        </div>
                    </div>
                    <div className="title-and-date">
                        <h1 className="page-title">Dashboard</h1>
                        <p className="page-date">{getFormattedDate(new Date())}</p>
                    </div>
                </div>

                {/* Grille du dashboard */}
                <div className="dashboard-grid">
                    <div className="sqr1">
                        <img src={imgdsh} alt="Visites" className="dshlogo" />
                        <p className="sqrtext">Nombre de visites</p>
                        <p className="sqr-value">{visitCount.toLocaleString()}</p>
                    </div>
                    <div className="sqr2">
                        <img src={imgdsh} alt="Utilisateurs" className="dshlogo" />
                        <p className="sqrtext">Nombre d'utilisateurs inscrits</p>
                        <p className="sqr-value">{userCount.toLocaleString()}</p>
                    </div>
                    <div className="sqr3" onClick={() => setIsScoreModalVisible(true)}>
                        <img src={imgdsh} alt="Score" className="dshlogo" />
                        <p className="sqrtext">Score moyen des utilisateurs</p>
                        <p className="sqr-value">{getCurrentScore()}</p>
                    </div>
                    <div className="sqr4" onClick={() => setIsLevelModalVisible(true)}>
                        <img src={imgdsh} alt="Niveau" className="dshlogo" />
                        <p className="sqrtext">Moyenne du niveau atteint</p>
                        <p className="sqr-value">{getCurrentLevel()}</p>
                    </div>
                    <div className="lsqr">
                        <p className="bigsqrtxt">Popularité des sections</p>
                        <DonutChart data={popularityData} />
                    </div>
                    <div className="wsqr">
                        <p className="bigsqrtxt">Difficulté des sections</p>
                        <div className="progress-bars-container">
                            {Object.entries(difficultyData).map(([section, value]) => (
                                <ProgressBar
                                    key={section}
                                    value={value}
                                    label={
                                        section === 'codage' ? 'Codage' :
                                            section === 'capteurs' ? 'Capteurs' :
                                                section === 'reseau' ? 'Réseau' : 'Sécurité'
                                    }
                                    section={section}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="sqr5">
                        <p className="bigsqrtxt">Nombre total de reponses</p>
                        <p className="response-count">137</p>
                    </div>
                </div>
            </div>

            {/* Modale pour les dates */}
            {isDatePickerVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Choisir une plage de dates</h2>
                        <DatePicker
                            selected={startDate}
                            onChange={(update) => {
                                const [start, end] = update;
                                setStartDate(start);
                                setEndDate(end);
                            }}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                        />
                        <button className="close-modal" onClick={() => setIsDatePickerVisible(false)}>
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            {/* Modale pour le score moyen */}
            {isScoreModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content stats-modal">
                        <h2>Score moyen par niveau</h2>

                        <div className="modal-section">
                            <label>Section :</label>
                            <select
                                value={selectedSection || ''}
                                onChange={(e) => setSelectedSection(e.target.value)}
                                className="admin-select"
                            >
                                <option value="">Sélectionner une section</option>
                                <option value="codage">Codage</option>
                                <option value="capteurs">Capteurs</option>
                                <option value="reseau">Réseau</option>
                                <option value="securite">Sécurité</option>
                            </select>
                        </div>

                        <div className="modal-section">
                            <label>Niveau :</label>
                            <select
                                value={selectedLevel || ''}
                                onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
                                disabled={!selectedSection}
                                className="admin-select"
                            >
                                <option value="">Sélectionner un niveau</option>
                                {[...Array(12)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>Niveau {i + 1}</option>
                                ))}
                            </select>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="validate-btn"
                                onClick={() => setIsScoreModalVisible(false)}
                            >
                                Valider
                            </button>
                            <button
                                className="close-modal"
                                onClick={() => setIsScoreModalVisible(false)}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Sidebar />
            {/* Modale pour le niveau moyen */}
            {isLevelModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content stats-modal">
                        <h2>Niveau moyen atteint</h2>

                        <div className="modal-section">
                            <label>Section :</label>
                            <select
                                value={selectedSectionOnly || ''}
                                onChange={(e) => setSelectedSectionOnly(e.target.value)}
                                className="admin-select"
                            >
                                <option value="">Sélectionner une section</option>
                                <option value="codage">Codage</option>
                                <option value="capteurs">Capteurs</option>
                                <option value="reseau">Réseau</option>
                                <option value="securite">Sécurité</option>
                            </select>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="validate-btn"
                                onClick={() => setIsLevelModalVisible(false)}
                            >
                                Valider
                            </button>
                            <button
                                className="close-modal"
                                onClick={() => setIsLevelModalVisible(false)}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default DashboardPage;