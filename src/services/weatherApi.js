import axios from "axios";

const API_KEY = "0a2232dc29db8919e5a895c51175b21c";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// 🌍 WEATHER BY CITY
export const getWeather = async (city) => {
  try {
    const res = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// 📊 FORECAST
export const getForecast = async (city) => {
  try {
    const res = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// 📍 WEATHER BY GPS LOCATION
export const getWeatherByCoords = async (
  lat,
  lon
) => {
  try {
    const res = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
// 🌫 AIR QUALITY
export const getAirQuality = async (
  lat,
  lon
) => {
  try {
    const res = await axios.get(
      "https://api.openweathermap.org/data/2.5/air_pollution",
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};