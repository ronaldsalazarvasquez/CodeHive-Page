import React from 'react';
import { Heart, Building2, Repeat } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: <Heart size={32} />,
            title: "Herramientas Sociales",
            desc: "Desarrollamos aplicaciones gratuitas como VotaPE para resolver problemas de la sociedad, promoviendo la transparencia y el acceso a la información."
        },
        {
            icon: <Building2 size={32} />,
            title: "Soluciones Corporativas",
            desc: "Creamos software a medida para empresas privadas: análisis de KPIs en tiempo real, eficiencia productiva e implementaciones de IoT."
        },
        {
            icon: <Repeat size={32} />,
            title: "Ciclo de Innovación",
            desc: "Nos financiamos a través de nuestros proyectos privados para poder seguir creando y manteniendo herramientas gratuitas de uso general."
        }
    ];

    return (
        <section id="about" className="section">
            <div className="container">
                <div className="text-center mb-4">
                    <h2 className="heading-lg">Nuestro Propósito</h2>
                    <p className="text-lead">
                        Más que código, creamos soluciones que impactan vidas y potencian negocios.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {features.map((item, index) => (
                        <div key={index} className="glass-card">
                            <div style={{
                                color: 'var(--color-primary)',
                                marginBottom: '1.5rem',
                                background: 'rgba(255,255,255,0.05)',
                                width: '60px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px'
                            }}>
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
