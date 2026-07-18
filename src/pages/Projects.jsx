import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, ArrowRight, Terminal, Layers } from 'lucide-react';
import gsap from 'gsap';
import projectsData from '../data/projects.json';
import '../assets/styles/Projects.css';

const Projects = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    // Paleta de colores de marca premium (Acentos de Neón Tecnológico)
    const getProjectColor = (index) => {
        const colors = [
            { banner: '#19A9FF', glow: 'rgba(25, 169, 255, 0.15)', tagBg: 'rgba(25, 169, 255, 0.08)', tagColor: '#5CCBFF' }, // Cyan
            { banner: '#F4B400', glow: 'rgba(244, 180, 0, 0.15)', tagBg: 'rgba(244, 180, 0, 0.08)', tagColor: '#FFD54A' }, // Amarillo Abeja
            { banner: '#00E5FF', glow: 'rgba(0, 229, 255, 0.15)', tagBg: 'rgba(0, 229, 255, 0.08)', tagColor: '#63F5FF' }, // Teal Eléctrico
        ];
        return colors[index % colors.length];
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Animación del título principal
            gsap.fromTo('.ch-projects-title-block', 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            // Entrada fluida de las tarjetas en cascada cinematográfica (stagger)
            gsap.fromTo('.ch-portfolio-card', 
                { y: 40, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "power2.out", delay: 0.2 }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div className="ch-global-projects-view" ref={containerRef}>
                <div className="ch-portfolio-container">
                    
                    {/* ENCABEZADO TIPO HUD CON MARCA DE ACENTO */}
                    <div className="ch-projects-title-block">
                        <h1>Nuestros Proyectos</h1>
                        <p>Explora el ecosistema completo de aplicaciones e ingeniería digital de Beez Core Labs.</p>
                    </div>

                    {/* CUADRÍCULA DE PORTAFOLIO GLOBAL */}
                    <div className="ch-portfolio-grid">
                        {projectsData.map((project, index) => {
                            const c = getProjectColor(index);
                            return (
                                <div 
                                    key={project.id} 
                                    className="ch-portfolio-card"
                                    style={{ 
                                        '--p-banner': c.banner,
                                        '--p-glow': c.glow,
                                        '--p-tag-bg': c.tagBg,
                                        '--p-tag-color': c.tagColor
                                    }}
                                >
                                    {/* SECCIÓN SUPERIOR: VISUAL DE LA APP */}
                                    <div className="ch-p-img-box">
                                        <img 
                                            src={project.image} 
                                            alt={project.name} 
                                            onError={e => {
                                                e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80';
                                            }}
                                        />
                                        <div className="ch-p-img-overlay"></div>
                                    </div>

                                    {/* CUERPO DE DATOS */}
                                    <div className="ch-p-body">
                                        <h3>{project.name}</h3>
                                        <p>{project.description}</p>

                                        {/* TECNOLOGÍAS USADAS */}
                                        <div className="ch-p-tags-wrapper">
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="ch-p-tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* ACCIONES Y ESTADO TRANSACCIONAL */}
                                        <div className="ch-p-footer">
                                            <div className="ch-status-indicator">
                                                <span className="ch-status-dot"></span> Active Core
                                            </div>
                                            
                                            {project.isInternal ? (
                                                /* Si es interno, usamos el enrutador para enviarlo a su sub-pilar/app */
                                                <button 
                                                    onClick={() => navigate(project.link)}
                                                    className="ch-p-action-link"
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                                >
                                                    Ver detalles <ArrowRight size={14} />
                                                </button>
                                            ) : (
                                                /* Si es externo, abre una nueva pestaña normal */
                                                <a 
                                                    href={project.link} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="ch-p-action-link"
                                                >
                                                    Ver repositorio <Github size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Projects;