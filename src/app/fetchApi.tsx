"use client";
import React, { useState } from "react";
import "./globals.css";

const FetchApi = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "b5f63057c58a389cdec0f9a779d35fda";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=en&appid=${apiKey}`
    );
    const data = await response.json();
    setWeatherData(data);
  };

  return (
    <>
      <div>
        <form
          className="flex flex-col my-8 py-8 items-center justify-center text-white"
          onSubmit={handleSubmit}
        >
          <h1 className="text-white font-bold  my-4">Weather Details</h1>

          <label>
            CITY :
            <input
              type="text"
              placeholder="City"
              className="text-black rounded-xl p-2 mx-3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <br />
          <button className="text-white" type="submit">
            <span className="box">Submit</span>
          </button>
          <hr />
          <br />
        </form>
        {weatherData && (
          <div className="bg-white flex flex-col items-center justify-center rounded-3xl card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <div>
                <p className="card-title">
                  Description: {weatherData.weather[0].description}
                </p>
                <p>Temperature: {weatherData.main.temp.toFixed(2)}°C</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Condition: {weatherData.weather[0].main}</p>
                <div className="flex card card-compact w-96 bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Wind Speed</h2>
                    <p> {weatherData.wind.speed} km/h</p>
                    <figure>
                      <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                        alt="icon"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <h3 className="text-red-600 absolute bottom-1">
        NOTE: THIS IS NOT 100% ACCURATE DATA
      </h3>
    </>
  );
};

export default React.memo(FetchApi);
