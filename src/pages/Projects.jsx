import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import projectsData from '../data/projects.json';

const Projects = () => {
    return (
        <div style={{ paddingTop: '100px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '5rem' }}>
                    <h1 className="heading-xl">Nuestros Proyectos</h1>
                    <p className="text-lead">
                        Explora el portafolio completo de soluciones desarrolladas por CodeHive Labs.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {projectsData.map((project) => (
                        <div key={project.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.name}</h3>
                            <p style={{ color: 'var(--color-text-muted)', flex: 1, marginBottom: '1.5rem' }}>
                                {project.description}
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                {project.tags.map((tag, i) => (
                                    <span key={i} style={{
                                        fontSize: '0.8rem',
                                        padding: '0.25rem 0.75rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '99px',
                                        color: 'var(--color-accent)'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={project.link}
                                target={project.isInternal ? "_self" : "_blank"}
                                rel="noreferrer"
                                className="btn btn-outline"
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                {project.isInternal ? 'Ver Detalles' : 'Ver Repositorio'}
                                {project.isInternal ? <ArrowRight size={18} /> : <Github size={18} />}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
