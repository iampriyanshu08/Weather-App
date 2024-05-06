import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WeatherPage = () => {
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  const APIKEY = import.meta.env.VITE_API_KEY;
  const [weatherdata, setweatherdata] = useState(null)
  const {cityName} = useParams()
  console.log(cityName)
  const getWeatherDAta = async () => {
    try {
      const res = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`
      );
      setweatherdata(res.data)
      let kelvin = res.data.main.temp;
      let celcius = kelvin - 273.15;
      console.log(celcius);
    } catch (error) {
      console.log("error occured", error);
    }
  };
  useEffect(() => {
    getWeatherDAta();
  }, []);

  console.log(weatherdata)

  

  return <>
    
    {weatherdata && (
        <div>
  
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs border-2">
            <div className="font-bold text-xl">{cityName}</div>
            <div className="text-sm text-gray-500">Thursday 10 May 2020</div>
            <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
              <svg
                className="w-32 h-32"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <div className="flex flex-row items-center justify-center mt-6">
              <div className="font-medium text-6xl">{Math.floor(weatherdata.main.temp-273.15)}°C</div>
              <div className="flex flex-col items-center ml-6">
                <div>{weatherdata.weather[0].main}</div>
                <div className="mt-1">
                  <span className="text-sm">
                    <i className="far fa-long-arrow-up" />
                  </span>
                  <span className="text-sm font-light text-gray-500">{Math.ceil(weatherdata.main.temp_max-273.15)}°C</span>
                </div>
                <div>
                  <span className="text-sm">
                    <i className="far fa-long-arrow-down" />
                  </span>
                  <span className="text-sm font-light text-gray-500">{Math.ceil(weatherdata.main.temp_min-273.15)}°C</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-6">
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Wind</div>
                <div className="text-sm text-gray-500">{weatherdata.wind.speed} m/s</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Humidity</div>
                <div className="text-sm text-gray-500">{weatherdata.main.humidity} %</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Pressure</div>
                <div className="text-sm text-gray-500">{weatherdata.main.pressure} hPa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}




  </>;
};

export default WeatherPage;
