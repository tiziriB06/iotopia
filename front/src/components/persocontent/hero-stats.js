import ProgressBar from "./progress-bar"
import "./hero-stats.css"

export default function HeroStats({ hero }) {
    return (
        <div className="hero-stats">
            <div className="hero-name-level">
                <h2 className="hero-name">
                    {hero?.name} {hero?.level}
                </h2>
                <div className="hero-level">
                    <span className="level-text">Niveau {hero?.level}</span>
                    <ProgressBar percentage={hero?.level * 10} />
                </div>
            </div>

            <div className="stats-container">
                <div className="stat-row">
                    <span className="stat-label">Vitesse de scan</span>
                    <ProgressBar percentage={hero?.characteristics?.caracteristique1?.value} />
                    <span className="stat-value">{hero?.characteristics?.caracteristique1?.value}%</span>
                </div>

                <div className="stat-row">
                    <span className="stat-label">Analyse sémantique</span>
                    <ProgressBar percentage={hero?.characteristics?.caracteristique2?.value} />
                    <span className="stat-value">{hero?.characteristics?.caracteristique2?.value}%</span>
                </div>

                <div className="stat-row">
                    <span className="stat-label">Détection d'anomalie</span>
                    <ProgressBar percentage={hero?.characteristics?.caracteristique3?.value} />
                    <span className="stat-value">{hero?.characteristics?.caracteristique3?.value}%</span>
                </div>

                <div className="stat-row">
                    <span className="stat-label">Résistance physique</span>
                    <ProgressBar percentage={hero?.characteristics?.caracteristique4?.value} />
                    <span className="stat-value">{hero?.characteristics?.caracteristique4?.value}%</span>
                </div>
            </div>
        </div>
    )
}
