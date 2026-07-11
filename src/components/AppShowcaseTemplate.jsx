import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Video, User, History, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/styles/App-VotaPE.css';

gsap.registerPlugin(ScrollTrigger);

// Importación dinámica de imágenes: busca en cualquier subcarpeta app_* y filtra por la carpeta indicada en `data.imagesFolder`.
// Mientras no existan capturas reales, cae automáticamente al placeholder de `data.placeholderImage`.
const imagesGlob = import.meta.glob('../assets/images/*/*.{png,jpg,jpeg,webp}', { eager: true });

const getImagesForFolder = (folder, placeholder) => {
    const matches = Object.entries(imagesGlob)
        .filter(([path]) => path.includes(`/${folder}/`))
        .map(([, mod]) => mod.default);
    return matches.length > 0 ? matches : [placeholder];
};

/**
 * Plantilla genérica de página de presentación de app/proyecto.
 * Reutilizable para cualquier proyecto del portafolio: basta con pasarle un objeto `data`.
 * Todo el contenido de texto/imágenes/enlaces de este archivo es placeholder y puede
 * reemplazarse más adelante editando el `data` que le pasa cada componente AppXxx.jsx.
 */
const AppShowcaseTemplate = ({ data }) => {
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [images] = useState(() => {
        const source = getImagesForFolder(data.imagesFolder, data.placeholderImage);
        const shuffled = [...source];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    });

    useEffect(() => {
        if (images.length < 2) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.ch-sc-origin-fade',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            gsap.fromTo('.ch-sc-hero-fade',
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.ch-sc-hero-layout', start: 'top 80%' },
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out"
                }
            );

            gsap.fromTo('.ch-premium-testimonial-card',
                { y: 40, opacity: 0, scale: 0.98 },
                {
                    scrollTrigger: { trigger: '.ch-sc-testimonials-section', start: 'top 75%' },
                    y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "power2.out"
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="app" className="ch-showcase-view" ref={containerRef}>
            <div className="ch-sc-radial-bg"></div>

            <div className="container">

                {/* BLOQUE 1: ORIGEN */}
                <div className="ch-sc-origin-layout ch-sc-origin-fade">
                    <div className="ch-sc-origin-text">
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', background: 'rgba(139,92,246,0.12)', color: '#a78bfa', borderRadius: '4px', letterSpacing: '2px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '15px', textTransform: 'uppercase' }}>
                            <History size={12} /> {data.originBadge}
                        </span>
                        <h2>{data.originTitle}</h2>
                        <p>{data.originText1}</p>
                        <p>{data.originText2}</p>
                    </div>

                    <div className="ch-sc-vertical-video-wrapper">
                        <div className="ch-sc-vertical-viewport">
                            <video
                                src={data.videoSrc}
                                controls
                                autoPlay
                                muted
                                loop
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>

                {/* BLOQUE 2: HERO DE CAPTURA COMERCIAL */}
                <div className="ch-sc-hero-layout">

                    <div className="ch-sc-hero-fade">
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem',
                            background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', borderRadius: '99px',
                            fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem', border: '1px solid rgba(139, 92, 246, 0.3)'
                        }}>
                            <Sparkles size={12} /> {data.heroBadge}
                        </div>
                        <h2 className="heading-xl" style={{ lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff', fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>
                            {data.heroTitle}
                        </h2>
                        <p className="text-lead" style={{ margin: '0 0 2rem 0', maxWidth: '100%', color: '#C6CDD6', fontSize: '1.1rem', lineHeight: 1.7 }}>
                            {data.heroDescription}
                        </p>

                        <ul style={{ marginBottom: '2.5rem', listStyle: 'none', padding: 0 }}>
                            {data.features.map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.1rem', color: '#ffffff' }}>
                                    <CheckCircle size={20} style={{ color: '#a78bfa', flexShrink: 0 }} />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {data.ctaButtons.map((btn, i) => (
                                <a
                                    key={i}
                                    href={btn.href}
                                    target={btn.href?.startsWith('http') ? '_blank' : undefined}
                                    rel={btn.href?.startsWith('http') ? 'noreferrer' : undefined}
                                    className={btn.primary ? 'btn btn-primary' : 'btn btn-outline'}
                                    style={{ textDecoration: 'none' }}
                                >
                                    {btn.label}
                                </a>
                            ))}
                        </div>
                    </div>

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
                                        alt={`${data.heroTitle} Screen ${index + 1}`}
                                        className="ch-sc-carousel-img"
                                        loading="lazy"
                                        style={{ opacity: currentIndex === index ? 1 : 0 }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* BLOQUE 3: TESTIMONIOS */}
                <div className="ch-sc-testimonials-section">
                    <h3 className="ch-sc-section-title">
                        <Video size={14} /> live_reviews // Casos de éxito
                    </h3>

                    <div className="ch-sc-premium-grid">
                        {data.testimonials.map((test, idx) => (
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
    );
};

export default AppShowcaseTemplate;
