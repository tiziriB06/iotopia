import React from 'react';
import './accueil.css';
import logo from "../../img/logo.png";
import Navbar from '../../components/navbar/navbar';
import prof from "../../img/prof.png";
import pc from "../../img/pc.png";
import test from "../../img/test.png";
import chart from "../../img/chart.png";
import victor from "../../img/victor.png";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from 'react-router-dom';


console.log("Chemin du logo :", logo);
function Accueil() {
    const navigate = useNavigate()
    return (
        <div className='acceuil'>
            <div className="App">
                <Navbar />
            </div>
            <div className="podium">
                <div className="prof">
                    <img src={prof} className='prof' />
                </div>
                <div className="texte">
                    <h2 className='h2acceuil typing'>
                        CHALLENGEZ,
                        Progressez,Excellez
                        en IoT avec IoTopie!!
                    </h2>
                    <img src={pc} className="pc-image" />
                    <p className="description">IOTopie : là où l'IOT devient une utopie! </p>
                    <div className="separator"></div>
                    <button className="cta-button" onClick={() => navigate('/roadmap')} >Start now !</button>

                </div>
            </div>
            <div className="container">
                <div className="pqns">
                    <h2> Pourquoi nous?</h2>
                    <p className="subtitle">Chez IOTopie, nous croyons que l’apprentissage doit  être interactif et stimulant. Nos outils vous permetteront  d’évaluer votre niveau, de relever des défis   et de suivre vos performances en temps réelles . Avec notre plateforme vous avez tout ce qu’il faut pour progresser et exceller dans l’IoT. </p>
                </div>

                <div className="grid-boxes">
                    <div className="box box1">Accésible aux débutants et aux experts </div>
                    <div className="box box2">Apprentissage progressive et format ludique</div>
                    <div className="box box3">Archivages et analyses via un leaderbord des évolutions  </div>
                    <div className="box box4">Créer une communoté d'ioTopien!!</div>
                </div>
                <div className="numero">
                    <div className="num1">1</div>
                    <div className="num2">2</div>
                    <div className="num3">3</div>
                    <div className="num4">4</div>
                </div>
            </div>
            <div className="point"></div>
            <div className="point1"></div>
            <div className="point3"></div>
            <div className="point4"></div>
            <div className="point5"></div>
            <div className="point6"></div>
            <div className="point7"></div>
            <div className="point8"></div>
            <div className="point9"></div>

            <h2>Nos services </h2>
            <div className="traitt"></div>

            <div className="triple">
                <div className="table-1">
                    <img src={test} />
                    <p>Apprendre l'iot en 4 étape(section) : hardware, codage , cloud et sécurité</p>
                </div>

                <div className="table-2">
                    <img src={chart} />
                    <p>Indications et explications avant chaque quiz  </p>
                </div>

                <div className="table-3">
                    <img src={victor} />
                    <p>Quiz interactifs classés par niveau </p>
                </div>
            </div>

            <h2>Cours recommandé </h2>
            <div className="trait2"></div>

            <div className="triple2">
                <div className="table-12">
                    <h2>Introduction à l’Internet des Objets </h2>
                    <p> Un cours YouTube très accessible pour comprendre  les bases de l’IoT, même sans expérience technique</p>
                    <button
                        className="link-button"
                        onClick={() => window.open("https://youtu.be/1FflLeWIyPg?feature=shared ", "_blank")}
                    >
                        Regarder la vidéo
                    </button>

                </div>

                <div className="table-22">
                    <h2>Arduino et Capteurs : Premiers Projets </h2>
                    <p> Ce cours d’OpenClassrooms vous guide pas à pas pour utiliser des capteurs avec une carte Arduino.</p>
                    <button
                        className="link-button"
                        onClick={() => window.open("https://www.codeur.com/blog/arduino/", "_blank")}
                    >
                        Voir le cours
                    </button>
                </div>

                <div className="table-32">
                    <h2>Protocoles de communication IoT (MQTT, HTTP...) </h2>
                    <p> Découvrez comment les objets connectés échangent des données en utilisant des protocoles comme MQTT.</p>
                    <button
                        className="link-button"
                        onClick={() => window.open("https://www.ip-systemes.com/details-comprendre+le+protocole+mqtt-795.html", "_blank")}
                    >
                        Voir le cours
                    </button>
                </div>
            </div>

            <Footer />
        </div>

    );
}
export default Accueil;