import React from 'react';
import './sidebar.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './Pages/Dashboard/Dashboard.js';
import Dashboard from './Pages/Dashboard/dashquiz.js';
import UsersPage from './Pages/Users';
import CoursPage from './Pages/Dashboard/cours.js';

function App() {
    return (
        <><div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
            <Sidebar />

            {/* Effets de fond */}
            <div className="background">
                <div className="point point1"></div>
                <div className="point point2"></div>
                <div className="point point3"></div>
                <div className="point point4"></div>
                <div className="point point5"></div>
                <div className="point point6"></div>
            </div>

        </div><DashboardPage /></>

    );
}

export default App;
