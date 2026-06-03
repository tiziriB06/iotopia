import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import "./winner.css";
import gold from "../../img/gold.png";

export default function Winnerr({ level, correctAnswers, wrongAnswers }) {
    const [width, height] = useWindowSize();

    return (
        <>
            <h1 className="z">Quiz summary</h1>

            <div className="x">
                <Confetti width={width} height={height} />

                <div className="y">
                    <div className="w">
                        <img src={gold} alt="Gold medal" />
                    </div>

                    <p className="v">
                        Congratulations you’ve <br /> completed{" "}
                        <span className="u">Level {level}</span>!
                    </p>

                    <div className="t">
                        <div className="s">
                            <span className="r">✔</span>
                            <span>{correctAnswers} Correct</span>
                        </div>
                        <div className="q">
                            <span className="p">✘</span>
                            <span>{wrongAnswers} Wrong</span>
                        </div>
                    </div>

                    <button className="o">Continue</button>
                </div>
            </div>
        </>
    );
}