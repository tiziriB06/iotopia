import React, { useRef } from "react";
import Navbar from '../../components/navbar/navbar.js';
import HeroSelection from '../../components/persocontent/hero-selection.js';


function Personage() {
    const imgRefs = {
        box1: useRef(null),
        box2: useRef(null),
        box3: useRef(null),
    };

    const animateImage = (ref) => {
        if (ref.current) {
            ref.current.style.animation = "moveLeftRight 0.5s ease-in-out";
            setTimeout(() => {
                ref.current.style.animation = "";
            }, 500);
        }
    };

    return (
        <>
            <div className="App">
                <Navbar />
                <div>
                    <div className="point"></div>
                    <div className="point1"></div>
                    <div className="point2"></div>
                    <div className="point3"></div>
                    <div className="point4"></div>
                </div>

                <HeroSelection />
            </div>
        </>
    );
}
export default Personage;