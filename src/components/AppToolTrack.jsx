import React from 'react';
import AppShowcaseTemplate from './AppShowcaseTemplate';

// ⚠️ PLANTILLA: contenido de ejemplo — reemplazar textos e imágenes cuando ToolTrack tenga assets reales.
const data = {
    imagesFolder: 'app_ToolTrack',
    placeholderImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
    videoSrc: '/videos/tu-video-presentacion.mp4',

    originBadge: 'El Origen // Gestión de Activos Industriales',
    originTitle: '¿Cómo nace ToolTrack?',
    originText1: 'Los talleres de mantenimiento perdían tiempo y dinero por la falta de trazabilidad de herramientas y repuestos, generando compras duplicadas y paradas innecesarias.',
    originText2: 'ToolTrack se está construyendo en Cod3Hive Labs para llevar un control de inventario Just-in-Time, con trazabilidad completa de cada activo del taller.',

    heroBadge: 'Plataforma en Construcción',
    heroTitle: 'Descubre ToolTrack',
    heroDescription: 'Gestión integral de herramientas y repuestos para talleres de mantenimiento: inventario en tiempo real, trazabilidad de activos y reducción de pérdidas operativas.',
    features: [
        'Inventario Just-in-Time',
        'Trazabilidad Completa de Activos',
        'Alertas de Stock y Mantenimiento',
        'Panel de Control para Supervisores'
    ],

    ctaButtons: [
        { label: 'Solicitar una Demo', href: '#', primary: true },
        { label: 'Ver Repositorio', href: '#', primary: false }
    ],

    testimonials: [
        { name: 'Testimonio Pendiente', role: 'Jefe de Taller', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', code: 'SRC_FEEDBACK_01' },
        { name: 'Testimonio Pendiente', role: 'Supervisor de Mantenimiento', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', code: 'SRC_FEEDBACK_02' }
    ]
};

const AppToolTrack = () => <AppShowcaseTemplate data={data} />;

export default AppToolTrack;
