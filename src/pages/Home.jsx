import React from 'react';
import HeroScene from '../components/HeroScene';
import AreaSection from '../components/Pillars';
import Community from '../components/Community';
import Talent from '../components/TalentSection';


const Home = () => {
    return (
        <main>
            <HeroScene />
            <AreaSection />
            <Talent />
        </main>
    );
};

export default Home;
