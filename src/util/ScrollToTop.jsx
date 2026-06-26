import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Usamos un objeto de configuración para desactivar el scroll suave solo aquí
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // <-- Esto rompe el "smooth" y te manda arriba de inmediato
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;