import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VotaPE from './pages/projects/VotaPE';
import Cix360 from './pages/projects/Cix360';
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
          <Route path="/votape" element={<VotaPE />} />
          <Route path="/cix360" element={<Cix360 />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/area-section" element={<AreaSection />} />
          <Route path="/proyects/:idPilar" element={<PilarDetailPage />} />
        </Routes>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
