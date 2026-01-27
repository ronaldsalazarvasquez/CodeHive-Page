import React from 'react';
import { Mail, MapPin, Globe, Phone, Instagram } from 'lucide-react';
import generalData from '../data/general.json';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--color-surface)', paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    <div>
                        <h3 className="heading-lg" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>CodeHive</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            Construyendo el mundo digital bit a bit.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Contacto</h4>
                        <ul style={{ color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li>
                                <a
                                    href={`tel:${generalData.contact.phone.replace(/\s+/g, '')}`}
                                    className="hover:text-white"
                                    style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}
                                >
                                    <Phone size={16} /> {generalData.contact.phone}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${generalData.contact.email}?subject=Consulta%20Servicios%20CodeHive`}
                                    className="hover:text-white"
                                    style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}
                                >
                                    <Mail size={16} /> {generalData.contact.email}
                                </a>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <MapPin size={16} /> {generalData.contact.address}
                            </li>
                            <li>
                                <a
                                    href={`https://${generalData.social.web}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-white"
                                    style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}
                                >
                                    <Globe size={16} /> {generalData.social.web}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Enlaces</h4>
                        <ul style={{ color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><a href="/#about" className="hover:text-white">Sobre Nosotros</a></li>
                            <li><a href="/#team" className="hover:text-white">Nuestro Equipo</a></li>
                            <li><a href="/votape" className="hover:text-white">Descargar VotaPE</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Síguenos</h4>
                        <ul style={{ color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li>
                                <a
                                    href={generalData.social.instagram}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-white"
                                    style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}
                                >
                                    <Instagram size={16} /> Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href={generalData.social.tiktok}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-white"
                                    style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}
                                >
                                    {/* Custom TikTok Icon */}
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                    </svg>
                                    TikTok
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '2rem',
                    textAlign: 'center',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.9rem'
                }}>
                    <p>&copy; {new Date().getFullYear()} CodeHive. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
