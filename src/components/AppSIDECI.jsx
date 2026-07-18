import React from 'react';
import AppShowcaseTemplate from './AppShowcaseTemplate';

// ⚠️ PLANTILLA: contenido de ejemplo — reemplazar textos e imágenes cuando SIDECI tenga assets/información reales.
const data = {
    imagesFolder: 'app_SIDECI',
    placeholderImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    videoSrc: '/videos/tu-video-presentacion.mp4',

    originBadge: 'El Origen // Por Definir',
    originTitle: '¿Cómo nace SIDECI?',
    originText1: 'Texto de ejemplo: describe aquí el problema u oportunidad que dio origen a SIDECI.',
    originText2: 'Texto de ejemplo: describe aquí la visión de Beez Core Labs al construir esta solución.',

    heroBadge: 'Solución en Construcción',
    heroTitle: 'Descubre SIDECI',
    heroDescription: 'Descripción de ejemplo del producto SIDECI. Reemplazar con el resumen comercial real cuando esté disponible.',
    features: [
        'Característica destacada 1',
        'Característica destacada 2',
        'Característica destacada 3',
        'Característica destacada 4'
    ],

    ctaButtons: [
        { label: 'Solicitar una Demo', href: '#', primary: true },
        { label: 'Ver Repositorio', href: '#', primary: false }
    ],

    testimonials: [
        { name: 'Testimonio Pendiente', role: 'Rol Pendiente', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', code: 'SRC_FEEDBACK_01' },
        { name: 'Testimonio Pendiente', role: 'Rol Pendiente', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', code: 'SRC_FEEDBACK_02' }
    ]
};

const AppSIDECI = () => <AppShowcaseTemplate data={data} />;

export default AppSIDECI;
