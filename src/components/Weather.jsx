import React, { useState, useEffect } from "react";
import "./Weather.css";
import clear_icon from "../assets/clear.png";
import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Cairo");

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=979e237b0f5e09e3c71616ac4781af58&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search(city);
  }, []);

   

  return (
    <div className="main-wrapper">
      <div className="app-title">Dark Weather</div>
      <div className="app-description">
        Seeing the weather of the whole world <span>with Dark Weather!</span>
      </div>
      <div className="weather">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Here"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && search(city)}
           />
          <img
            src={search_icon}
            alt="search"
            className=""
            onClick={() => search(city)}
          />
        </div>
      </div>
      {weatherData &&
        weatherData.sys &&
        weatherData.main &&
        weatherData.weather && (
          <div className="weather-info-card">
             <img src={
              {
                "01d": clear_icon,
                "01n": clear_icon,
                "02d": cloud_icon,
                "02n": cloud_icon,
                "03d": cloud_icon,
                "03n": cloud_icon,
                "09d": drizzle_icon,
                "09n": drizzle_icon,
                "10d": humidity_icon,
                "10n": humidity_icon,
                "11d": rain_icon,
                "11n": rain_icon,
                "13d": snow_icon,
                "13n": snow_icon,
                "50d": wind_icon,
                "50n": wind_icon,
              }[weatherData.weather[0].icon] || clear_icon
            } alt="clear" className="weather-icon" />
             <p>
               <span>{weatherData.sys.country}</span> {weatherData.main.temp}°C
            </p>
            <h5>{new Date(weatherData.dt * 1000).toLocaleString()}</h5>
            <h5>{weatherData.weather[0].description}</h5>
          </div>
        )}
    </div>
  );
};

export default Weather;
