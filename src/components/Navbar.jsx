import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import logo from '../assets/images/logo/icono.webp';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 🌟 Actualizado el nombre a 'El Enjambre' y la ruta correspondiente
    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Talento Beez Core', path: '/talento-beezcore' },
        { name: 'Proyectos', path: '/proyectos' },
        { name: 'Blog Beez Core', path: '/#', isSpecial: true }, // 🌟 Bandera para identificar el botón premium
    ];

    // Check if link is active
    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            padding: '1rem 0',
            transition: 'all 0.3s ease',
            background: scrolled || isOpen ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
            backdropFilter: scrolled || isOpen ? 'blur(10px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none'
                }}>
                    <img src={logo} alt="Beez Core" style={{ width: '28px', height: '32px' }} />
                    Beez Core
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'none', gap: '2rem', alignItems: 'center' }}>
                    {navLinks.map((link) => (
                        link.isSpecial ? (
                            /* 🚀 BOTÓN ESPECIAL DESTACADO PARA EL BLOG (DESKTOP) */
                            <Link
                                key={link.name}
                                to={link.path}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: 'rgba(139, 92, 246, 0.12)',
                                    color: '#a78bfa',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                    padding: '0.5rem 1.1rem',
                                    borderRadius: '6px',
                                    fontSize: '0.88rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    textDecoration: 'none',
                                    boxShadow: '0 0 15px rgba(139, 92, 246, 0.05)',
                                    transition: 'all 0.3s ease'
                                }}
                                className="ch-nav-special-btn"
                            >
                                <Rocket size={14} className="ch-rocket-icon" />
                                {link.name}
                            </Link>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.path}
                                style={{
                                    color: isActive(link.path) ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                    fontWeight: isActive(link.path) ? 600 : 400,
                                    transition: 'color 0.3s',
                                    textDecoration: 'none'
                                }}
                                className="hover:text-white"
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'block'
                    }}
                    className="mobile-toggle"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        background: 'rgba(10, 10, 10, 0.95)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        alignItems: 'center'
                    }}>
                        {navLinks.map((link) => (
                            link.isSpecial ? (
                                /* 🚀 BOTÓN ESPECIAL DESTACADO PARA EL BLOG (MOBILE) */
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        backgroundColor: 'rgba(139, 92, 246, 0.15)',
                                        color: '#a78bfa',
                                        border: '1px solid rgba(139, 92, 246, 0.4)',
                                        padding: '0.7rem 2rem',
                                        borderRadius: '8px',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        width: '80%',
                                        justifyContent: 'center',
                                        textDecoration: 'none',
                                        marginTop: '0.5rem'
                                    }}
                                >
                                    <Rocket size={16} />
                                    {link.name}
                                </Link>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        color: isActive(link.path) ? 'var(--color-primary)' : 'white',
                                        fontSize: '1.2rem',
                                        fontWeight: 600,
                                        textDecoration: 'none'
                                    }}
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                    </div>
                )}
            </div>
            <style>{`
                @media (min-width: 768px) {
                    .desktop-menu { display: flex !important; }
                    .mobile-toggle { display: none !important; }
                }
                
                /* Efecto Hover Premium para el botón del Enjambre */
                .ch-nav-special-btn:hover {
                    background-color: rgba(207, 229, 12, 0.25) !important;
                    border-color: #dbd410 !important;
                    color: #fff !important;
                    box-shadow: 0 0 20px rgba(207, 229, 12, 0.25) !important; /* 🌟 Ajustado al nuevo tono amarillo */
                    transform: translateY(-1px);
                }
                .ch-nav-special-btn:hover .ch-rocket-icon {
                    transform: translateX(2px) translateY(-2px);
                    transition: transform 0.3s ease;
                }
            `}</style>
        </nav>
    );
};

export default Navbar;