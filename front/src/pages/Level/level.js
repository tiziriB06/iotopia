import React, { useState } from 'react';
import './level.css';
import Navbar from '../../components/navbar/navbar.js';
import cadenas from "../../img/cadenas.png";
import gift from "../../img/gift.png";
import { useNavigate } from 'react-router-dom';
import { useApiRequest } from "../../hooks/useApiRequest";

const Spaghetti = () => {
  const [completedLevels, setCompletedLevels] = useState([]);
  const [shakingLevelId, setShakingLevelId] = useState(null);
  const navigate = useNavigate();

  const levels = [
    { id: 1, x: 500, y: 100, hasReward: true },
    { id: 2, x: 300, y: 300, hasReward: true },
    { id: 3, x: 700, y: 500, hasReward: true },
    { id: 4, x: 300, y: 700, hasReward: true },
    { id: 5, x: 500, y: 900, hasReward: true },
    { id: 6, x: 300, y: 1100, hasReward: true },
    { id: 7, x: 700, y: 1500, hasReward: true },
    { id: 8, x: 300, y: 1500, hasReward: true },
    { id: 9, x: 500, y: 1700, hasReward: true },
    { id: 10, x: 300, y: 1900, hasReward: true },
    { id: 11, x: 700, y: 2100, hasReward: true },
    { id: 12, x: 300, y: 2300, hasReward: true },
  ];


  const pathData = `M ${levels[0].x},${levels[0].y} ` +
    levels.slice(1).map((level, i) => {
      const prev = levels[i];
      const cx = (prev.x + level.x) / 2;
      const cy = (prev.y + level.y) / 2;
      return `S ${cx},${cy} ${level.x},${level.y}`;
    }).join(' ');


  const handleLevelClick = (levelId) => {
    if (!completedLevels.includes(levelId)) {
      setCompletedLevels([...completedLevels, levelId]);
    }
    navigate(`/jeu/${levelId}`);
  };

  const handleImageClick = (levelId) => {
    setShakingLevelId(levelId);
    setTimeout(() => setShakingLevelId(null), 300);
  };

  return (
    <div className="spaghetti-container">
      <Navbar />
      <div className="point"></div>
      <div className="point1"></div>
      <div className="point2"></div>
      <div className="point3"></div>
      <div className="point4"></div>
      <div className="point5"></div>


      <svg className="spaghetti-svg" viewBox="0 0 1100 2400">
        <path d={pathData} className="spaghetti-path" />


        {levels.map((level) => (
          <g
            key={level.id}
            onClick={() => handleLevelClick(level.id)}
            style={{ cursor: completedLevels.includes(level.id) ? 'default' : 'pointer' }}
            className="spaghetti-level"
          >
            <image
              href={level.id === 12 ? gift : cadenas}
              x={level.x - 40}
              y={level.y - 40}
              width="80"
              height="80"
              className={`${completedLevels.includes(level.id) ? "completed" : ""} ${level.id === 12 ? "gift" : ""} ${shakingLevelId === level.id ? "shake-animation" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleImageClick(level.id);
              }}
            />
            <text x={level.x} y={level.y + 30} className="spaghetti-text">
              {level.id}
            </text>

            {level.hasReward && (
              <text
                x={level.x}
                y={level.y - 20}
                className={`spaghetti-star ${completedLevels.includes(level.id) ? "completed" : "not-completed"}`}
              >
                ★
              </text>
            )}
          </g>
        ))}
      </svg>


      <div className="progress-message">
        <p>
          Niveaux complétés :{' '}
          {completedLevels.length > 0 ? completedLevels.join(', ') : 'Aucun'}
        </p>
        {completedLevels.length === levels.length && (
          <p className="congrats-message">
            Bravo ! Vous avez complété tous les niveaux !
          </p>
        )}
      </div>
    </div>
  );
};

export default Spaghetti;