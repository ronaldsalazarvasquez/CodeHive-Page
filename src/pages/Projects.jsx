import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import projectsData from '../data/projects.json';




const Projects = () => {
    const getProjectColor = (index) => {
            const colors = [
                { banner: '#7F77DD', iconBg: '#EEEDFE', iconColor: '#534AB7', tagBg: '#EEEDFE', tagColor: '#534AB7' },
                { banner: '#1D9E75', iconBg: '#E1F5EE', iconColor: '#0F6E56', tagBg: '#E1F5EE', tagColor: '#0F6E56' },
                { banner: '#D85A30', iconBg: '#FAECE7', iconColor: '#993C1D', tagBg: '#FAECE7', tagColor: '#993C1D' },
            ];
            return colors[index % colors.length];
        };

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '5rem' }}>
                    <h1 className="heading-xl">Nuestros Proyectos</h1>
                    <p className="text-lead">
                        Explora el portafolio completo de soluciones desarrolladas por Cod3Hive Labs.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                    gap: '1.5rem',
                    justifyContent: 'center',
                }}>
                    {projectsData.map((project, index) => {
                        const c = getProjectColor(index);
                        return (
                            <div key={project.id} style={{
                                background: 'var(--color-bg-card, rgba(255,255,255,0.05))',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s, border-color 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                            >
                                {/* Barra de color */}
                                <div style={{ height: '6px', background: c.banner }} />

                                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    {/* Ícono */}
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '10px',
                                        background: c.iconBg, display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', marginBottom: '1rem',
                                    }}>
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            onError={e => {
                                                e.currentTarget.src = 'https://png.pngtree.com/png-clipart/20210314/original/pngtree-not-loaded-during-loading-png-image_6083139.jpg';
                                            }}
                                            style={{ width: '26px', height: '26px', objectFit: 'contain' }}
                                        />
                                    </div>

                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                        {project.name}
                                    </h3>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6, flex: 1, marginBottom: '1rem' }}>
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
                                        {project.tags.map((tag, i) => (
                                            <span key={i} style={{
                                                fontSize: '0.75rem', padding: '3px 10px',
                                                background: c.tagBg, color: c.tagColor,
                                                borderRadius: '99px', fontWeight: 600,
                                            }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)' }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1D9E75', display: 'inline-block' }} />
                                            Activo
                                        </span>
                                        <a href={project.link} target={project.isInternal ? '_self' : '_blank'} rel="noreferrer"
                                            style={{ fontSize: '0.875rem', fontWeight: 600, color: c.iconColor, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            {project.isInternal ? 'Ver detalles' : 'Ver repo'}
                                            {project.isInternal ? <ArrowRight size={14} /> : <Github size={14} />}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            
        </div>
    );
};

export default Projects;
