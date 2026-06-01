import React from 'react';
import { Heart, Users, MessageCircle } from 'lucide-react';
import generalData from '../data/general.json';

const Community = () => {
    const whatsappUrl = (message) =>
        `https://wa.me/${generalData.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;

    return (
        <section className="section" style={{ background: 'var(--color-surface)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container">
                <div style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(245, 158, 11, 0.1))',
                    borderRadius: '24px',
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>Únete a la Comunidad Cod3Hive</h2>
                    <p className="text-lead" style={{ maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                        Si te gusta lo que hacemos, puedes ser parte del cambio. Únete a nuestra comunidad de desarrolladores o apóyanos para seguir creando herramientas gratuitas.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a
                            href={whatsappUrl("Hola CodeHive, me gustaría unirme a la comunidad de desarrolladores.")}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                        >
                            <Users size={20} />
                            Unirse a CodeHive Labs
                        </a>
                        <a
                            href={whatsappUrl(generalData.messages.donation)}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline"
                            style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                        >
                            <Heart size={20} />
                            Hacer una Donación
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Community;
