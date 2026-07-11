import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Users, ShieldCheck } from 'lucide-react';

// Importamos tu archivo JSON
import teamData from '../data/team.json'; 

import '../assets/styles/Talent.css';

// Mapeo dinámico de todas las imágenes en assets
const imagesGlob = import.meta.glob('../assets/images/team/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}', { eager: true });

// Imagen por defecto de Unsplash en caso de que falle la carga
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop&q=80";

gsap.registerPlugin(ScrollTrigger);

const TalentPage = () => {
    const mainPageContainerRef = useRef(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const companyValuesData = [
        { title: "Innovación Radical", desc: "No seguimos tendencias, creamos las bases del mañana digital.", icon: Rocket, accent: "#4475AD" },
        { title: "Mente de Enjambre", desc: "Colaboración absoluta. El poder del grupo supera cualquier individualidad.", icon: Users, accent: "#ffaa00" },
        { title: "Seguridad Nativa", desc: "Cada línea de código nace blindada contra amenazas futuras.", icon: ShieldCheck, accent: "#8b5cf6" }
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Animación del Hero
            gsap.fromTo(".ch-talent-animate-hero", 
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
            );

            // ScrollTrigger para las Tarjetas del Equipo
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

    // Función auxiliar para resolver la imagen local o devolver el fallback
    const resolveMemberImage = (imgName) => {
        const pathKey = `../assets/images/team/${imgName}`;
        if (imagesGlob[pathKey]) {
            return imagesGlob[pathKey].default || imagesGlob[pathKey];
        }
        return DEFAULT_IMAGE;
    };

    return (
        <div ref={mainPageContainerRef} style={{ backgroundColor: '#000000', overflowX: 'hidden', minHeight: '100vh' }}>
            <style>{`
                .ch-talent-hero-section {
                    position: relative;
                    width: 100vw;
                    height: 75vh;
                    background: linear-gradient(rgba(0,0,0,0.7), #000000), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    font-family: 'Montserrat', sans-serif;
                }
                .ch-talent-hero-content h1 {
                    font-size: 3.5rem;
                    font-weight: 900;
                    color: #ffffff;
                    text-transform: uppercase;
                    letter-spacing: -1px;
                    margin: 0;
                }
                .ch-talent-hero-content span { color: #4475AD; }
                .ch-talent-hero-content p {
                    color: #dae8f5;
                    font-size: 1.2rem;
                    max-width: 600px;
                    margin: 20px auto 30px;
                }
                .ch-talent-play-btn {
                    background: rgba(68, 117, 173, 0.2);
                    border: 2px solid #4475AD;
                    color: white;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 20px rgba(68, 117, 173, 0.5);
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    padding-left: 6px;
                }
                .ch-talent-play-btn:hover {
                    background: #4475AD;
                    transform: scale(1.1);
                    box-shadow: 0 0 30px #4475AD;
                }

                /* MODAL OVERLAY STYLES */
                .ch-talent-modal-overlay {
                    position: fixed;
                    top: 0; left: 0; width: 100vw; height: 100vh;
                    background: rgba(0,0,0,0.95);
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .ch-talent-modal-wrapper {
                    position: relative;
                    width: 85%;
                    max-width: 850px;
                    aspect-ratio: 16/9;
                    background: #000000;
                    border: 2px solid #4475AD;
                    box-shadow: 0 0 30px rgba(68, 117, 173, 0.4);
                }
                .ch-talent-close-btn {
                    position: absolute;
                    top: -45px; right: 0;
                    color: white; background: transparent;
                    border: none; font-size: 1.2rem; cursor: pointer;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                /* SECCIÓN INTEGRANTES MEJORADA */
                .ch-talent-team-section {
                    padding: 100px 6%;
                    max-width: 1200px;
                    margin: 0 auto;
                    font-family: 'Montserrat', sans-serif;
                }
                .ch-talent-sec-title {
                    color: #ffffff;
                    font-size: 2.4rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    margin-bottom: 60px;
                    border-left: 5px solid #ffaa00;
                    padding-left: 18px;
                    letter-spacing: 1px;
                }
                
                /* CAMBIO: Ahora son estrictamente 3 columnas en pantallas grandes */
                .ch-talent-team-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr); 
                    gap: 40px;
                }
                
                .ch-talent-member-card {
                    background: #070c11;
                    border: 1px solid rgba(68, 117, 173, 0.12);
                    border-radius: 20px;
                    padding: 24px;
                    position: relative;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(68, 117, 173, 0.03);
                    opacity: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                
                .ch-talent-member-card::before, .ch-talent-member-card::after {
                    content: '';
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    transition: all 0.3s ease;
                    opacity: 0.2;
                }
                .ch-talent-member-card::before {
                    top: 12px; right: 12px;
                    border-top: 2px solid #ffaa00;
                    border-right: 2px solid #ffaa00;
                }
                .ch-talent-member-card::after {
                    bottom: 12px; left: 12px;
                    border-bottom: 2px solid #ffaa00;
                    border-left: 2px solid #ffaa00;
                }
                
                .ch-talent-member-card:hover {
                    border-color: rgba(68, 117, 173, 0.5);
                    box-shadow: 0 15px 35px rgba(68, 117, 173, 0.15), inset 0 0 15px rgba(68, 117, 173, 0.05);
                    transform: translateY(-8px);
                }
                .ch-talent-member-card:hover::before, .ch-talent-member-card:hover::after {
                    opacity: 1;
                    width: 20px; height: 20px;
                }

                /* CAMBIO: Contenedor con Aspect Ratio Retrato (3:4 vertical) */
                .ch-talent-img-container {
                    width: 100%;
                    aspect-ratio: 3 / 4; 
                    overflow: hidden;
                    position: relative;
                    border-radius: 12px;
                    background-color: #020406;
                }
                .ch-talent-img-container::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(to bottom, rgba(7, 12, 17, 0) 50%, rgba(7, 12, 17, 0.95) 100%);
                    transition: opacity 0.4s ease;
                }
                .ch-talent-img-container img {
                    width: 100%; height: 100%; object-fit: cover;
                    filter: grayscale(20%) contrast(1.05);
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .ch-talent-member-card:hover .ch-talent-img-container img {
                    transform: scale(1.04);
                    filter: grayscale(0%) contrast(1);
                }
                
                .ch-talent-card-info { 
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                }
                .ch-talent-card-info h3 { 
                    color: #ffffff; 
                    margin: 0 0 4px 0; 
                    font-size: 1.5rem; 
                    font-weight: 700; 
                    letter-spacing: -0.5px;
                }
                .ch-talent-role { 
                    color: #4475AD; 
                    margin: 0 0 16px 0; 
                    font-size: 0.88rem; 
                    font-weight: 700; 
                    text-transform: uppercase; 
                    letter-spacing: 1.5px;
                }
                .ch-talent-desc {
                    color: #8fa0b5;
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin: 0;
                    font-weight: 400;
                    min-height: 70px;
                }

                .ch-talent-social-row {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 12px;
                    border-top: 1px solid rgba(68, 117, 173, 0.1);
                    padding-top: 20px;
                    margin-top: 5px;
                }
                .ch-talent-icon-link {
                    color: #a4b8cc;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: rgba(68, 117, 173, 0.04);
                    border: 1px solid rgba(68, 117, 173, 0.12);
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .ch-talent-icon-link svg {
                    width: 18px;
                    height: 18px;
                    fill: currentColor;
                }
                .ch-talent-icon-link:hover {
                    color: #ffffff;
                    background: #4475AD;
                    border-color: #4475AD;
                    transform: translateY(-4px);
                    box-shadow: 0 6px 15px rgba(68, 117, 173, 0.4);
                }

                /* FILOSOFÍA CORPORATIVA */
                .ch-talent-philosophy-block {
                    background: #040404;
                    padding: 110px 6%;
                    font-family: 'Montserrat', sans-serif;
                }
                .ch-talent-phil-wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 90px;
                }
                .ch-talent-values-eyebrow {
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #ffaa00;
                    text-transform: uppercase;
                    font-family: monospace;
                    margin: 0 0 12px 18px;
                    display: block;
                }
                .ch-talent-grid-values {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 30px;
                }
                .ch-talent-val-card {
                    background: linear-gradient(160deg, #0b0b0d 0%, #060607 100%);
                    padding: 40px 30px;
                    border-radius: 14px;
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    border-top: 3px solid var(--v-accent, #4475AD);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                    opacity: 0;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease, border-color 0.3s ease;
                }
                .ch-talent-val-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(255, 255, 255, 0.1);
                    box-shadow: 0 25px 50px rgba(0,0,0,0.6), 0 0 30px color-mix(in srgb, var(--v-accent, #4475AD) 25%, transparent);
                }
                .ch-talent-val-index {
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    font-size: 4rem;
                    font-weight: 900;
                    font-family: monospace;
                    color: #ffffff;
                    opacity: 0.04;
                    line-height: 1;
                    pointer-events: none;
                    transition: opacity 0.4s ease;
                }
                .ch-talent-val-card:hover .ch-talent-val-index { opacity: 0.08; }
                .ch-talent-val-icon-badge {
                    width: 54px;
                    height: 54px;
                    border-radius: 14px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 22px;
                    background: color-mix(in srgb, var(--v-accent, #4475AD) 14%, transparent);
                    border: 1px solid color-mix(in srgb, var(--v-accent, #4475AD) 35%, transparent);
                    color: var(--v-accent, #4475AD);
                    transition: transform 0.3s ease;
                }
                .ch-talent-val-card:hover .ch-talent-val-icon-badge { transform: scale(1.08) rotate(-4deg); }
                .ch-talent-val-card h4 { color: #ffffff; font-size: 1.35rem; margin: 0 0 15px 0; font-weight: 700; position: relative; }
                .ch-talent-val-card p { color: #dae8f5; line-height: 1.7; margin: 0; opacity: 0.85; font-size: 0.98rem; position: relative; }
                
                .ch-talent-mueve-box {
                    background: linear-gradient(145deg, #090909, #0f1721);
                    padding: 45px;
                    border-radius: 14px;
                    border: 1px solid rgba(68, 117, 173, 0.15);
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                    opacity: 0;
                }
                .ch-talent-mueve-box p { color: #dae8f5; font-size: 1.15rem; line-height: 1.8; margin: 0; }

                /* SECCIÓN RECLUTAMIENTO */
                .ch-talent-join-section {
                    padding: 110px 6%;
                    max-width: 1200px;
                    margin: 0 auto;
                    font-family: 'Montserrat', sans-serif;
                }
                .ch-talent-join-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 70px;
                    align-items: center;
                }
                .ch-talent-join-text h2 { color: #ffffff; font-size: 3rem; font-weight: 900; margin: 0 0 25px 0; text-transform: uppercase; line-height: 1.1; }
                .ch-talent-join-text p { color: #dae8f5; line-height: 1.8; font-size: 1.1rem; margin-bottom: 25px; }
                
                .ch-talent-cv-box {
                    background: #080808;
                    border: 1px solid #141414;
                    padding: 45px;
                    border-radius: 16px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.6);
                    opacity: 0;
                }
                .ch-talent-cv-box h3 { color: #ffaa00; margin: 0 0 30px 0; font-size: 1.45rem; text-transform: uppercase; font-weight: 800; letter-spacing: 0.5px;}
                .ch-talent-form-group { margin-bottom: 22px; display: flex; flex-direction: column; gap: 9px; }
                .ch-talent-form-group label { color: #ffffff; font-size: 0.88rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;}
                .ch-talent-form-group input {
                    background: #121212; border: 1px solid #222; padding: 14px; border-radius: 8px;
                    color: white; font-family: 'Montserrat', sans-serif; outline: none; transition: border-color 0.3s;
                    font-size: 0.95rem;
                }
                .ch-talent-form-group input:focus { border-color: #4475AD; }
                .ch-talent-file-label {
                    background: #161616; border: 2px dashed #2c2c2c; padding: 25px; text-align: center;
                    color: #dae8f5; cursor: pointer; border-radius: 8px; transition: all 0.3s;
                    font-weight: 500;
                }
                .ch-talent-file-label:hover { border-color: #4475AD; color: white; background: rgba(68,117,173,0.04); }
                .ch-talent-submit-btn {
                    width: 100%; background: #4475AD; color: white; border: none; padding: 15px;
                    font-size: 1rem; font-weight: 700; border-radius: 8px; cursor: pointer;
                    text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s;
                    margin-top: 12px;
                    box-shadow: 0 4px 15px rgba(68, 117, 173, 0.3);
                }
                .ch-talent-submit-btn:hover { background: #365e8c; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(68, 117, 173, 0.5); }

                /* === RESPONSIVE AJUSTADO PARA LAS REDES DE COLUMNAS === */
                @media (max-width: 1024px) {
                    .ch-talent-team-grid { grid-template-columns: repeat(2, 1fr); } /* 2 en tablets */
                    .ch-talent-join-container { grid-template-columns: 1fr; gap: 50px; }
                    .ch-talent-hero-content h1 { font-size: 2.8rem; }
                }
                @media (max-width: 768px) {
                    .ch-talent-team-grid { grid-template-columns: 1fr; } /* 1 en móviles */
                    .ch-talent-hero-section { height: 65vh; }
                    .ch-talent-hero-content h1 { font-size: 2.2rem; }
                    .ch-talent-hero-content p { font-size: 1rem; }
                    .ch-talent-sec-title { font-size: 1.9rem; }
                    .ch-talent-join-text h2 { font-size: 2.2rem; }
                    .ch-talent-cv-box { padding: 30px 20px; }
                    .ch-talent-mueve-box { padding: 30px 20px; }
                }
            `}</style>

            {/* SECCIÓN 1: HERO */}
            <section className="ch-talent-hero-section">
                <div className="ch-talent-hero-content">
                    <h1 className="ch-talent-animate-hero">Conoce el ADN de <span>COD3HIVE</span></h1>
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
                                    {/* TWITTER / X */}
                                    {member.social.twitter && member.social.twitter !== "#" && (
                                        <a href={member.social.twitter} target="_blank" rel="noreferrer" className="ch-talent-icon-link" title="Red Social">
                                            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                        </a>
                                    )}
                                    {/* PORTFOLIO */}
                                    {member.social.portfolio && member.social.portfolio !== "#" && (
                                        <a href={member.social.portfolio} target="_blank" rel="noreferrer" className="ch-talent-icon-link" title="Landing Page Personal">
                                            <svg viewBox="0 0 24 24"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm-9-12h9v9h-2v-5.586l-11.293 11.293-1.414-1.414 11.293-11.293h-5.586v-2z"/></svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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