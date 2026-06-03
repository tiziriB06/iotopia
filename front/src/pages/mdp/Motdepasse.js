import React from 'react';
import Mdpcontent from "../../components/mdpcontent/mdpcontent.js";
import './Motdepasse.css';
import { useNavigate } from 'react-router-dom';

function Motdepasse() {
    const navigate = useNavigate()
    return (

        <div className='mdp-container'>
            <Mdpcontent />
        </div>
    );
}

export default Motdepasse;

