import './App.css';
import Accueil from './pages/Accueil/accueil';
import RoadMapPage from './pages/RoadMapPage/RoadMapPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp.js';
import Mdpcontent from './components/mdpcontent/mdpcontent.js';
import Perso from './pages/Personage/Perso';
import Carousel from './pages/Carousel/Carousel.js';
import Level from './pages/Level/level.js';
import Compte from './pages/Compte/Compte.js';
import Confirm from './pages/Confirmation/confirmation.js';
import Modif from './pages/Modif/modif.js';
import Creationmdp from './pages/Creationmdp/creation.js';
import Quiz from './pages/quiz/quiz.js';
import Winnerr from '../../front/src/pages/Winner/winnerr.js';
import DashboardPage from './pages/Dashbord/dashboard.js';
import Dashboard from './pages/Dashbord/dashquiz.js';
import CoursPage from './pages/Dashbord/cours.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Accueil />} />
        <Route path='/roadmap' element={<RoadMapPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/connexion' element={<SignUp />} />
        <Route path='/begin' element={<SignUp />} />
        <Route path='/confirm' element={<Confirm />} />
        <Route path='/perso' element={<Perso />} />
        <Route path='/choix' element={<Carousel />} />
        <Route path='/level' element={<Level />} />
        <Route path='/cnct' element={<SignUp />} />
        <Route path="/compte" element={<Compte />} />
        <Route path="/mistake" element={<SignUp />} />
        <Route path="/mdp" element={<Mdpcontent />} />
        <Route path="/modif" element={<Modif />} />
        <Route path="/lost" element={<Modif />} />
        <Route path="/modifmdp" element={<Creationmdp />} />
        <Route path="/succes" element={<SignUp />} />
        <Route path="/jeu/:id" element={<Quiz />} />
        <Route path="/win" element={<Winnerr />} />
        <Route path="/suivlevel" element={<Level />} />
        <Route path="/valid" element={<Perso />} />
        <Route path="/dash" element={<DashboardPage />} />
        <Route path="/dashquiz" element={<Dashboard />} />
        <Route path="/dashcours" element={<CoursPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
