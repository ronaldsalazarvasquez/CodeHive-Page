import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import gsap from 'gsap';
import { ExternalLink, Terminal, Play } from 'lucide-react';
import '../assets/styles/Pillars.css';

const PilarDetailPage = () => {
    const containerRef = useRef(null);
    const bgCanvasRef = useRef(null);
    const navigate = useNavigate();
    const { idPilar } = useParams(); 

    const pilaresDatabase = {
        plataformas: {
            headerTitle: "Plataformas Escalables",
            tagline: "INFRASTRUCTURE ENGINE",
            videoUrl: "/videos/presentacion-plataformas.mp4", 
            isVideoLocal: true, // 💡 Reemplazar con el video de este pilar
            apps: [
                {
                    appId: "cix360", // 👇 Nuevo ID único para la ruta
                    name: "Cix360",
                    tag: "PLATAFORMA EMPRESARIAL",
                    desc: "Sistema integral de seguridad ciudadana para .",
                    image: "../assets/images/app_Cix360/logoCix360.png",
                    accent: "#F4B400"
                },
            ]
        },
        tecnologia: {
            headerTitle: "Tecnología de Alto Impacto",
            tagline: "FAULT-TOLERANT ARCHITECTURE",
            videoUrl: "/videos/presentacion-plataformas.mp4", 
            isVideoLocal: true,
            apps: [
                {
                    appId: "votape", // 👇 Nuevo ID único para la ruta
                    name: "VotaPe",
                    tag: "SISTEMA CRÍTICO",
                    desc: "Plataforma de votación descentralizada diseñada con tolerancia a fallos y auditoría criptográfica.",
                    image: "../assets/images/app_VotaPE/logoVotaPE.webp",
                    accent: "#F4B400"
                }
            ]
        },
        reingenieria: {
            headerTitle: "Modernización Digital",
            tagline: "COD3HIVE // BUSINESS DEVELOPMENT",
            videoUrl: "/videos/presentacion-plataformas.mp4", 
            isVideoLocal: true,
            apps: [
                {
                    appId: "evolucion-legacy", // 👇 Nuevo ID único para la ruta
                    name: "Evolución Legacy",
                    tag: "REINGENIERÍA",
                    desc: "Migración controlada y segura de sistemas monolíticos antiguos hacia soluciones nativas en la nube.",
                    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
                    accent: "#F4B400"
                },
                {
                    appId: "core-transaccional", // 👇 Nuevo ID único para la ruta
                    name: "Core Transaccional",
                    tag: "HIGH CONCURRENCY",
                    desc: "Procesamiento asíncrono seguro diseñado para cargas críticas sin riesgo de colapso.",
                    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
                    accent: "#F4B400"
                }
            ]
        }
    };

    const currentData = pilaresDatabase[idPilar] || pilaresDatabase.plataformas;

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.ch-hud-corner', 
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1 }
            );

            gsap.fromTo('.ch-mask-title h1',
                { letterSpacing: "15px", opacity: 0, filter: "blur(10px)" },
                { letterSpacing: "-1px", opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out", delay: 0.2 }
            );

            gsap.to('.ch-animate-text-bg', {
                backgroundPosition: "200% center",
                duration: 6,
                repeat: -1,
                ease: "none"
            });

            // Animación para el contenedor de video horizontal
            gsap.fromTo('.ch-horizontal-video-panel',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 }
            );

            gsap.fromTo('.ch-catalog-card', 
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out", delay: 0.6 }
            );

            const particles = gsap.utils.toArray('.ch-bg-particle');
            particles.forEach((particle) => {
                gsap.to(particle, {
                    x: `random(-100, 100)`,
                    y: `random(-100, 100)`,
                    opacity: `random(0.1, 0.4)`,
                    duration: `random(6, 12)`,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });

            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const moveX = (clientX / window.innerWidth - 0.5) * 20;
                const moveY = (clientY / window.innerHeight - 0.5) * 20;

                gsap.to('.ch-interactive-bg-layer', {
                    x: moveX,
                    y: moveY,
                    duration: 1.5,
                    ease: "power2.out"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);

        }, containerRef);

        return () => ctx.revert();
    }, [idPilar]);

    return (
        <>
            <div className="ch-catalog-hub-view" ref={containerRef}>
                <div className="ch-interactive-bg-layer" ref={bgCanvasRef}>
                    {Array.from({ length: 15 }).map((_, idx) => (
                        <div 
                            key={idx} 
                            className="ch-bg-particle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                transform: `scale(${Math.random() * 1.2 + 0.4})`
                            }}
                        />
                    ))}
                </div>

                <div className="ch-hub-container">
                    
                    {/* CABECERA PREMIUM DINÁMICA */}
                    <div className="ch-cinematic-header-panel">
                        <div className="ch-hud-corner ch-c-tl"></div>
                        <div className="ch-hud-corner ch-c-tr"></div>
                        <div className="ch-hud-corner ch-c-bl"></div>
                        <div className="ch-hud-corner ch-c-br"></div>

                        <header className="ch-mask-title">
                            <span className="tagline"><Terminal size={12} /> {currentData.tagline}</span>
                            <h1 className="ch-animate-text-bg">{currentData.headerTitle}</h1>
                        </header>
                    </div>

                    {/* 👇 NUEVA SECCIÓN: VIDEO EXPLICATIVO HORIZONTAL DEL PILAR */}
                    <div className="ch-horizontal-video-panel">
                        <h3 className="ch-video-section-title">
                            <Play size={14} fill="currentColor" /> Te lo explicamos en 2 minutos
                        </h3>
                        <div className="ch-pilar-video-viewport">
                            <video 
                                src={currentData.videoUrl} 
                                controls 
                                preload="metadata"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <iframe 
                                src={currentData.videoUrl} 
                                title={`Cod3Hive - Overview ${currentData.headerTitle}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* CUADRÍCULA MUTABLE DE TARJETAS */}
                    <div className="ch-catalog-grid">
                        {currentData.apps.map((app, idx) => (
                            <div 
                                key={idx} 
                                className="ch-catalog-card"
                                style={{ '--card-accent': app.accent }}
                                // 👇 MODIFICADO: Genera dinámicamente la ruta a la ventana interna de la aplicación
                                onClick={() => navigate(`/proyectos/${app.appId}`)}
                            >
                                <div className="ch-card-img-box">
                                    <img src={new URL(app.image, import.meta.url).href} alt={app.name} />
                                    <div className="ch-card-img-overlay"></div>
                                    <span className="ch-card-floating-tag">{app.tag}</span>
                                </div>

                                <div className="ch-card-info-box">
                                    <div>
                                        <h2>{app.name}</h2>
                                        <p>{app.desc}</p>
                                    </div>
                                    <div className="ch-card-icon-link">
                                        <ExternalLink size={16} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
};

export default PilarDetailPage;