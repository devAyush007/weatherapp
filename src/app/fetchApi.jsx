"use client";
import React, { useState } from "react";
import "./globals.css";
import Image from "next/image";

const FetchApi = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "b5f63057c58a389cdec0f9a779d35fda";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=en&appid=${apiKey}`
    );
    const data = await response.json();
    setWeatherData(data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form className="my-8 py-8 text-black" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Weather Details
          </h1>

          <label>
            CITY:
            <input
              type="text"
              placeholder="City"
              className="rounded-xl p-2 mx-3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <br />
          <br />
          <button className="mx-2 px-2" type="submit">
            <span className="box">Submit</span>
          </button>
        </form>
        {weatherData && (
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-3xl w-96 shadow-xl p-8">
              <div>
                <p className="text-lg font-bold mb-4">
                  Description: {weatherData.weather[0].description}
                </p>
                <p>Temperature: {weatherData.main.temp.toFixed(2)}°C</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Condition: {weatherData.weather[0].main}</p>
                <div className="bg-gray-200 rounded-xl p-4 mt-4">
                  <h2 className="text-xl font-bold mb-2">Wind Speed</h2>
                  <p>{weatherData.wind.speed} km/h</p>
                  <figure>
                    <Image
                      src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                      alt="Weather Icon"
                      className="mt-4"
                      height={150}
                      width={150}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <h3 className="text-red-600 text-center mb-4">
        NOTE: THIS IS NOT 100% ACCURATE DATA
      </h3>
    </>
  );
};

export default React.memo(FetchApi);
