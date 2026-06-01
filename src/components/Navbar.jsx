import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import logo from '../assets/images/logo/icono.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'VotaPE', path: '/votape' },
        { name: 'Proyectos', path: '/proyectos' },
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
                    <img src={logo} alt="Cod3Hive" style={{ width: '28px', height: '32px' }} />
                    Cod3Hive
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'none', gap: '2rem' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            style={{
                                color: isActive(link.path) ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                fontWeight: isActive(link.path) ? 600 : 400,
                                transition: 'color 0.3s'
                            }}
                            className="hover:text-white"
                        >
                            {link.name}
                        </Link>
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
                        display: 'block' // Visible on mobile by default logic handling in CSS usually
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
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    color: isActive(link.path) ? 'var(--color-primary)' : 'white',
                                    fontSize: '1.2rem',
                                    fontWeight: 600
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <style>{`
                @media (min-width: 768px) {
                    .desktop-menu { display: flex !important; }
                    .mobile-toggle { display: none !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
