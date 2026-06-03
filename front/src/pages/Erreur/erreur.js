import './erreur.css';
import image from '../../img/Arbres.png';
import photo from '../../img/Personnages.png';
import { useNavigate } from 'react-router-dom';

function Erreur() {
    const navigate = useNavigate()
    console.log("Erreur affichée");
    return (
        <div className="backgroundd">
            <img src={image} className="personnages" />
            <img src={photo} className="arbres" />
            <div className="text-box">
                <h1 className="oops">OOPS!</h1>
                <p className="page">PAGE NON TROUVÉE</p>
                <button className="home-button" onClick={() => navigate('/mistake')} >Retour à la page de connexion</button>
            </div>
            <div className=" point1"></div>
            <div className=" point2"></div>
            <div className=" point3"></div>
            <div className=" point4"></div>
            <div className="point5"></div>
            <div className=" point6"></div>
        </div>
    );
}
export default Erreur;