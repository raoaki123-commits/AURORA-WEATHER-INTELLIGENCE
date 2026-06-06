export const generateWeatherSummary = (weather, forecast) => {
  if (!weather) return "";

  const temp = weather.main.temp;
  const condition = weather.weather[0].main;
  const wind = weather.wind.speed;

  let summary = `Today in ${weather.name}: `;

  if (temp > 35) summary += "extreme heat conditions, high stress environment. ";
  else if (temp < 10) summary += "cold climate, thermal protection recommended. ";
  else summary += "moderate temperature conditions. ";

  if (condition.toLowerCase().includes("rain")) {
    summary += "Rain expected, outdoor activity risk elevated. ";
  } else if (condition.toLowerCase().includes("clear")) {
    summary += "Clear sky, stable atmospheric conditions. ";
  }

  if (wind > 8) {
    summary += "High wind activity detected, travel caution advised.";
  } else {
    summary += "Wind conditions are stable.";
  }

  return summary;
};