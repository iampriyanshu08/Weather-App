import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cloudIcon from "../assets/cloudy.png";
import sunIcon from "../assets/sun.png";
import rainIcon from "../assets/rainy.png";
import fogIcon from "../assets/fog.png";
// import sunnyBg from '../assets/sunny.jpg'
import sunnyBg from "../assets/sunny2.jpg";
import rainyBg from "../assets/rainy.jpg";
import cloudyBg from "../assets/cloudy.jpg";
import clearBg from "../assets/clear.jpg";
import Forecast from "./Forecast";

const WeatherPage = () => {
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  const APIKEY = import.meta.env.VITE_API_KEY;
  const [weatherdata, setweatherdata] = useState(null);
  const [icon, seticon] = useState(fogIcon);
  const [background, setbackground] = useState(cloudyBg);
  const [Currdate, setCurrdate] = useState("");
  const { cityName } = useParams();
//   console.log(cityName);
  const getWeatherDAta = async () => {
    try {
      const res = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`
      );
      setweatherdata(res.data);
      let kelvin = res.data.main.temp;
      let celcius = kelvin - 273.15;
    //   console.log(celcius);
    } catch (error) {
      console.log("error occured", error);
    }
  };
  useEffect(() => {
    getWeatherDAta();
  }, []);

  console.log(weatherdata);

  useEffect(() => {
    if (weatherdata && weatherdata.weather) {
      const weathericon = weatherdata.weather[0].main;
      if (weathericon === "Clouds") {
        seticon(cloudIcon);
        setbackground(cloudyBg);
      } else if (weathericon === "Rain") {
        seticon(rainIcon);
        setbackground(rainyBg);
      } else if (weathericon === "Clear") {
        seticon(sunIcon);
        setbackground(sunnyBg);
      }
    }
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrdate(date.toLocaleDateString("en-us", options));

    
  }, [weatherdata]);

  return (
    <>
      {weatherdata && (
        <div>
          <div
            className="min-h-screen flex items-center justify-center gap-5 flex-col sm:flex-row xl:flex-col"
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col bg-yellow-100  p-4 w-full max-w-xs rounded-xl">
              <div className="font-bold text-xl">{cityName}</div>
              <div className="text-sm text-gray-500">{Currdate}</div>
              <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                <img src={icon} alt="" />
              </div>
              <div className="flex flex-row items-center justify-center mt-6">
                <div className="font-medium text-6xl">
                  {Math.floor(weatherdata.main.temp - 273.15)}°C
                </div> 
                
                <div className="flex flex-col items-center ml-6">
                  <div>{weatherdata.weather[0].main}</div>
                  <div className="mt-1">
                    <span className="text-sm">
                      <i className="far fa-long-arrow-up" />
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      {Math.ceil(weatherdata.main.temp_max - 273.15)}°C
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">
                      <i className="far fa-long-arrow-down" />
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      {Math.ceil(weatherdata.main.temp_min - 273.15)}°C
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center ">Feels like: {(weatherdata.main.feels_like-273.15).toFixed(1)}°C</div>
              <div className="flex flex-row justify-between mt-6">
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Wind</div>
                  <div className="text-sm text-gray-500">
                    {weatherdata.wind.speed}m/s
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Humidity</div>
                  <div className="text-sm text-gray-500">
                    {weatherdata.main.humidity}%
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Pressure</div>
                  <div className="text-sm text-gray-500">
                    {weatherdata.main.pressure}hPa
                  </div>
                </div>
              </div>
            </div>
          <Forecast/>
          </div>
        </div>
      )}

     
    </>
  );
};

export default WeatherPage;
