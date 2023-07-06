"use client";
import React, { useState } from "react";
import "./globals.css";

const FetchApi = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${state},${country}?key=AEU7VXQXXZEC6YUH543GNNZ8M`
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
            COUNTRY:
            <input
              type="text"
              className="text-black rounded-xl p-2 mx-1"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <hr />
          <br />

          <label>
            STATE:
            <input
              type="text"
              placeholder="State"
              className="text-black rounded-xl p-2 mx-3"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          <br />
          <button
            className="bg-white hover:bg-blue-400 text-black p-3 rounded-2xl"
            type="submit"
          >
            Submit
          </button>
        </form>
        {weatherData && (
          <div className="text-white flex flex-col justify-center">
            {weatherData.days.map((day: any) => (
              <div key={day.datetime}>
                <h2>Date: {day.datetime}</h2>
                <p>
                  Temperature:{" "}
                  <span>{(((day.temp - 32) * 5) / 9).toFixed(2)}</span>°C
                </p>

                <p>Description: {day.description}</p>
                <p>Humidity: {day.humidity}%</p>
                <p>Wind Speed:{day.windspeed} </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(FetchApi);
