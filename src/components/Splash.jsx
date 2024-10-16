// SplashScreen.js
import React, { useEffect } from 'react';

const SplashScreen = ({ onTimeout }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout(); // Redirige a la página principal después de 3 segundos
    }, 3000); // Ajusta el tiempo aquí (3000 ms = 3 segundos)

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, [onTimeout]);

  return (
    <div style={styles.container}>
      <img src="/image.png" alt="Logo" style={styles.logo} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position:'fixed',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
  },
  logo: {
    width: '200px', // Ajusta según sea necesario
    marginBottom: '20px',
  },
};

export default SplashScreen;
