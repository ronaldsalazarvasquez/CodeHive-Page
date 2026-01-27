import React, { useState, useEffect } from 'react';
import { Smartphone, CheckCircle, Download } from 'lucide-react';
// Dynamically import all images
const imagesGlob = import.meta.glob('../assets/images/app_VotaPE/*.{png,jpg,jpeg}', { eager: true });
const allImages = Object.values(imagesGlob).map((mod) => mod.default);

const AppShowcase = () => {
    // Shuffle images once on mount
    const [images] = useState(() => {
        const shuffled = [...allImages];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    return (
        <section id="app" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Background enhancement */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                zIndex: -1
            }}></div>

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    <div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.4rem 1rem',
                                background: 'rgba(139, 92, 246, 0.15)',
                                color: '#a78bfa',
                                borderRadius: '99px',
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                marginBottom: '1rem',
                                border: '1px solid rgba(139, 92, 246, 0.3)'
                            }}>
                                <span>🚀</span> Nuevo Lanzamiento
                            </div>
                            <h2 className="heading-xl" style={{ lineHeight: 1.1, marginBottom: 0 }}>
                                Descubre VotaPE
                            </h2>
                        </div>
                        <p className="text-lead" style={{ margin: '0 0 2rem 0', maxWidth: '100%' }}>
                            La herramienta definitiva para la transparencia política. Accede a información veraz, compara candidatos y toma las mejores decisiones en las próximas elecciones.
                        </p>

                        <ul style={{ marginBottom: '2.5rem' }}>
                            {[
                                "Información Política Transparente",
                                "Comparación de Candidatos",
                                "Planes de Gobierno Detallados",
                                "Noticias Electorales en Tiempo Real"
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
                                    <CheckCircle size={20} color="var(--color-primary)" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                            {/* Apple App Store Badge */}
                            <a
                                href="https://apps.apple.com/pe/app/votape/id6757588267"
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    padding: '8px 16px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    border: '1px solid #333',
                                    transition: 'transform 0.2s, background 0.2s',
                                    width: '170px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.background = '#1a1a1a';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.background = '#000';
                                }}
                            >
                                <svg viewBox="0 0 384 512" width="24" height="24" fill="currentColor" style={{ marginRight: '12px' }}>
                                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 46.9 94.3 80.9 94.3 24.8 0 31.9-19.1 57.5-19.1 26.5 0 32.8 19.1 58.4 19.1 32.9 0 66.8-55 81-93.5-2-1.9-46.7-17-47.5-86.8zm-155-154.5c19.4-25.2 41.5-68.5 35-108.6-32.8 8.1-66.7 44.8-82.6 86-12.7 34.6-1.3 76.5 47.6 22.6z" />
                                </svg>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
                                    <span style={{ fontSize: '10px', opacity: 0.8 }}>Download on the</span>
                                    <span style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '0.4px' }}>App Store</span>
                                </div>
                            </a>

                            {/* Google Play Store Badge */}
                            <a
                                href="https://play.google.com/store/apps/details?id=com.votape.app"
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    padding: '8px 16px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    border: '1px solid #333',
                                    transition: 'transform 0.2s, background 0.2s',
                                    width: '180px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.background = '#1a1a1a';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.background = '#000';
                                }}
                            >
                                <svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor" style={{ marginRight: '12px' }}>
                                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                                </svg>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
                                    <span style={{ fontSize: '10px', opacity: 0.8, textTransform: 'uppercase' }}>Get it on</span>
                                    <span style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '0.4px' }}>Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* iPhone 16 Pro Titanium Mockup - Flat Modern Style */}
                        <div style={{
                            width: '310px',
                            height: '630px',
                            background: '#000',
                            borderRadius: '55px',
                            position: 'relative',
                            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7), 0 0 60px rgba(139, 92, 246, 0.15), inset 0 0 0 2px #444, inset 0 0 0 6px #000',
                            border: '6px solid #2a2a2a', /* Dark Titanium Frame */
                            overflow: 'visible',
                        }}
                        >
                            {/* Side Buttons */}
                            <div style={{ position: 'absolute', left: '-8px', top: '100px', width: '4px', height: '35px', background: '#444', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}></div> {/* Mute */}
                            <div style={{ position: 'absolute', left: '-8px', top: '150px', width: '4px', height: '60px', background: '#444', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}></div> {/* Vol Up */}
                            <div style={{ position: 'absolute', left: '-8px', top: '220px', width: '4px', height: '60px', background: '#444', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}></div> {/* Vol Down */}
                            <div style={{ position: 'absolute', right: '-8px', top: '180px', width: '4px', height: '90px', background: '#444', borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}></div> {/* Power */}

                            {/* Screen Container */}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '48px',
                                overflow: 'hidden',
                                position: 'relative',
                                background: '#000'
                            }}>
                                {/* Dynamic Island */}
                                <div style={{
                                    width: '35%',
                                    height: '28px',
                                    background: '#000',
                                    position: 'absolute',
                                    top: '12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    borderRadius: '20px',
                                    zIndex: 20,
                                    boxShadow: '0 0 5px rgba(0,0,0,0.5)'
                                }}></div>

                                {/* Glass Reflection */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(120deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(255,255,255,0.05) 100%)',
                                    zIndex: 15,
                                    pointerEvents: 'none'
                                }}></div>

                                {/* Carousel Images */}
                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`VotaPE Screen ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'top center',
                                            backgroundColor: '#000',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            opacity: currentIndex === index ? 1 : 0,
                                            transition: 'opacity 0.6s ease-in-out'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppShowcase;
