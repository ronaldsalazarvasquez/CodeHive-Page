import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Users, ShieldCheck } from 'lucide-react';

import '../assets/styles/Talent.css';

const imagesGlob = import.meta.glob('../assets/images/team/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}', { eager: true });

// Imagen por defecto de Unsplash en caso de que falle la carga
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop&q=80";

// URL de tu servicio de Notion
const API_URL = 'https://service-notion-beezcorp.vercel.app/api/team';

gsap.registerPlugin(ScrollTrigger);

const TalentPage = () => {
    const mainPageContainerRef = useRef(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    // Estado para la data que viene de Notion
    const [teamData, setTeamData] = useState([]);
    const [loadingTeam, setLoadingTeam] = useState(true);
    const [teamError, setTeamError] = useState(null);

    const companyValuesData = [
        { title: "Innovación Radical", desc: "No seguimos tendencias, creamos las bases del mañana digital.", icon: Rocket, accent: "#4475AD" },
        { title: "Mente de Enjambre", desc: "Colaboración absoluta. El poder del grupo supera cualquier individualidad.", icon: Users, accent: "#ffaa00" },
        { title: "Seguridad Nativa", desc: "Cada línea de código nace blindada contra amenazas futuras.", icon: ShieldCheck, accent: "#8b5cf6" }
    ];

    // Trae la data del equipo desde el servicio de Notion
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                setLoadingTeam(true);
                const res = await fetch(API_URL);
                if (!res.ok) {
                    throw new Error(`Error ${res.status} al consultar el servicio`);
                }
                const data = await res.json();
                setTeamData(data);
                setTeamError(null);
            } catch (err) {
                console.error('❌ Error al traer el equipo desde Notion:', err);
                setTeamError('No se pudo cargar el equipo. Intenta de nuevo más tarde.');
            } finally {
                setLoadingTeam(false);
            }
        };

        fetchTeam();
    }, []);

    // Re-dispara las animaciones de las tarjetas cuando la data del equipo ya llegó
    useEffect(() => {
        if (loadingTeam || teamData.length === 0) return;

        let ctx = gsap.context(() => {
            gsap.fromTo(".ch-talent-member-card",
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: ".ch-talent-team-grid",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "power2.out"
                }
            );
        }, mainPageContainerRef);

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);

        return () => ctx.revert();
    }, [loadingTeam, teamData]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Animación del Hero
            gsap.fromTo(".ch-talent-animate-hero",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
            );

            // ScrollTrigger para Sección de Valores
            gsap.fromTo(".ch-talent-val-card",
                { scale: 0.9, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: ".ch-talent-grid-values",
                        start: "top 85%",
                    },
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power1.out"
                }
            );

            // ScrollTrigger para Qué Nos Mueve
            gsap.fromTo(".ch-talent-mueve-box",
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: ".ch-talent-mueve-box",
                        start: "top 85%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                }
            );

            // ScrollTrigger para el Formulario del CV
            gsap.fromTo(".ch-talent-cv-box",
                { x: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: ".ch-talent-join-container",
                        start: "top 80%",
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out"
                }
            );

        }, mainPageContainerRef);

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);

        return () => ctx.revert();
    }, []);

    // Función auxiliar para resolver la imagen local a partir del nombre que viene de Notion
    const resolveMemberImage = (imgName) => {
        if (!imgName) return DEFAULT_IMAGE;
        const pathKey = `../assets/images/team/${imgName}`;
        if (imagesGlob[pathKey]) {
            return imagesGlob[pathKey].default || imagesGlob[pathKey];
        }
        return DEFAULT_IMAGE;
    };

    return (
        <div ref={mainPageContainerRef} style={{ backgroundColor: '#000000', overflowX: 'hidden', minHeight: '100vh' }}>


            {/* SECCIÓN 1: HERO */}
            <section className="ch-talent-hero-section">
                <div className="ch-talent-hero-content">
                    <h1 className="ch-talent-animate-hero">Conoce el ADN de <span>BEEZCORP</span></h1>
                    <p className="ch-talent-animate-hero">Mira cómo construimos el ecosistema
                        tecnológico con impacto social.</p>
                    <div className="ch-talent-animate-hero">
                        <button className="ch-talent-play-btn" onClick={() => setIsVideoModalOpen(true)}>▶</button>
                    </div>
                </div>
            </section>

            {/* MODAL DEL VIDEO POPUP */}
            {isVideoModalOpen && (
                <div className="ch-talent-modal-overlay" onClick={() => setIsVideoModalOpen(false)}>
                    <div className="ch-talent-modal-wrapper" onClick={(e) => e.stopPropagation()}>
                        <button className="ch-talent-close-btn" onClick={() => setIsVideoModalOpen(false)}>✕ Cerrar</button>
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/watch?v=_mQ_tNISckE&t"
                            title="COD3HIVE Talent Corporate Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {/* SECCIÓN 2: INTEGRANTES CORREGIDA */}
            <section id="nuestro-equipo" className="ch-talent-team-section">
                <h2 className="ch-talent-sec-title">Mentes Detrás del Código</h2>

                {/* Estado de carga */}
                {loadingTeam && (
                    <p style={{ textAlign: 'center', color: '#ccc' }}>Cargando integrantes...</p>
                )}

                {/* Estado de error */}
                {!loadingTeam && teamError && (
                    <p style={{ textAlign: 'center', color: '#ff5c5c' }}>{teamError}</p>
                )}

                {/* Grid de tarjetas, solo si ya cargó y hay datos */}
                {!loadingTeam && !teamError && (
                    <div className="ch-talent-team-grid">
                        {teamData.map((member) => (
                            <div key={member.id} className="ch-talent-member-card">
                                <div className="ch-talent-img-container">
                                    <img
                                        src={resolveMemberImage(member.img)}
                                        alt={member.name}
                                        onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                                    />
                                </div>
                                <div className="ch-talent-card-info">
                                    <h3>{member.name}</h3>
                                    <p className="ch-talent-role">{member.role}</p>
                                    <p className="ch-talent-desc">{member.description}</p>

                                    <div className="ch-talent-social-row">
                                        {/* GITHUB */}
                                        {member.social.github && member.social.github !== "#" && (
                                            <a href={member.social.github} target="_blank" rel="noreferrer" className="ch-talent-icon-link" title="GitHub">
                                                <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                            </a>
                                        )}
                                        {/* LINKEDIN */}
                                        {member.social.linkedin && member.social.linkedin !== "#" && (
                                            <a href={member.social.linkedin} target="_blank" rel="noreferrer" className="ch-talent-icon-link" title="LinkedIn">
                                                <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                            </a>
                                        )}
                                        {/* PORTAFOLIO */}
                                        {member.social.portafolio && member.social.portafolio !== "#" && (
                                            <a href={member.social.portafolio} target="_blank" rel="noreferrer" className="ch-talent-icon-link" title="Landing Page Personal">
                                                <svg viewBox="0 0 24 24"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm-9-12h9v9h-2v-5.586l-11.293 11.293-1.414-1.414 11.293-11.293h-5.586v-2z"/></svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* SECCIÓN 4 Y 5: VALORES Y QUÉ NOS MUEVE */}
            <section id="sobre-nosotros" className="ch-talent-philosophy-block">
                <div className="ch-talent-phil-wrapper">
                    <div>
                        <span className="ch-talent-values-eyebrow">// Filosofía Cod3Hive</span>
                        <h2 className="ch-talent-sec-title">Nuestros Valores</h2>
                        <div className="ch-talent-grid-values">
                            {companyValuesData.map((v, i) => {
                                const Icon = v.icon;
                                return (
                                    <div key={i} className="ch-talent-val-card" style={{ '--v-accent': v.accent }}>
                                        <span className="ch-talent-val-index">{String(i + 1).padStart(2, '0')}</span>
                                        <div className="ch-talent-val-icon-badge">
                                            <Icon size={24} />
                                        </div>
                                        <h4>{v.title}</h4>
                                        <p>{v.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section>

            {/* SECCIÓN 3 Y 6: PROPUESTA Y FORMULARIO CV */}
            <section className="ch-talent-join-section">
                <div className="ch-talent-join-container">
                    <div className="ch-talent-join-text">
                        <h2>¿Quieres unirte a nuestro equipo?</h2>
                        <p>
                            Buscamos mentes disruptivas, ingenieros de código limpio y mentes creativas obsesionadas con el detalle. Si quieres desafiar tus propios límites técnicos y trabajar en proyectos a gran escala, este es tu lugar.
                        </p>
                        <p style={{ color: '#ffaa00', fontWeight: 'bold' }}>
                            ¿No encuentras una vacante exacta para ti? No te preocupes, el talento excepcional siempre tiene un espacio aquí.
                        </p>
                    </div>

                    <div className="ch-talent-cv-box">
                        <h3>Postulación Espontánea</h3>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="ch-talent-form-group">
                                <label>Nombre Completo</label>
                                <input type="text" placeholder="Ej: Juan Pérez" required />
                            </div>
                            <div className="ch-talent-form-group">
                                <label>Email de Contacto</label>
                                <input type="email" placeholder="juan@cod3hive.com" required />
                            </div>
                            <div className="ch-talent-form-group">
                                <label>¿Cuál es tu especialidad?</label>
                                <input type="text" placeholder="Ej: Frontend Developer, QA, etc." required />
                            </div>
                            <div className="ch-talent-form-group">
                                <label>Súbenos tu CV (PDF)</label>
                                <label htmlFor="ch-talent-cv-file" className="ch-talent-file-label">
                                    📁 Seleccionar o arrastrar archivo PDF
                                </label>
                                <input type="file" id="ch-talent-cv-file" accept=".pdf" style={{ display: 'none' }} />
                            </div>
                            <button type="submit" className="ch-talent-submit-btn">Enviar al Enjambre</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TalentPage;