import React, { useState, useEffect } from "react";
import './Carousel.css';
import NavigationArrow from "../../components/persocontent/navigation-arrows.js";
import coding from '../../img/Coding2.png';
import capteurs from '../../img/capteurs2.png';
import reseau from '../../img/reseaux2.png';
import sécurité from '../../img/securité2.png';
import Navbar from '../../components/navbar/navbar.js';
import { useNavigate } from 'react-router-dom';



const Carousel = ({ cards }) => {
    const [active, setActive] = useState(0); //carte actuelle 
    const count = cards.length;
    const navigate = useNavigate()

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + count) % count); // Carte précédente
    };

    const handleNext = () => {
        setActive((prev) => (prev + 1) % count); // Carte suivante
    };

    useEffect(() => {
        const points = document.querySelectorAll('.point, .point1, .point2, .point3, .point4, .point5, .point6');
        points.forEach(point => {
            point.classList.add('move');
            setTimeout(() => {
                point.classList.remove('move');
            }, 500);
        });
    }, [active]);

    return (
        <>  <div className="point"></div>
            <div className="point1"></div>
            <div className="point2"></div>
            <div className="point3"></div>
            <div className="point4"></div>
            <div className="carousel-arrows">
                <NavigationArrow direction="left" onClick={handlePrev} />
                <NavigationArrow direction="right" onClick={handleNext} />
            </div>

            <div className="background-dots">
                {cards.map((_, i) => (
                    <div
                        key={i}
                        className={`dot ${i === active ? 'active' : ''}`}
                    ></div>
                ))}
            </div>

            <div className="cards-container">
                {cards.map((card, i) => {
                    let offset = (i - active + count) % count;
                    if (offset > count / 2) offset -= count;
                    const isVisible = Math.abs(offset) <= 1;

                    return (
                        <div
                            key={i}
                            className={`card-container ${active === i ? 'active' : 'inactive'} card-${i}`}
                            style={{
                                '--offset': offset,
                                '--abs-offset': Math.abs(offset),
                                '--direction': Math.sign(offset),
                                'pointer-events': active === i ? 'auto' : 'none',
                                'opacity': isVisible ? '1' : '0',
                                'display': isVisible ? 'block' : 'none',
                                'transition': 'transform 0.60s ease-in-out, opacity 5s ease-in-out',
                            }}
                        >
                            <div className="card">
                                <img src={card.image} alt={card.title} className="card-image" />
                                <h2>{card.title}</h2>
                                {active === i && (
                                    <>
                                        <p className="card-description">{card.description}</p>
                                        <div className="square-decoration"></div>
                                    </>
                                )}
                                {active === i && (
                                    <button className="explore-button" onClick={() => navigate('/level')}>
                                        Explore
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

        </>
    );
};

function Carousell() {
    const cards = [
        {
            title: "Codage",
            image: coding,
            description: `Testez vos connaissances en programmation IoT: language, script ...`,
        },
        {
            title: "Capteurs",
            image: capteurs,
            description: `Quiz sur les composants clés de l'IoT : résistances, capteurs ...`,
        },
        {
            title: "Réseau",
            image: reseau,
            description: `Défis sur les communications IoT : protocoles, fréquences..`,
        },
        {
            title: "Sécurité",
            image: sécurité,
            description: `Testez vos réflexes en cyber sécurité: cryptographie ..`,
        },
    ];

    return (
        <div className="App">
            {/*<BackgroundPoints />*/}
            <Navbar />
            <h1 className="section-title">Choisir une section</h1>
            <Carousel cards={cards} />
        </div>
    );
}

export default Carousell;