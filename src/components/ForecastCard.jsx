export default function ForecastCard({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="card">
      <h2>📊 5-Day Forecast Intelligence</h2>

      <div className="grid">
        {forecast.map((day, index) => {
          const date = new Date(day.dt * 1000);

          const dayName = date.toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          );

          return (
            <div
              key={index}
              className="miniCard"
            >
              <h3>{dayName}</h3>

              <h2>
                {Math.round(day.main.temp)}°C
              </h2>

              <p>
                ☁ {day.weather[0].main}
              </p>

              <p>
                💧 {day.main.humidity}%
              </p>

              <p>
                🌬 {day.wind.speed} m/s
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}