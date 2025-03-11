import { useState } from "react";
import axios from "axios";
import ActivitySuggester from "../components/ActivitySuggester";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const fetchWeather = async (overrideUnit?: "metric" | "imperial") => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    const API_KEY = import.meta.env.PUBLIC_OPENWEATHER_API_KEY;

    if (!API_KEY) {
      setError("API Key is missing or invalid. Please check your .env file.");
      return;
    }

    const activeUnit = overrideUnit || unit;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${activeUnit}&appid=${API_KEY}`;

    setError("");

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Unknown error";
      setError(`Could not fetch weather data: ${errorMessage}`);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny size={60} color="#FFD700" />;
      case "Clouds":
        return <WiCloud size={60} color="#A9A9A9" />;
      case "Rain":
        return <WiRain size={60} color="#1E90FF" />;
      case "Snow":
        return <WiSnow size={60} color="#00CED1" />;
      case "Thunderstorm":
        return <WiThunderstorm size={60} color="#8B0000" />;
      default:
        return <WiCloud size={60} color="#A9A9A9" />;
    }
  };

  const toggleUnits = () => {
    setUnit((prevUnit) => {
      const newUnit = prevUnit === "metric" ? "imperial" : "metric";
      if (city) fetchWeather(newUnit);
      return newUnit;
    });
  };

  return (
    <div className="weather-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          className="weather-input"
        />
        <button onClick={() => fetchWeather(unit)} className="weather-button">
          Get Weather
        </button>
        <button onClick={toggleUnits} className="convert-button">
          Convert Units ({unit === "metric" ? "°C → °F" : "°F → °C"})
        </button>
      </div>

      {error && <p className="weather-error">{error}</p>}

      {weather ? (
        <div className="weather-info-box">
          <div className="weather-header">
            <h2>{weather.name}</h2>
            <div className="weather-icon">
              {getWeatherIcon(weather.weather[0].main)}
            </div>
          </div>
          <div className="weather-details">
            <p>
              Temperature: {weather.main.temp}°{unit === "metric" ? "C" : "F"}
            </p>
            <p>Condition: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} {unit === "metric" ? "m/s" : "mph"}</p>
          </div>
        </div>
      ) : (
        <p className="weather-placeholder">Enter a city to get the weather.</p>
      )}

      {weather && (
        <div className="activity-box">
          <ActivitySuggester condition={weather.weather[0].main} />
        </div>
      )}
    </div>
  );
};

export default WeatherCard;