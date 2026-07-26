import React from 'react';
import HeroScene from '../components/HeroScene';
import AreaSection from '../components/Pillars';
import Community from '../components/Community';
import Cod3HiveUnit from '../components/Cod3hiveSection';
import Talent from '../components/TalentSection';


const Home = () => {
    return (
        <main>
            <HeroScene />
            <AreaSection />
            <Cod3HiveUnit />
            <Talent />
        </main>
    );
};

export default Home;
