import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/styles/Cod3HiveInfo.css';

gsap.registerPlugin(ScrollTrigger);

// 2. Galería de Trayectoria
const galleryPhotos = [
    {
        id: 1,
        title: "Hackathon Nacional Dev",
        location: "Lima, Perú — Mar 2026",
        subtitle: "Fase intensiva de arquitectura y pruebas de penetración en tiempo real.",
        img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Buildathon Fintech Latam",
        location: "Remoto — Ene 2026",
        subtitle: "Despliegue de microservicios resilientes bajo alta concurrencia.",
        img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Demostración ante Jurado",
        location: "Sede Central — Nov 2025",
        subtitle: "Presentación final de resultados e impacto del algoritmo heurístico.",
        img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
    }
];

// 3. Voz de la Escuadra (Formato Reels / Bitácora de Campo)
const reelPosts = [
    {
        id: 1,
        tag: "#ANECDOTA_DEV",
        author: "Lenin R.",
        role: "Full Stack & Sec",
        mediaImg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        caption: "3:00 AM en plena Hackathon. El bug era una comilla en una variable de entorno. Moraleja: nunca confíes en un .env copiado con prisa."
    },
    {
        id: 2,
        tag: "#EN_COMPETENCIA",
        author: "Escuadra Cod3Hive",
        role: "Core Team",
        mediaImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
        caption: "Presentando la demo final frente a los jueces con 0% de latencia. Ese momento donde todo el esfuerzo de 48 hrs encaja a la perfección."
    },
    {
        id: 3,
        tag: "#DEFENSE_LAB",
        author: "Cyber Unit",
        role: "Blue Team",
        mediaImg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
        caption: "Frenando un ataque de denegación simulado en el CTF Regional. Tuvimos que improvisar un rate limiter en menos de 10 minutos."
    }
];

// 4. Radar de Próximos Desafíos (Estilo Screenshot 2)
const radarTimeline = [
    {
        date: "AGO 2026",
        title: "Global CyberSec Cup",
        subtitle: "Fase de clasificación regional."
    },
    {
        date: "SEP 2026",
        title: "LLM Ops Challenge",
        subtitle: "Investigando: RAG evaluado + guardrails."
    },
    {
        date: "OCT 2026",
        title: "Fintech Hack Latam",
        subtitle: "Squad de 5 · foco en fraude en tiempo real."
    },
    {
        date: "DIC 2026",
        title: "Kernel Wars",
        subtitle: "Explotación de bajo nivel, prep en curso."
    }
];

const Cod3HiveEventsPage = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.ch-animate', {
                y: 25,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: 'top 85%',
                }
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="ch-wrapper">
            <div className="ch-container">
                {/* 1. HERO SECTION (REPLICANDO IMAGEN 1) */}
                <header className="ch-hero ch-animate">
                    <div className="ch-hero-badges">
                        <span className="ch-hero-badge">CÉLULA ACTIVA</span>
                        <span className="ch-hero-badge">LABORATORIO DEV & SEC</span>
                        <span className="ch-hero-badge">BEEZCORP UNIT</span>
                    </div>

                    <div className="ch-hero-title-wrap">
                        <h1 className="ch-hero-title">
                            <span className="ch-title-solid">COD3</span>
                            <span className="ch-title-stroke">HIVE</span>
                        </h1>
                    </div>

                    <div className="ch-hero-body">
                        <div className="ch-hero-text-side">
                            <p className="ch-hero-paragraph">
                                La célula competitiva y laboratorio de innovación de <u>BeezCorp</u>. Representamos a la empresa en torneos de software, hackathons y retos tecnológicos de alta exigencia.
                            </p>
                        </div>

                        <div>
                            <table className="ch-hero-stats-table">
                                <tbody>
                                    <tr>
                                        <td className="ch-stat-label">FUNDADA</td>
                                        <td className="ch-stat-value">2022</td>
                                    </tr>
                                    <tr>
                                        <td className="ch-stat-label">ESCUADRAS</td>
                                        <td className="ch-stat-value">04</td>
                                    </tr>
                                    <tr>
                                        <td className="ch-stat-label">TORNEOS</td>
                                        <td className="ch-stat-value">27+</td>
                                    </tr>
                                    <tr>
                                        <td className="ch-stat-label">PODIOS</td>
                                        <td className="ch-stat-value">11</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </header>

                {/* 2. GALERÍA DE TRAYECTORIA */}
                <section className="ch-animate">
                    <div className="ch-sec-head">
                        <span className="ch-sec-num">/ 02</span>
                        <h2 className="ch-sec-title">Galería de Trayectoria</h2>
                    </div>

                    <div className="ch-gallery-grid">
                        {galleryPhotos.map((photo) => (
                            <div key={photo.id} className="ch-photo-card ch-animate">
                                <div className="ch-photo-img-wrap">
                                    <img src={photo.img} alt={photo.title} className="ch-photo-img" />
                                </div>
                                <div className="ch-photo-info">
                                    <div className="ch-photo-meta">{photo.location}</div>
                                    <h3 className="ch-photo-title">{photo.title}</h3>
                                    <p className="ch-photo-sub">{photo.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. VOZ DE LA ESCUADRA (FORMATO REELS / CARDS CON MEDIA) */}
                <section className="ch-animate">
                    <div className="ch-sec-head">
                        <span className="ch-sec-num">/ 03</span>
                        <h2 className="ch-sec-title">Voz de la Escuadra</h2>
                    </div>

                    <div className="ch-reels-grid">
                        {reelPosts.map((post) => (
                            <div key={post.id} className="ch-reel-card ch-animate">
                                <div className="ch-reel-media">
                                    <span className="ch-reel-tag">{post.tag}</span>
                                    <img src={post.mediaImg} alt={post.tag} className="ch-reel-img" />
                                </div>
                                <div className="ch-reel-content">
                                    <p className="ch-reel-caption">{post.caption}</p>
                                    <div className="ch-reel-author-block">
                                        <div className="ch-reel-avatar">{post.author.charAt(0)}</div>
                                        <div>
                                            <h4 className="ch-reel-author-name">{post.author}</h4>
                                            <p className="ch-reel-author-role">{post.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. RADAR / PRÓXIMOS DESAFÍOS (REPLICANDO IMAGEN 2) */}
                <section className="ch-radar-section ch-animate">
                    <div className="ch-radar-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span className="ch-sec-num">/ 04</span>
                            <h2 className="ch-sec-title" style={{ margin: 0 }}>Radar / Próximos Desafíos</h2>
                        </div>
                        <span className="ch-radar-tagline">NUNCA EN PAUSA</span>
                    </div>

                    <div className="ch-timeline">
                        {radarTimeline.map((item, idx) => (
                            <div key={idx} className="ch-timeline-node ch-animate">
                                <div className="ch-timeline-date">{item.date}</div>
                                <h3 className="ch-timeline-title">{item.title}</h3>
                                <p className="ch-timeline-sub">{item.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Cod3HiveEventsPage;