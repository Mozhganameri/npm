import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [loaded, setLoaded] = useState(false);
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState({});

  function handleSearch(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (city.length > 0) {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ff992df60e8c388664e8c387bf3c174c&units=metric`;
      axios.get(url).then(showTemperature);
    } else {
      alert("Enter a city...");
    }
  }
  function showTemperature(response) {
    setLoaded(true);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
    });
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={handleSearch}
      />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature : {weather.temperature}°C</li>
          <li>Description : {weather.description}</li>
          <li>Humidity : {weather.humidity}%</li>
          <li>Wind : {weather.wind}km/h</li>
          <li>
            Icon : <img src={weather.icon} alt="weather icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
