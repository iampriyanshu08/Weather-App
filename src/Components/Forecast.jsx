import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cloudIcon from "../assets/cloudy.png";
import sunIcon from "../assets/sun.png";
import rainIcon from "../assets/rainy.png";
import fogIcon from "../assets/fog.png";

const Forecast = () => {
  const [forecastData, setforecastData] = useState([]);
  const [loading, setloading] = useState(true);

  const APIKEY = import.meta.env.VITE_API_KEY;
  const { cityName } = useParams();
  const getForecastData = async () => {
    try {
      const res = await axios(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}`
      );
      //   console.log(res.data.list)
      const dailyForecast = res.data.list.filter(
        (item, index) => index % 8 === 0
      );
      console.log(dailyForecast);
      setforecastData(dailyForecast);
      setloading(false);
    } catch (error) {
      console.log("Fetching error weather", error);
      setloading(false)
    }
  };
  useEffect(() => {
    getForecastData();
  }, [cityName]);

  return (
    <div>
      <h1 className="text-white font-bold text-3xl mb-2">Daily Forecast</h1>
      {loading ? (
        <p>Loading data... </p>
      ) : (
        <div className="flex xl:gap-10 flex-col xl:flex-row bg-zinc-700 p-10">
          {forecastData.map((day, index) => {
            let ficon;
            if (day.weather[0].main === "Clouds") {
              ficon = cloudIcon;
            } else if (day.weather[0].main === "Rain") {
              ficon = rainIcon;
            } else if (day.weather[0].main === "Clear") {
              ficon = sunIcon;
            }

            let date = new Date(day.dt_txt)
            let forecastDate = date.toLocaleDateString('en-us',{
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            console.log(forecastDate)
            return (
              <div key={index} className="flex flex-col xl:gap-2 items-center text-white text-xs">
                <p>Date: {forecastDate}</p>
                <img className="w-[50px]" src={ficon} />
                <p>Temp: {Math.ceil(day.main.temp - 273.15)}°C</p>
                <p>Temp-Max: {Math.ceil(day.main.temp_max - 273.15)}°C</p>
                <p>Temp-Min: {Math.ceil(day.main.temp_min - 273.15)}°C</p>
                <p>Precipitation Chances: {day.pop*100}%</p>
                <p>Description: {day.weather[0].description.charAt(0).toUpperCase()+day.weather[0].description.slice(1)}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Forecast;
