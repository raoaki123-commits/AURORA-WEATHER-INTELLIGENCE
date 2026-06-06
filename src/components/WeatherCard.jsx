import { generateWeatherSummary } from "../utils/weatherAI";
import { generateWeatherAlerts } from "../utils/weatherInsights";
import { calculateEnvironmentScore } from "../utils/environmentalScore";

export default function WeatherCard({
  weather,
  forecast,
  airQuality,
}) {
  if (!weather) return null;

  const sunrise = new Date(
    weather.sys.sunrise * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(
    weather.sys.sunset * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const alerts =
    generateWeatherAlerts(weather);

  const score =
    calculateEnvironmentScore(
      weather
    );

  const iconCode =
    weather.weather[0].icon;

  const iconUrl =
    `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  let aqiText = "Unknown";

  if (airQuality?.list?.[0]) {
    const aqi =
      airQuality.list[0].main.aqi;

    if (aqi === 1)
      aqiText = "Excellent";

    if (aqi === 2)
      aqiText = "Good";

    if (aqi === 3)
      aqiText = "Moderate";

    if (aqi === 4)
      aqiText = "Poor";

    if (aqi === 5)
      aqiText = "Very Poor";
  }

  return (
    <div className="card">
      <h2>
        📍 {weather.name},{" "}
        {weather.sys.country}
      </h2>

      <img
        src={iconUrl}
        alt="Weather Icon"
        width="120"
      />

      <h1
        style={{
          fontSize: "3rem",
          margin: "10px 0",
        }}
      >
        {Math.round(
          weather.main.temp
        )}
        °C
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          opacity: 0.9,
        }}
      >
        {
          weather.weather[0]
            .description
        }
      </p>

      <div className="grid">
        <p>
          🌡 Feels Like:{" "}
          {Math.round(
            weather.main.feels_like
          )}
          °C
        </p>

        <p>
          💧 Humidity:{" "}
          {weather.main.humidity}%
        </p>

        <p>
          🌬 Wind:{" "}
          {weather.wind.speed} m/s
        </p>

        <p>
          ☁ Condition:{" "}
          {
            weather.weather[0]
              .main
          }
        </p>

        <p>
          📈 Pressure:{" "}
          {
            weather.main
              .pressure
          }{" "}
          hPa
        </p>

        <p>
          👀 Visibility:{" "}
          {(
            weather.visibility /
            1000
          ).toFixed(1)}{" "}
          km
        </p>

        <p>
          🌅 Sunrise:{" "}
          {sunrise}
        </p>

        <p>
          🌇 Sunset:{" "}
          {sunset}
        </p>

        <p>
          🌫 Air Quality:{" "}
          {aqiText}
        </p>
      </div>

      <div
        style={{
          marginTop: "20px",
        }}
      >
      <div
  style={{
    marginTop: "20px",
  }}
>
  <h3>
    🌍 Environment Score
  </h3>

  <div
    style={{
      width: "100%",
      height: "18px",
      background: "rgba(255,255,255,0.1)",
      borderRadius: "10px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${score}%`,
        height: "100%",
        background:
          score > 80
            ? "#22c55e"
            : score > 60
            ? "#eab308"
            : "#ef4444",
      }}
    />
  </div>

  <p>{score}/100</p>
</div>
      </div>

      {alerts.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          <h3>
            ⚠ Weather Alerts
          </h3>

          {alerts.map(
            (
              alert,
              index
            ) => (
              <p key={index}>
                {alert}
              </p>
            )
          )}
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          borderRadius: "12px",
          background:
            "rgba(255,255,255,0.05)",
          fontStyle: "italic",
          color: "#cbd5e1",
        }}
      >
        🤖{" "}
        {generateWeatherSummary(
          weather,
          forecast
        )}
      </div>
    </div>
  );
}