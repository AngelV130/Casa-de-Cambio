import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SplashScreen from './components/Splash'
import Countries from './views/Countries'
import { useCurrency } from './contexts/useCurrencyContext';
import Calculator from './views/Calculator';

function App() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado con éxito:', registration);
        })
        .catch((error) => {
          console.log('Fallo en el registro del Service Worker:', error);
        });
    });
  }
  
  const currency = useCurrency();
  const [from, setFrom] = useState(true)
  const [isLoading, setIsLoading] = useState(true);
  const [calculate, setCalculate] = useState(true);

  const handleSplashTimeout = () => {
    setIsLoading(false);
  };

  return (
    <>
    {
      isLoading ? (
      <SplashScreen onTimeout={handleSplashTimeout} />
    ) : (
      <>
          {
            !calculate ? <Countries setCalculate={setCalculate} from={from} /> :
            <Calculator setCalculate={setCalculate} setFrom={setFrom} />
          }
        {/* <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p> */}
      </>
    )}
    </>
  )
}

export default App
