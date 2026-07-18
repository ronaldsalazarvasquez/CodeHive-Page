import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Rocket, ArrowRight } from 'lucide-react';
import teamBg from '../assets/images/team/Team.webp';

const Hero = () => {
    return (
        <section className="section" style={{
            minHeight: '100dvh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${teamBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            backgroundAttachment: 'fixed',
            paddingTop: '80px'
        }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        borderRadius: '99px',
                        marginBottom: '2rem',
                        color: 'var(--color-primary)'
                    }}>
                        <Rocket size={16} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Beez Core Labs</span>
                    </div>

                    <h1 className="heading-xl">
                        Creamos <br />
                        <span style={{ color: 'var(--color-primary)' }}>Impacto Digital</span>
                    </h1>

                    <p className="text-lead mb-4">
                        Beez Core es un equipo de desarrolladores apasionados dedicados a crear soluciones web y móviles de alto rendimiento. Nuestra misión es resolver problemas reales de la sociedad y empresas privadas.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/proyectos/votape" className="btn btn-primary">
                            <Rocket size={20} />
                            Conoce VotaPE
                        </Link>
                        <Link to="/proyectos" className="btn btn-outline">
                            Nuestros Proyectos
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
