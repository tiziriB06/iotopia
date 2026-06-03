import React from "react";
import './RoadMapPage.css';
import Roadmap from "../../components/RoadMapContent/RoadMapContent.jsx";
import Navbar from '../../components/navbar/navbar.js';

function RoadMapPage() {
    return (
        <div>
            <Navbar />
            <div>
                <div className="point"></div>
                <div className="point1"></div>
                <div className="point2"></div>
                <div className="point3"></div>
                <div className="point4"></div>
                <div className="point5"></div>
            </div>
            <Roadmap />
        </div>
    );
}

export default RoadMapPage;
