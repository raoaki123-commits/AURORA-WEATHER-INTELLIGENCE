export function generateWeatherAlerts(weather) {
  if (!weather) return [];

  const alerts = [];

  // HEAT ALERT
  if (weather.main.temp >= 35) {
    alerts.push(
      "🔥 Heat Alert: Extreme temperatures detected."
    );
  }

  // WIND ALERT
  if (weather.wind.speed >= 12) {
    alerts.push(
      "🌪 High Wind Warning: Strong winds expected."
    );
  }

  // VISIBILITY ALERT
  if (weather.visibility <= 3000) {
    alerts.push(
      "🌫 Poor Visibility: Travel with caution."
    );
  }

  // HUMIDITY ALERT
  if (weather.main.humidity >= 85) {
    alerts.push(
      "💧 High Humidity: Discomfort possible."
    );
  }

  // RAIN ALERT
  if (
    weather.weather[0].main === "Rain" ||
    weather.weather[0].main === "Thunderstorm"
  ) {
    alerts.push(
      "🌧 Heavy Rain Conditions Detected."
    );
  }

  return alerts;
}