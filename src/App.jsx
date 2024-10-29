import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SplashScreen from './components/Splash'
import Countries from './views/Countries'
import { useCurrency } from './contexts/useCurrencyContext';
import Calculator from './views/Calculator';
import JSONDATACOUNTRIES from './mocks/data_monedas.json';



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
  const [countries, setCountries] = useState([]);
  const [from, setFrom] = useState(true)
  const [isLoading, setIsLoading] = useState(true);
  const [calculate, setCalculate] = useState(true);

  const handleSplashTimeout = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    let data_countries = localStorage.getItem('countries');

    if(data_countries)
      data_countries = JSON.parse(data_countries);
    else 
      data_countries = JSONDATACOUNTRIES;
    setCountries(data_countries);

    currency.changeCurrency('from', {
      ...data_countries[0],
      value: data_countries[0].rates.buy
    });
    currency.changeCurrency('to', {
      ...data_countries[1],
      value: data_countries[1].rates.buy
    });
  },[]);

  return (
    <>
    {
      isLoading ? (
      <SplashScreen onTimeout={handleSplashTimeout} />
    ) : (
      <>
          {
            !calculate ? <Countries setCalculate={setCalculate} from={from} countries={countries} /> :
            <Calculator setCalculate={setCalculate} setFrom={setFrom} />
          }
      </>
    )}
    </>
  )
}

export default App
