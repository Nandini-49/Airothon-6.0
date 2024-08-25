'use client';
import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from './weathercomponent/CityComponent';
import WeatherComponent from './weathercomponent/WeatherComponent';
import { TbRefresh } from "react-icons/tb";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";

export const WeatherIcons = {
  "01d": "/icons/sunny.svg",
  "01n": "/icons/night.svg",
  "02d": "/icons/day.svg",
  "02n": "/icons/cloudy-night.svg",
  "03d": "/icons/cloudy.svg",
  "03n": "/icons/cloudy.svg",
  "04d": "/icons/perfect-day.svg",
  "04n": "/icons/cloudy-night.svg",
  "09d": "/icons/rain.svg",
  "09n": "/icons/rain-night.svg",
  "10d": "/icons/rain.svg",
  "10n": "/icons/rain-night.svg",
  "11d": "/icons/storm.svg",
  "11n": "/icons/storm.svg",
};

const weatherkey=process.env.NEXT_OPENWEATHER_KEY;
// console.log(weatherkey);

const App = () => {

  
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();

  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=078476e29d82509ceb8fe6d45828846d`
    );
    updateWeather(await response.data);
  };

  const resetWeather = () => {
    updateCity(null);
    updateWeather(null);
  };

  return (
    <div className="bg-gray-900 text-neon-green  flex items-center justify-center">
      <div className="w-96 p-8 bg-gray-900 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Weather Update</h1>
          <div onClick={resetWeather} className="cursor-pointer">
            <TbRefresh className="text-2xl font-bold text-[#00df9a]" />
          </div>
        </div>
        {city && weather ? (
          <WeatherComponent weather={weather} city={city} />
        ) : (
          <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
        )}
      </div>
    </div>
  );
}

export default App;
