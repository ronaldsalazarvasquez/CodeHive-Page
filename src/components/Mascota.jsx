import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import mascotaJson from '../assets/pet.json';

const MENSAJES = [
    "¡Hola! 👋",
    "¿Cómo estás?",
    "¡Bienvenido!",
    //"¿En qué te ayudo?",
    "¡Explora nuestros proyectos!",
    "Somos Beez Core Labs 🐝",
];

const Mascota = () => {
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => {
        const mostrar = () => {
            const random = MENSAJES[Math.floor(Math.random() * MENSAJES.length)];
            setMensaje(random);
            setTimeout(() => setMensaje(null), 3000); // se oculta a los 3 seg
        };

        mostrar(); // muestra uno al cargar
        const intervalo = setInterval(mostrar, 6000); // cada 6 seg
        return () => clearInterval(intervalo);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            right: '2rem',
            width: '120px',
            zIndex: 999,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            {/* Bocadillo */}
            {mensaje && (
                <div style={{
                    background: 'white',
                    color: '#333',
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: '8px 12px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                    marginBottom: '8px',
                    whiteSpace: 'nowrap',
                    animation: 'fadeIn 0.3s ease',
                    position: 'relative',
                }}>
                    {mensaje}
                    {/* Triángulo apuntando hacia abajo */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-7px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '7px solid transparent',
                        borderRight: '7px solid transparent',
                        borderTop: '7px solid white',
                    }} />
                </div>
            )}

            <Lottie animationData={mascotaJson} loop={true} />
        </div>
    );
};

export default Mascota;