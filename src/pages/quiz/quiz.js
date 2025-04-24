import React, { useEffect, useState } from 'react'
import Quiz from './quizs.js';
import './App.css';
import Navbar from './navbar.js';
import './navbar.css';
import idea from "./image/idea.png";


const App = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="square">
                    <Quiz />
                </div>
            </div>
            <div className="point"></div><div className="point1"></div><div className="point2"></div><div className="point3"></div><div className="point4"></div><div className="point5"></div><div className="point6"></div><div className="point7"></div><div className="point8"></div><div className="point9"></div></>

    )
}
export default App