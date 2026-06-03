import React, { useEffect, useState } from 'react'
import Quizz from './quizz.js';
import './quiz.css';
import Navbar from '../../components/navbar/navbar.js';
import '../../components/navbar/navbar.css';



const Quiz = () => {
    return (
        <>
            <Navbar />
            <div className="local">
                <div className="square">
                    <Quizz />
                </div>
            </div>
            <div className="point"></div><div className="point1"></div><div className="point2"></div><div className="point3"></div><div className="point4"></div><div className="point5"></div><div className="point6"></div><div className="point7"></div><div className="point8"></div><div className="point9"></div></>

    )
}
export default Quiz