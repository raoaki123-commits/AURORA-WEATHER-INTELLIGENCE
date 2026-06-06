import { useEffect, useState } from "react";
import {
  getWeather,
  getForecast,
  getWeatherByCoords,
   getAirQuality,
} from "./services/weatherApi";

import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import WeatherMap from "./components/WeatherMap";

import { loginUser, getUser } from "./utils/user";

function App() {
  // WEATHER
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [airQuality, setAirQuality] =
  useState(null);

  // USER
  const [user, setUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // SAVED CITIES
  const [savedCities, setSavedCities] = useState([]);

  // RECENT SEARCHES
  const [recentSearches, setRecentSearches] = useState([]);

  // LOAD SAVED DATA
  useEffect(() => {
    const savedUser = getUser();

    if (savedUser) {
      setUser(savedUser);
      setLoggedIn(true);
    }

    const cities = JSON.parse(
      localStorage.getItem("cities")
    );

    if (cities) {
      setSavedCities(cities);
    }

    const recent = JSON.parse(
      localStorage.getItem("recentSearches")
    );

    if (recent) {
      setRecentSearches(recent);
    }
  }, []);

  // SEARCH WEATHER
  const handleSearch = async () => {
    if (!city) return;

    setLoading(true);

    try {
     const current = await getWeather(city);
const future = await getForecast(city);

setWeather(current);

const air = await getAirQuality(
  current.coord.lat,
  current.coord.lon
);

setAirQuality(air);

      if (future?.list) {
        const daily = future.list.filter(
          (_, i) => i % 8 === 0
        );

        setForecast(daily);
      }

      const updatedRecent = [
        city,
        ...recentSearches.filter(
          (c) => c !== city
        ),
      ].slice(0, 5);

      setRecentSearches(updatedRecent);

      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedRecent)
      );
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // LOCATION WEATHER
  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by this browser."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        console.log(
          "Latitude:",
          latitude
        );
        console.log(
          "Longitude:",
          longitude
        );

        const current =
          await getWeatherByCoords(
            latitude,
            longitude
          );

        console.log(current);

        setWeather(current);

const air = await getAirQuality(
  current.coord.lat,
  current.coord.lon
);

setAirQuality(air);

setForecast([]);
      },
      (error) => {
        console.error(error);

        alert(
          "Location permission denied or unavailable."
        );
      }
    );
  };

  // SAVE CITY
  const saveCity = () => {
    if (!city) return;

    if (savedCities.includes(city))
      return;

    const updated = [
      ...savedCities,
      city,
    ];

    setSavedCities(updated);

    localStorage.setItem(
      "cities",
      JSON.stringify(updated)
    );
  };

  // DYNAMIC BACKGROUND
  let backgroundClass = "default-bg";

  if (
    weather?.weather?.[0]?.main ===
    "Clear"
  ) {
    backgroundClass = "clear-bg";
  }

  if (
    weather?.weather?.[0]?.main ===
    "Rain"
  ) {
    backgroundClass = "rain-bg";
  }

  if (
    weather?.weather?.[0]?.main ===
    "Clouds"
  ) {
    backgroundClass = "cloud-bg";
  }

  return (
    <div
      className={`container ${backgroundClass}`}
    >
    <div className="hero">
  <h1>🌌 Aurora Weather Intelligence</h1>

  <p>
    Real-time atmospheric monitoring,
    forecasting and environmental
    intelligence.
  </p>
</div>
      {!loggedIn ? (
        <div className="card">
          <h3>Login System</h3>

          <input
            placeholder="Enter your name"
            value={user}
            onChange={(e) =>
              setUser(e.target.value)
            }
          />

          <button
            onClick={() => {
              loginUser(user);
              setLoggedIn(true);
            }}
          >
            Login
          </button>
        </div>
      ) : (
        <div className="card">
          <h3>
            👤 Welcome back, {user}
          </h3>
          <p>
            Weather Intelligence Dashboard
            Ready
          </p>
        </div>
      )}

      {/* SEARCH */}
      
       <div className="search-bar">
      
        <input
          placeholder="Enter city..."
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <button onClick={handleSearch}>
          Search
        </button>

        <button
          onClick={handleLocation}
        >
          📍 My Location
        </button>

        <button onClick={saveCity}>
          💾 Save City
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="card">
          <h3>
            🌍 Fetching atmospheric
            intelligence...
          </h3>
        </div>
      )}
     <div className="dashboard-section">
  <h2 className="section-title">
    🌤 Current Conditions
  </h2>
</div> 

      {/* WEATHER */}
     <WeatherCard
  weather={weather}
  forecast={forecast}
  airQuality={airQuality}
/>
      <div className="dashboard-section">
  <h2 className="section-title">
    📊 Forecast Intelligence
  </h2>
</div>

      {/* FORECAST */}
      <ForecastCard
        forecast={forecast}
      />
     <div className="dashboard-section">
  <h2 className="section-title">
    🗺 Location Intelligence
  </h2>
</div> 

      {/* MAP */}
      {weather?.coord && (
        <WeatherMap
          lat={weather.coord.lat}
          lon={weather.coord.lon}
        />
      )}
     <h2 className="section-title">
  ⭐ Saved Locations
</h2> 

      {/* SAVED CITIES */}
      <div className="card">
        <h3>⭐ Saved Cities</h3>

        {savedCities.length === 0 ? (
          <p>No saved cities yet</p>
        ) : (
          savedCities.map(
            (cityName, index) => (
              <button
                key={index}
                onClick={() =>
                  setCity(cityName)
                }
              >
                {cityName}
              </button>
            )
          )
        )}
      </div>
     <h2 className="section-title">
  🕒 Recent Activity
</h2> 

      {/* RECENT SEARCHES */}
      <div className="card">
        <h3>🕒 Recent Searches</h3>

        {recentSearches.length === 0 ? (
          <p>No recent searches</p>
        ) : (
          recentSearches.map(
            (item, index) => (
              <button
                key={index}
                onClick={() =>
                  setCity(item)
                }
              >
                {item}
              </button>
            )
          )
        )}
      </div>
    </div>
  );
}

export default App;