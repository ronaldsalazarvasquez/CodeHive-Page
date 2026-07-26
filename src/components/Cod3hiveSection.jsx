import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import '../assets/styles/Cod3HiveSection.css';

gsap.registerPlugin(ScrollTrigger);

const Cod3HiveTeamMinimal = () => {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animación de la línea de acento principal
            gsap.fromTo(lineRef.current,
                { scaleX: 0, transformOrigin: 'left' },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );

            // Revelado dinámico de los bloques de contenido
            gsap.from(contentRef.current.children, {
                y: 35,
                opacity: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="equipo-cod3hive" className="ch-impact-section">
            <div className="ch-impact-container">
                {/* Línea divisoria de acento amarillo */}
                <div ref={lineRef} className="ch-impact-divider"></div>

                <div className="ch-impact-grid">
                    {/* Columna Izquierda: Título Masivo */}
                    <div className="ch-impact-brand">
                        <div className="ch-impact-tag">
                            <span className="ch-impact-pulse"></span> Escuadra Oficial
                        </div>
                        <h2 className="ch-impact-title">
                            <span className="ch-title-active">COD3HIVE</span>
                            <span className="ch-title-ghost">EQUIPO</span>
                        </h2>
                    </div>

                    {/* Columna Derecha: Mensaje Directo en Español */}
                    <div ref={contentRef} className="ch-impact-content">
                        <p className="ch-impact-statement">
                            <strong>BeezCorp</strong> es nuestra estructura corporativa. <strong>Cod3Hive</strong> es el equipo que sale a la cancha a competir en torneos, hackathons y retos de innovación tecnológica.
                        </p>

                        <p className="ch-impact-subtext">
                            A través de esta celda de desarrollo representamos formalmente a nuestra empresa en competencias de software, poniendo a prueba nuestra capacidad de arquitectura, seguridad y desarrollo ágil bajo máxima exigencia.
                        </p>

                        {/* Indicadores con acento lateral */}
                        <div className="ch-impact-footer-stats">
                            
                            <div className="ch-stat-unit">
                                <div className="ch-stat-num">Célula Competitiva</div>
                                <div className="ch-stat-lbl">Representación en torneos</div>
                            </div>
                            <div className="ch-stat-unit">
                                <div className="ch-stat-num">Laboratorio BeezCorp</div>
                                <div className="ch-stat-lbl">Respaldo de marca matriz</div>
                            </div>
                            <Link to="/cod3hive" className="ch-btn-explore">
                            Conócenos <span>→</span>
                        </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cod3HiveTeamMinimal;