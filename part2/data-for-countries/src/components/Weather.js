import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const Weather = ({ city }) => {
  const [cityWeather, setCityWeather] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
      )
      .then(response => {
        setCityWeather(response.data);
      });
  }, [city]);

  const weatherStatus = cityWeather.location ? (
    <>
      <div>
        <b>temperature: {cityWeather.current.temperature} Celsius</b>
      </div>
      <img src={cityWeather.current.weather_icons} alt="" />

      <div>
        <div>
          <b>weather description:</b> {cityWeather.current.weather_descriptions}
        </div>
        <b>wind: </b> {cityWeather.current.wind_speed} kph, direction{' '}
        {cityWeather.current.wind_dir}
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );

  return (
    <div>
      <h3>Weather in {city}</h3>
      {weatherStatus}
    </div>
  );
};

export default Weather;
