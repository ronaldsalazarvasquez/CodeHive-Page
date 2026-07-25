import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import '../assets/styles/Pillars.css';

const CardsSection = () => {
    const sectionRef = useRef(null);
    const navigate = useNavigate();
    
    const particlesCount = 60;
    const particles = Array.from({ length: particlesCount });

    const cardsData = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Ingeniería de Plataformas Escalables',
            path: '/proyectos/plataformas' // 👇 Apunta al identificador del diccionario
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Tecnología Resiliente de Alto Impacto',
            path: '/proyectos/tecnologia' // 👇 Apunta al identificador del diccionario
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Reingeniería & Modernización Digital',
            path: '/proyectos/reingenieria' // 👇 Apunta al identificador del diccionario
        }
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            const particlesArray = gsap.utils.toArray('.particle');

            particlesArray.forEach((particle) => {
                gsap.to(particle, {
                    x: `random(-80, 80)`,
                    y: `random(-80, 80)`,
                    duration: `random(5, 12)`,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true
                });

                gsap.to(particle, {
                    opacity: `random(0.1, 0.7)`,
                    duration: `random(2, 6)`,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <section id="nuestros-pilares" className="cards-section" ref={sectionRef} >
                <div className="fade-top"></div>
                
                <div className="particles-container">
                    {particles.map((_, i) => (
                        <div 
                            key={i} 
                            className="particle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                transform: `scale(${Math.random() * 0.8 + 0.5})`
                            }}
                        ></div>
                    ))}
                </div>

                <h2 className="section-title">Nuestros Pilares</h2>

                <div className="cards-container">
                    {cardsData.map((card) => (
                        <div className="card" key={card.id} onClick={() => navigate(card.path)}>
                            <div className="card-image-wrapper">
                                <img src={card.image} alt={card.title} className="card-image" />
                                <div className="card-overlay"></div>
                            </div>
                            <div className="card-content">
                                <h3>{card.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default CardsSection;