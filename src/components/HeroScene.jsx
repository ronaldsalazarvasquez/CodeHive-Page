import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import gsap from 'gsap';
import '../main.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Importas tu imagen PNG
import BeePNG from '../assets/images/logo/icono.webp';

const Hero = () => {
    const containerRef = useRef(null); 
    const mountRef = useRef(null);
    const navigate = useNavigate();
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        // Determinar estado móvil inicial
        let isMobile = window.innerWidth < 768;
        camera.position.set(0, 0, isMobile ? 16 : 10);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        renderer.localClippingEnabled = true; 

        if (mountRef.current) {
            mountRef.current.innerHTML = ''; 
            mountRef.current.appendChild(renderer.domElement);
        }

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        // Variables dinámicas globales de la escena
        let meshX = isMobile ? 0 : -3.5;
        let meshY = isMobile ? 1.5 : 0;
        const targetHeight = 5.0; 

        const textureLoader = new THREE.TextureLoader();
        let beeMesh = null;
        let laserLine = null;

        const clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -(meshY + targetHeight / 2));

        textureLoader.load(BeePNG, (texture) => {
            const aspectRatio = texture.image.width / texture.image.height;
            const targetWidth = targetHeight * aspectRatio;

            const geometry = new THREE.PlaneGeometry(targetWidth, targetHeight); 
            
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true, 
                side: THREE.DoubleSide,
                clippingPlanes: [clipPlane] 
            });

            beeMesh = new THREE.Mesh(geometry, material);
            beeMesh.position.set(meshX, meshY, 0);
            scene.add(beeMesh);

            const laserLineGeo = new THREE.BoxGeometry(targetWidth + 0.3, 0.05, 0.05);
            const laserLineMat = new THREE.MeshBasicMaterial({ color: 0x4475AD });
            laserLine = new THREE.Mesh(laserLineGeo, laserLineMat);
            laserLine.position.set(meshX, meshY + targetHeight / 2, 0.02); 
            scene.add(laserLine);

            const laserTimeline = gsap.timeline({ delay: 0.4 });

            laserTimeline.fromTo(clipPlane, 
                { constant: -(meshY + targetHeight / 2) },
                { constant: -(meshY - targetHeight / 2), duration: 2.2, ease: "power1.inOut" }
            );

            laserTimeline.fromTo(laserLine.position,
                { y: meshY + targetHeight / 2 },
                { y: meshY - targetHeight / 2, duration: 2.2, ease: "power1.inOut" },
                "<" 
            );

            laserTimeline.to(laserLine.scale, {
                x: 0, y: 0, z: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        // --- PARTÍCULAS ---
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 200;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 25;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.06,
            color: 0xffaa00,
            transparent: true,
            opacity: 0.3
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // --- ANIMACIONES DE TEXTO GSAP ---
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.6 }); 
            tl.to(".gsap-title", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" })
              .to(".gsap-slogan", { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "+=0.2") 
              .to(".gsap-btn", { autoAlpha: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" }, "-=0.3");
        }, containerRef); 

        // --- SEGUIMIENTO DEL MOUSE ---
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) - 0.5;
            mouseY = (event.clientY / window.innerHeight) - 0.5;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const clock = new THREE.Clock();
        let animationFrameId;

        // Guardamos dinámicamente el desfase vertical del loop de animación
        let currentOffsetY = 0;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            currentOffsetY = Math.sin(elapsedTime * 1.5) * 0.1;

            if (beeMesh) {
                beeMesh.rotation.y = Math.sin(elapsedTime * 0.5) * 0.08 + (mouseX * 0.25);
                beeMesh.rotation.x = (mouseY * 0.15);
                
                // Aplicamos la posición base calculada en tiempo real más el cabeceo flotante
                beeMesh.position.y = meshY + currentOffsetY;
                
                if (laserLine && laserLine.scale.x > 0) {
                    laserLine.rotation.y = beeMesh.rotation.y;
                }
            }

            particlesMesh.rotation.y = elapsedTime * 0.02;
            renderer.render(scene, camera);
        };
        animate();

        // 👇 SOLUCIÓN RADICAL: Recalcular posiciones físicas en el Resize de forma inmediata
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            renderer.setSize(width, height);
            camera.aspect = width / height;
            
            // Actualizamos la bandera responsive sobre la marcha
            isMobile = width < 768;
            camera.position.z = isMobile ? 16 : 10;
            
            // Recalculamos las variables de entorno de la abeja instantáneamente
            meshX = isMobile ? 0 : -3.2;
            meshY = isMobile ? 1.5 : 0;
            
            if (beeMesh) {
                beeMesh.position.x = meshX;
                // Si la animación del láser ya terminó, forzamos su y al valor responsivo real
                if (!laserLine || laserLine.scale.x === 0) {
                    beeMesh.position.y = meshY + currentOffsetY;
                }
            }
            
            if (laserLine && laserLine.scale.x > 0) {
                laserLine.position.x = meshX;
            }
            
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            ctx.revert(); 
            if (mountRef.current && renderer.domElement) {
                mountRef.current.innerHTML = '';
            }
            renderer.dispose();
        };
    }, []); 

    return (
        <section className="hero-wrapper" ref={containerRef}>
            <div className="vignette"></div>
            <div ref={mountRef} className="canvas-container"></div>

            <div className="hero-overlay">
                <h1 className="gsap-title">BEEZ</h1>
                <h2 className="gsap-title">CORE</h2>

                <div className="gsap-btn">
                    <button 
                        className="cyber-btn" 
                        onClick={() => {
                            const target = document.getElementById('nuestros-pilares');
                            if (target) {
                                // Calculamos la posición exacta del elemento en la página
                                const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                                
                                // 👇 AJUSTE FINO: Resta píxeles si baja de más (Ej: -80 por si tienes un navbar)
                                const offset = 40; 

                                gsap.to(window, {
                                    scrollTo: targetPosition - offset,
                                    duration: 0.5,       // 👈 Controlas la velocidad exacta en segundos
                                    ease: "power2.inOut" // 👈 Transición suave (arranca lento, acelera, frena suave)
                                });
                            }
                        }}
                    >
                        CONOCER MÁS &#10142;
                    </button>
                </div>
            </div>

        </section>
    );
};

export default Hero;