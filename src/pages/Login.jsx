import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Hexagon } from 'lucide-react';
import '../assets/styles/Login.css';

// TODO: cuando el logo final esté listo, importa la imagen y reemplaza
// el bloque marcado como "PLACEHOLDER DE LOGO" más abajo (hay uno en el
// panel izquierdo y otro en el header del panel derecho).
// Ejemplo: import logo from '../assets/images/logo/icono.webp';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Login aún no funcional
    };

    return (
        <div className="ch-login-screen">
            <div className="ch-login-left">
                {/* Nodos decorativos del "enjambre" */}
                <span className="ch-login-node"></span>
                <span className="ch-login-node ch-login-node--amber"></span>
                <span className="ch-login-node"></span>
                <span className="ch-login-node ch-login-node--amber"></span>

                {/* ===== PLACEHOLDER DE LOGO (panel izquierdo) =====
                    Reemplaza este bloque completo por <img src={logo} .../>
                    cuando tengas el logo final. El marco hexagonal queda
                    aquí solo como guía visual mientras tanto. */}
                <div className="ch-login-logo-frame">
                    <svg className="ch-login-hex-outline" viewBox="0 0 148 128" fill="none">
                        <path
                            d="M74 4L140 42V86L74 124L8 86V42Z"
                            stroke="rgba(92,203,255,0.35)"
                            strokeWidth="1.5"
                            strokeDasharray="6 5"
                        />
                    </svg>
                    <Hexagon size={40} strokeWidth={1.25} className="ch-login-logo-placeholder-icon" />
                </div>
                <p className="ch-login-logo-placeholder-tag">Logo en proceso</p>
                {/* ===== FIN PLACEHOLDER DE LOGO ===== */}

                <div className="ch-login-brand-text">
                    <span className="ch-login-prompt">swarm intelligence, ordered</span>
                    <h1>BEEZCORP</h1>
                    <span>LABS</span>
                </div>
            </div>

            <div className="ch-login-right">
                <div className="ch-login-form-wrapper">
                    <div className="ch-login-header-logo">
                        {/* ===== PLACEHOLDER DE LOGO (header, panel derecho) =====
                            Reemplaza <Hexagon .../> por <img src={logo} .../>
                            cuando tengas el logo final. */}
                        <Hexagon size={22} strokeWidth={1.75} color="#19A9FF" />
                        <span>BEEZCORP</span>
                    </div>

                    <h2>BIENVENIDO</h2>
                    <p>Ingrese sus credenciales corporativas</p>

                    <form onSubmit={handleSubmit}>
                        <div className="ch-login-field">
                            <label htmlFor="ch-login-user">Usuario o correo electrónico</label>
                            <div className="ch-login-input-box">
                                <User size={16} />
                                <input
                                    id="ch-login-user"
                                    type="text"
                                    placeholder="usuario@beezcorp.com"
                                    autoComplete="username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="ch-login-field">
                            <label htmlFor="ch-login-pass">Contraseña</label>
                            <div className="ch-login-input-box">
                                <Lock size={16} />
                                <input
                                    id="ch-login-pass"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="***********"
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="ch-login-toggle-visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="ch-login-submit-btn">
                            Ingresar al Sistema
                        </button>
                    </form>

                    <p className="ch-login-notice">Módulo en construcción — próximamente disponible</p>

                    <div className="ch-login-footer">
                        © {new Date().getFullYear()} BeezCorp — Todos los derechos reservados
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;