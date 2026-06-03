import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest.js";
import HeroDisplay from "../../components/persocontent/hero-display.js";
import HeroStats from "./hero-stats.js";
import NavigationArrow from "../../components/persocontent/navigation-arrows.js";
import "./hero-selection.css";
import dataheroes from '../donne.json'
export default function HeroSelection() {
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [heroes, setHeroes] = useState([]);
    const { data, error, loading, request } = useApiRequest();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const fetchedHeroes = await request("/heroes", "GET");
                console.log("Données récupérées:", fetchedHeroes); // Vérifie la structure de la réponse
                setHeroes(fetchedHeroes?.heroes); // Mets à jour en fonction de la structure réelle
            } catch (err) {
                console.error("Erreur lors de la récupération des héros :", err);
            }
        };

        fetchHeroes();
        if (!heroes) {
            setHeroes(dataheroes)
        }
    }, [request]);


    const currentHero = heroes?.length > 0 ? heroes[currentHeroIndex] : null;

    const handlePrevHero = () => {
        if (heroes?.length > 0) {  // S'assurer que heroes n'est pas vide
            setCurrentHeroIndex((prevIndex) => (prevIndex === 0 ? heroes?.length - 1 : prevIndex - 1));
        }
    };

    const handleNextHero = () => {
        if (heroes?.length > 0) {  // S'assurer que heroes n'est pas vide
            setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroes?.length);
        }
    };

    const handleConfirmHero = async () => {
        if (currentHero) {
            try {
                await request("/heroes/select", "POST", { name: currentHero?.name });
                const user = await request('/user/profile', 'GET');
                navigate('/choix');
            } catch (err) {
                console.error("Erreur lors de la requête POST pour sélectionner le héros :", err);
            }
        }
    };

    return (
        <div className="hero-selection-container">
            <h1 className="hero-selection-title">Choisis ton Héro</h1>
            <div className="hero-selection-content">
                <NavigationArrow direction="left" onClick={handlePrevHero} />
                {currentHero && <HeroDisplay hero={currentHero} />}
                <NavigationArrow direction="right" onClick={handleNextHero} />
            </div>
            {currentHero && <HeroStats hero={currentHero} />}

            {/* Bouton pour confirmer le choix */}
            {currentHero && (
                <div className="confirm-button-container">
                    <button className="confirm-hero-button" onClick={handleConfirmHero}>
                        Confirmer ce héro
                    </button>
                </div>
            )}
        </div>
    );
}
