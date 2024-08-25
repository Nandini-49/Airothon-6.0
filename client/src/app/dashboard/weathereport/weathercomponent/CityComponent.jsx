import React from "react";
import { WeatherIcons } from "../page";

const CityComponent = ({ updateCity, fetchWeather }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-[#00df9a]   rounded-lg p-8 shadow-md mx-auto mt-10 max-w-md">
        <img
          src={"/icons/perfect-day.svg"}
          alt="Weather Logo"
          className="w-40 h-40 mb-8"
        />
        <h2 className="text-xl font-bold mb-4">
          Find Weather of your city
        </h2>
        <form
          onSubmit={fetchWeather}
          className="flex flex-col items-center justify-center space-y-4 w-full"
        >
          <input
            type="text"
            onChange={(e) => updateCity(e.target.value)}
            placeholder="City"
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00df9a]"
          />
          <button
            type="submit"
            className="w-full bg-[#00df9a] text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default CityComponent;
