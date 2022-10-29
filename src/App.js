import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/inputs';
import TimeAndLocation from './components/Time&Location';
import TempAndDetails from './components/Temp&Details';
import Forecast from './components/Forecast';
import formattedWeatherData from './WeatherServices/WeatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query,setQuery] = useState({q:'Beirut'})
  const [units,setUnits] = useState('metric')
  const [weather,setWeather] = useState(null)

  useEffect(()=>{
    const message = query.q? query.q : "current Location"
    const fetchWeatherData = async () =>{
       await formattedWeatherData({...query,units}).then(data=>{
        setWeather(data)
       }).catch(error=>toast.info('could not get the weather of ' + message))
     }
     fetchWeatherData()
  },[query,units])

  
  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
    <TopButtons setQuery={setQuery}/>
    <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>   

    {weather && <div>
      <TimeAndLocation weather={weather}/>
    <TempAndDetails weather={weather}/>
    <Forecast title={'hourly forecast'} items={weather.hourly}/>
    <Forecast title={'Daily forecast'} items={weather.daily
    }/>

    <ToastContainer autoClose={4000} theme="colored" newestOnTop={true}/>
    </div>}
    
    </div>
  );
}

export default App;
