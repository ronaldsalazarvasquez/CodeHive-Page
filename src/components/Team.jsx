import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useTeamData } from '../hooks/useTeamData';

// Dynamically import all team images from assets
const imagesGlob = import.meta.glob('../assets/images/team/*.{png,jpg,jpeg,svg,webp}', { eager: true });

const getTeamImage = (imageName) => {
    if (!imageName) return null;
    // Search for the file in the glob results
    for (const path in imagesGlob) {
        if (path.toLowerCase().endsWith(imageName.toLowerCase())) {
            return imagesGlob[path].default;
        }
    }
    return null;
};

const Team = () => {
    const teamData = useTeamData();

    return (
        <section id="team" className="section">
            <div className="container">
                <div className="text-center mb-4">
                    <h2 className="heading-lg">Nuestro Equipo</h2>
                    <p className="text-lead">
                        Las mentes creativas detrás de cada solución.
                    </p>
                </div>

                <div  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    padding: '1rem 0'
                }}>
                    <style>{`
                        .team-carousel::-webkit-scrollbar { 
                            display: none; 
                        }
                    `}</style>
                    {teamData.map((member) => {
                        const imgSrc = member.img.startsWith('http')
                            ? member.img
                            : (getTeamImage(member.img) || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop&q=80"); // Fallback

                        return (
                            <div
                                key={member.id}
                                className="glass-card"
                                style={{
                                    textAlign: 'center',
                                    padding: '1.5rem',
                                    width: '270px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                    cursor: 'default',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(139, 92, 246, 0.2)';
                                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '';
                                    e.currentTarget.style.borderColor = '';
                                }}
                            >
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    margin: '0 auto 1rem',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '2px solid var(--color-primary)',
                                    boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)'
                                }}>
                                    <img
                                        src={imgSrc}
                                        alt={member.name}
                                        loading="lazy"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center'
                                        }}
                                    />
                                </div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', fontWeight: 700 }}>{member.name}</h3>
                                <p style={{ color: 'var(--color-primary)', fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>{member.role}</p>
                                {/* Description truncated */}
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '1rem',
                                    lineHeight: '1.4',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '3',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    flex: '1'
                                }}>
                                    {member.description}
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', color: 'var(--color-text-muted)', marginTop: 'auto' }}>
                                    {member.social.github && <a href={member.social.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><Github size={22} /></a>}
                                    {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><Linkedin size={22} /></a>}
                                    {member.social.twitter && <a href={member.social.twitter} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><Twitter size={22} /></a>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Team;
