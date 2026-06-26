import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Play, Video, User, History, Shield, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/styles/App-VotaPE.css';

gsap.registerPlugin(ScrollTrigger);

// Dynamically import all images
const imagesGlob = import.meta.glob('../assets/images/app_VotaPE/*.{png,jpg,jpeg}', { eager: true });
const allImages = Object.values(imagesGlob).map((mod) => mod.default);

const AppShowcase = () => {
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Lógica original de Shuffle de imágenes intacta
    const [images] = useState(() => {
        const shuffled = [...allImages];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.length > 0 ? shuffled : [
            "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=400&q=80",
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80"
        ];
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    // Revelados elegantes coordinados por ScrollTrigger
    useEffect(() => {
        let ctx = gsap.context(() => {
            // Entrada del bloque Origen
            gsap.fromTo('.ch-sc-origin-fade', 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            // Entrada del Hero Principal (Descubre VotaPE)
            gsap.fromTo('.ch-sc-hero-fade',
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: '.ch-sc-hero-layout',
                        start: 'top 80%',
                    },
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out"
                }
            );

            // Entrada en cascada de los testimonios cinemáticos
            gsap.fromTo('.ch-premium-testimonial-card',
                { y: 40, opacity: 0, scale: 0.98 },
                {
                    scrollTrigger: {
                        trigger: '.ch-sc-testimonials-section',
                        start: 'top 75%',
                    },
                    y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "power2.out"
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            

            <section id="app" className="ch-showcase-view" ref={containerRef}>
                <div className="ch-sc-radial-bg"></div>

                <div className="container">
                    
                    {/* 🚀 BLOQUE 1: ORIGEN (MÁS ARRIBA Y CON EL VIDEO VERTICAL MÁS GRANDE) */}
                    <div className="ch-sc-origin-layout ch-sc-origin-fade">
                        <div className="ch-sc-origin-text">
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', background: 'rgba(139,92,246,0.12)', color: '#a78bfa', borderRadius: '4px', letterSpacing: '2px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '15px', textTransform: 'uppercase' }}>
                                <History size={12} /> El Origen // Ingeniería con propósito
                            </span>
                            <h2>¿Cómo nace VotaPE?</h2>
                            <p>
                                En un entorno donde la saturación de información confunde al electorado, identificamos una necesidad crítica: la falta de centralización y verificación de datos políticos fiables. 
                            </p>
                            <p>
                                VotaPE nació en los laboratorios de Cod3Hive con la visión de empoderar al ciudadano mediante tecnología limpia, auditada y de libre acceso, erradicando las barreras de la desinformación en los procesos democráticos.
                            </p>
                        </div>

                        {/* Video explicativo vertical integrado a un costado - Ahora Redimensionado */}
                        <div className="ch-sc-vertical-video-wrapper">
                            <div className="ch-sc-vertical-viewport">
                                <video 
                                    src="/videos/tu-video-presentacion.mp4" 
                                    controls 
                                    autoPlay 
                                    muted 
                                    loop
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 🚀 BLOQUE 2: HERO DE CAPTURA COMERCIAL (DESCUBRE VOTAPE) */}
                    <div className="ch-sc-hero-layout">
                        
                        <div className="ch-sc-hero-fade">
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem',
                                background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', borderRadius: '99px',
                                fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem', border: '1px solid rgba(139, 92, 246, 0.3)'
                            }}>
                                <Sparkles size={12} /> Solución Desplegada
                            </div>
                            <h2 className="heading-xl" style={{ lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff', fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>
                                Descubre VotaPE
                            </h2>
                            <p className="text-lead" style={{ margin: '0 0 2rem 0', maxWidth: '100%', color: '#C6CDD6', fontSize: '1.1rem', lineHeight: 1.7 }}>
                                La herramienta definitiva para la transparencia política. Accede a información veraz, compara candidatos y toma las mejores decisiones en las próximas elecciones.
                            </p>

                            <ul style={{ marginBottom: '2.5rem', listStyle: 'none', padding: 0 }}>
                                {[
                                    "Información Política Transparente",
                                    "Comparación de Candidatos",
                                    "Planes de Gobierno Detallados",
                                    "Noticias Electorales en Tiempo Real"
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.1rem', color: '#ffffff' }}>
                                        <CheckCircle size={20} style={{ color: '#a78bfa', flexShrink: 0 }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                <a href="https://apps.apple.com/pe/app/votape/id6757588267" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#000', color: '#fff', padding: '8px 16px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #333', width: '170px' }}>
                                    <svg viewBox="0 0 384 512" width="24" height="24" fill="currentColor" style={{ marginRight: '12px' }}><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 46.9 94.3 80.9 94.3 24.8 0 31.9-19.1 57.5-19.1 26.5 0 32.8 19.1 58.4 19.1 32.9 0 66.8-55 81-93.5-2-1.9-46.7-17-47.5-86.8zm-155-154.5c19.4-25.2 41.5-68.5 35-108.6-32.8 8.1-66.7 44.8-82.6 86-12.7 34.6-1.3 76.5 47.6 22.6z" /></svg>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
                                        <span style={{ fontSize: '10px', opacity: 0.8 }}>Download on the</span>
                                        <span style={{ fontSize: '18px', fontWeight: 600 }}>App Store</span>
                                    </div>
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=com.votape.app" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#000', color: '#fff', padding: '8px 16px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #333', width: '180px' }}>
                                    <svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor" style={{ marginRight: '12px' }}><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" /></svg>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
                                        <span style={{ fontSize: '10px', opacity: 0.8, textTransform: 'uppercase' }}>Get it on</span>
                                        <span style={{ fontSize: '18px', fontWeight: 600 }}>Google Play</span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* TU IPHONE ORIGINAL INTEGRAL REPARADO CON RECORTE */}
                        <div style={{ display: 'flex', justifyContent: 'center' }} className="ch-sc-hero-fade">
                            <div className="ch-sc-iphone-frame">
                                <div className="vol-up"></div>
                                <div className="vol-down"></div>
                                <div className="power"></div>

                                <div className="ch-sc-iphone-screen">
                                    <div className="ch-sc-iphone-island"></div>
                                    <div className="ch-sc-iphone-reflection"></div>

                                    {images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`VotaPE Screen ${index + 1}`}
                                            className="ch-sc-carousel-img"
                                            style={{ opacity: currentIndex === index ? 1 : 0 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 🚀 BLOQUE 3: TESTIMONIOS HUD EN VIDEO */}
                    <div className="ch-sc-testimonials-section">
                        <h3 className="ch-sc-section-title">
                            <Video size={14} /> live_reviews // Casos de éxito validados
                        </h3>
                        
                        <div className="ch-sc-premium-grid">
                            {[
                                { name: "Juan Alarcón", role: "Beta Tester / Estudiante", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", code: "SRC_FEEDBACK_01" },
                                { name: "Elena Ramos", role: "Auditora Politécnica", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", code: "SRC_FEEDBACK_02" }
                            ].map((test, idx) => (
                                <div key={idx} className="ch-premium-testimonial-card">
                                    <div className="ch-sc-video-box-premium">
                                        <span className="ch-sc-video-hud-overlay">// {test.code}</span>
                                        <iframe src={test.video} title={`Testimonial stream ${test.name}`} allowFullScreen></iframe>
                                    </div>
                                    
                                    <div className="ch-premium-user-bar">
                                        <div className="ch-premium-avatar">
                                            <User size={15} />
                                        </div>
                                        <div className="ch-premium-user-info">
                                            <h4>{test.name}</h4>
                                            <p>{test.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default AppShowcase;