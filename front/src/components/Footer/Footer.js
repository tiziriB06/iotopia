import React from 'react';
import logoo from "../../img/logo.png";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

console.log("Logo path:", logoo);
const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section1">
                    <img src={logoo} className="footer-logoo" />
                    <div className="social-icons">
                        <a href="#" className="facebook"><FaFacebookF /></a>
                        <a href="#" className="twitter"><FaTwitter /></a>
                        <a href="#" className="instagram"><FaInstagram /></a>
                        <a href="#" className="linkedin"><FaLinkedin /></a>

                    </div>
                </div>
            </div>

            <div className="footer-section2">
                <h3>Home des iotopiens</h3>

                <ul>
                    <li> <button className="cnct" onClick={() => navigate("/cnct")} >Se connecter</button></li>
                    <li><a href="#">Pourquoi nous</a></li>
                    <li><a href="#">Nos services</a></li>
                    <li><a href="#">Actualités</a></li>
                </ul>
            </div>
            <div className="footer-section3">
                <h3>Contact Us</h3>
                <p><FaPhone /> +213 5565 55 55 </p>
                <p><FaEnvelope /> iotopie@gmail.com</p>
            </div>
            <div className="footer-bottom">
                <p>2025© IOTopie inc | all rights reserved</p>
                <div className="footer-links">
                    <a href="#">Terms of Service</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Cookies</a>
                </div>
            </div>
        </footer>
    );
}
export default Footer;