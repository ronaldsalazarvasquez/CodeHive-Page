import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VotaPE from './pages/projects/VotaPE';
import Cix360 from './pages/projects/Cix360';
import ToolTrack from './pages/projects/ToolTrack';
import SIDECI from './pages/projects/SIDECI';
import Projects from './pages/Projects';
import Cod3HiveUnit from './components/Cod3hiveSection';
import Cod3HivePage from './components/Cod3hiveInfo';
import LinkHub from './pages/LinkHub';
import Footer from './components/Footer';
import Hive from './pages/Hive';
import Login from './pages/Login';
import AreaSection from './components/Pillars';
import PilarDetailPage from './components/PilarDetailPage';
import ScrollToTop from './util/ScrollToTop';

// Rutas de pantalla completa que no muestran el Navbar/Footer del sitio
const FULLSCREEN_ROUTES = ['/intranet','/intranet/linkhub'];

function AppLayout() {
  const location = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.includes(location.pathname);

  return (
    <div className="App">
      {!isFullscreen && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/talento" element={<Hive />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/proyectos/votape" element={<VotaPE />} />
        <Route path="/proyectos/cix360" element={<Cix360 />} />
        <Route path="/proyectos/tooltrack" element={<ToolTrack />} />
        <Route path="/proyectos/sideci" element={<SIDECI />} />
        <Route path="/area-section" element={<AreaSection />} />
        <Route path="/cod3hive-section" element={<Cod3HiveUnit />} />
        <Route path="/cod3hive" element={<Cod3HivePage />} />
        <Route path="/proyectos/:idPilar" element={<PilarDetailPage />} />
        <Route path="/intranet" element={<Login />} />
        <Route path="/intranet/linkhub" element={<LinkHub />} />
      </Routes>
      {!isFullscreen && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}

export default App;
