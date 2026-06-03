import React from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import "./winner.css";
import gold from "../../img/gold.png";

export default function Winnerr({ level, correctAnswers, wrongAnswers }) {
    const [width, height] = useWindowSize();
    const navigate = useNavigate();

    return (
        <>
            <h1 className="winner-title">Quiz summary</h1>

            <div className="winner-wrapper">
                <Confetti width={width} height={height} />

                <div className="winner-container">
                    <div className="winner-medal">
                        <img src={gold} alt="Gold medal" />
                    </div>

                    <p className="winner-message">
                        Congratulations you’ve <br />
                        completed <span className="winner-level">Level {level}</span>!
                    </p>

                    <div className="winner-stats">
                        <div className="stat-item">
                            <span className="correct-icon">✔</span>
                            <span>{correctAnswers} Correct</span>
                        </div>
                        <div className="stat-item">
                            <span className="wrong-icon">✘</span>
                            <span>{wrongAnswers} Wrong</span>
                        </div>
                    </div>

                    <button
                        className="winner-button"
                        onClick={() => navigate("/suivlevel")}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </>
    );
}
