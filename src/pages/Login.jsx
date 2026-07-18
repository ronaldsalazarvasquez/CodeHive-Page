import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/images/logo/icono.webp';
import '../assets/styles/Login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Login aún no funcional
    };

    return (
        <div className="ch-login-screen">
            <div className="ch-login-left">
                <img src={logo} alt="Beez Core" className="ch-login-logo-mark" />
                <div className="ch-login-brand-text">
                    <h1>BEEZ CORE</h1>
                    <span>LABS</span>
                </div>
            </div>

            <div className="ch-login-right">
                <div className="ch-login-form-wrapper">
                    <div className="ch-login-header-logo">
                        <img src={logo} alt="Beez Core" />
                        <span>BEEZ CORE LABS</span>
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
                                    placeholder="usuario@beezcore.com"
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
                        © {new Date().getFullYear()} Beez Core — Todos los derechos reservados
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
