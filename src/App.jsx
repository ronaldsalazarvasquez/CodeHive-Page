import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VotaPE from './pages/projects/VotaPE';
import Cix360 from './pages/projects/Cix360';
import ToolTrack from './pages/projects/ToolTrack';
import SIDECI from './pages/projects/SIDECI';
import Projects from './pages/Projects';
import Footer from './components/Footer';
import Hive from './pages/Hive';
import AreaSection from './components/Pillars';
import PilarDetailPage from './components/PilarDetailPage';
import ScrollToTop from './util/ScrollToTop';



function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/talento-hive" element={<Hive />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/proyectos/votape" element={<VotaPE />} />
          <Route path="/proyectos/cix360" element={<Cix360 />} />
          <Route path="/proyectos/tooltrack" element={<ToolTrack />} />
          <Route path="/proyectos/sideci" element={<SIDECI />} />
          <Route path="/area-section" element={<AreaSection />} />
          <Route path="/proyects/:idPilar" element={<PilarDetailPage />} />
        </Routes>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
