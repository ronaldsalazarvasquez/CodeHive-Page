import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TalentImg from '../assets/images/team/TalentImg.webp';

gsap.registerPlugin(ScrollTrigger);

const TalentSection = () => {
    const sectionRef = useRef(null);
    const particlesCount = 40; // Menos partículas para no sobrecargar
    const particles = Array.from({ length: particlesCount });
    const navigate = useNavigate();

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Animación de las partículas (Flotación)
            const particlesArray = gsap.utils.toArray('.talent-particle');
            particlesArray.forEach((particle) => {
                gsap.to(particle, {
                    x: `random(-60, 60)`,
                    y: `random(-60, 60)`,
                    duration: `random(6, 15)`,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true
                });
                gsap.to(particle, {
                    opacity: `random(0.1, 0.5)`,
                    duration: `random(3, 8)`,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true
                });
            });

            gsap.from(".talent-content", {
                scrollTrigger: {
                    trigger: ".talent-section",
                    start: "top 70%", 
                },
                x: -100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out"
            });

            gsap.from(".talent-image-box", {
                scrollTrigger: {
                    trigger: ".talent-section",
                    start: "top 70%",
                },
                x: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.2
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <style>{`
                .talent-section {
                    position: relative;
                    width: 100vw;
                    background-color: #000000;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start; /* Alinea el contenido hacia arriba */
                    padding: 100px 5% 100px 5%; /* Reducimos el espacio de arriba a solo 20px */
                    overflow: hidden;
                    font-family: 'Montserrat', sans-serif;
                    z-index: 5;
                }

                .talent-particle {
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background-color: #4475AD; /* Azul para variar del dorado */
                    border-radius: 50%;
                    opacity: 0.3;
                    box-shadow: 0 0 10px #4475AD;
                    pointer-events: none;
                }

                .talent-container {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    max-width: 1200px;
                    gap: 60px;
                    align-items: center;
                    z-index: 10;
                }

                .talent-content {
                    flex: 1;
                    color: white;
                }

                .talent-content h2 {
                    font-size: 3.5rem;
                    font-weight: 900;
                    margin: 0;
                    color: #4475AD;
                    text-transform: uppercase;
                    line-height: 1;
                    letter-spacing: -2px;
                    text-shadow: 0 0 20px rgba(68, 117, 173, 0.3);
                }

                .talent-content p {
                    font-size: 1.1rem;
                    margin-top: 25px;
                    line-height: 1.8;
                    opacity: 0.8;
                    max-width: 500px;
                    color: #dae8f5;
                }

                /* === ESTILOS DEL NUEVO BOTÓN === */
                .talent-btn {
                    margin-top: 30px;
                    padding: 12px 35px;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #ffffff;
                    background-color: #4475AD;
                    border: 2px solid #4475AD;
                    border-radius: 50px;
                    cursor: pointer;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 15px rgba(68, 117, 173, 0.4);
                }

                .talent-btn:hover {
                    background-color: transparent;
                    color: #4475AD;
                    box-shadow: 0 0 25px rgba(68, 117, 173, 0.7);
                    transform: translateY(-3px);
                }

                .talent-btn:active {
                    transform: translateY(-1px);
                }

                .talent-image-box {
                    flex: 1;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .representative-img {
                    width: 100%;
                    max-width: 500px;
                    border-radius: 20px;
                    /* Un degradado sutil alrededor para que no se vea cortada */
                    mask-image: radial-gradient(circle, black 60%, transparent 100%);
                    -webkit-mask-image: radial-gradient(circle, black 60%, transparent 100%);
                    filter: drop-shadow(0 0 30px rgba(68, 117, 173, 0.4));
                }

                /* Decoración geométrica simple detras de la imagen */
                .image-decoration {
                    position: absolute;
                    width: 120%;
                    height: 120%;
                    border: 1px solid rgba(68, 117, 173, 0.2);
                    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
                    z-index: -1;
                    animation: morph 10s ease-in-out infinite alternate;
                }

                @keyframes morph {
                    0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                    100% { border-radius: 50% 50% 20% 80% / 25% 80% 20% 75%; }
                }

                /* ======================== RESPONSIVE ======================== */
                @media (max-width: 1024px) {
                    .talent-content h2 { font-size: 2.8rem; }
                }

                @media (max-width: 768px) {
                    .talent-section { padding: 60px 5%; }
                    .talent-container {
                        flex-direction: column;
                        text-align: center;
                        gap: 40px;
                    }
                    .talent-content p { margin: 25px auto 0; }
                    .talent-content h2 { font-size: 2.5rem; letter-spacing: 0; }
                    .talent-btn { margin-top: 25px; }
                }
            `}</style>

            <section className="talent-section" ref={sectionRef}>
                {/* Partículas de fondo */}
                {particles.map((_, i) => (
                    <div 
                        key={i} 
                        className="talent-particle"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    ></div>
                ))}

                <div className="talent-container">
                    <div className="talent-content">
                        <h2>Conoce nuestro talento</h2>
                        <p>
                            Detrás de cada solución hay personas que decidieron ir más allá de lo esperado.
                        </p>
                        <button className="talent-btn" 
                            onClick={() => navigate('/talento-hive')}
                        >Conocer</button>
                    </div>

                    <div className="talent-image-box">
                        <div className="image-decoration"></div>
                        <img
                            src={TalentImg}
                            alt="Talento COD3HIVE"
                            className="representative-img"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default TalentSection;