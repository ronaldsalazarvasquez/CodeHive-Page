import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Space+Grotesk:wght@700;900&display=swap');

                .ch-impact-section {
                    padding: 130px 24px;
                    background-color: #050507;
                    color: #ffffff;
                    font-family: 'Montserrat', sans-serif;
                    position: relative;
                    overflow: hidden;
                }

                /* Fondo con resplandor sutil de marca */
                .ch-impact-section::before {
                    content: '';
                    position: absolute;
                    top: 20%;
                    left: -10%;
                    width: 450px;
                    height: 450px;
                    background: radial-gradient(circle, rgba(244, 180, 0, 0.05) 0%, transparent 70%);
                    pointer-events: none;
                }

                .ch-impact-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                }

                /* Línea divisoria de alto contraste */
                .ch-impact-divider {
                    height: 2px;
                    background: linear-gradient(90deg, #FFD54A 0%, rgba(244, 180, 0, 0.3) 50%, transparent 100%);
                    margin-bottom: 70px;
                    width: 100%;
                }

                /* Layout asimétrico de alto impacto */
                .ch-impact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: 60px;
                    align-items: start;
                }

                /* Columna Izquierda: Tipografía Monumental */
                .ch-impact-brand {
                    position: relative;
                }

                .ch-impact-tag {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 3px;
                    color: #FFD54A;
                    text-transform: uppercase;
                    margin-bottom: 24px;
                }

                .ch-impact-pulse {
                    width: 8px;
                    height: 8px;
                    background-color: #FFD54A;
                    border-radius: 50%;
                    box-shadow: 0 0 12px #FFD54A;
                }

                .ch-impact-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 4rem;
                    font-weight: 900;
                    line-height: 0.95;
                    letter-spacing: -2px;
                    margin: 0 0 20px 0;
                    text-transform: uppercase;
                }

                .ch-impact-title .ch-title-ghost {
                    color: rgba(255, 255, 255, 0.15);
                    display: block;
                    font-size: 3.2rem;
                    margin-top: 6px;
                }

                .ch-impact-title .ch-title-active {
                    background: linear-gradient(180deg, #ffffff 0%, #FFD54A 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* Columna Derecha: Contenido y Muestra */
                .ch-impact-content {
                    padding-top: 10px;
                }

                .ch-impact-statement {
                    font-size: 1.45rem;
                    font-weight: 400;
                    line-height: 1.5;
                    color: #ffffff;
                    margin-bottom: 28px;
                    letter-spacing: -0.3px;
                }

                .ch-impact-statement strong {
                    font-weight: 800;
                    color: #FFD54A;
                }

                .ch-impact-subtext {
                    font-size: 1rem;
                    line-height: 1.7;
                    color: #AAB4C0;
                    margin-bottom: 45px;
                }

                /* Tarjetas de estado integradas (sin verse sobrecargadas) */
                .ch-impact-footer-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                    padding-top: 30px;
                }

                .ch-stat-unit {
                    border-left: 2px solid #FFD54A;
                    padding-left: 16px;
                }

                .ch-stat-num {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #ffffff;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .ch-stat-lbl {
                    font-size: 0.8rem;
                    color: #8a8f98;
                    margin-top: 4px;
                }

                @media (max-width: 900px) {
                    .ch-impact-grid {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }
                    .ch-impact-title {
                        font-size: 3.2rem;
                    }
                    .ch-impact-title .ch-title-ghost {
                        font-size: 2.5rem;
                    }
                    .ch-impact-statement {
                        font-size: 1.2rem;
                    }
                    .ch-impact-section {
                        padding: 90px 20px;
                    }
                }
            `}</style>

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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cod3HiveTeamMinimal;