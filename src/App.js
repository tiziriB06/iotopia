import './App.css';
import Accueil from './pages/Accueil/accueil';
import RoadMapPage from './pages/RoadMapPage/RoadMapPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp.js';
import Mdpcontent from './components/mdpcontent/mdpcontent.js';
import Perso from './pages/Personage/Perso';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Accueil />} />
        <Route path='/roadmap' element={<RoadMapPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/begin' element={<SignUp />} />
        <Route path='/mdp' element={<Mdpcontent />} />
        <Route path='/perso' element={<Perso />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
