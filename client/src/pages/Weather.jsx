import React, { useState } from "react";
import Navbar from '../components/Navbar';

const api = {
  key: "8021605b8b7b809212d107091481ba90",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div>
        <Navbar />
    <div className="app-container">
    <div>
        <div className="benefits-container">
          <h2>Discover the Benefits</h2>
          <img className="weather" src="images/rain.gif" alt="" />
          <p>Welcome to our Weather App! With real-time weather data, accurate forecasts, and an easy-to-use interface, you can plan your activities with confidence. Benefit from:</p>
          <ul>
            <li>Accurate forecasts for informed planning.</li>
            <li>User-friendly interface for easy navigation.</li>
            <li>Customized experience with saved locations.</li>
            <li>Enhanced travel planning for memorable trips.</li>
            <li>Stay prepared and safe with weather alerts.</li>
          </ul>
          <p>Use now and embark on your next adventure with confidence!</p>
        </div>
      </div>
      <div className="app">
        <header>
          <h1 className="app-title">Weather App</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter city/town..."
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <button onClick={searchPressed} className="search-button">
              Search
            </button>
          </div>
        </header>

        {typeof weather.main !== "undefined" && (
          <div className="weather-info">
            <p className="location">{weather.name}</p>
            <p className="temperature">{weather.main.temp}°C</p>
            <p className="condition">{weather.weather[0].main}</p>
            <p className="description">({weather.weather[0].description})</p>
          </div>
        )}
        </div>
        
      </div>
    </div>
  );
}

export default App;
