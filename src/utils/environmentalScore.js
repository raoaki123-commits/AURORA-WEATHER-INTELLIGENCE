export function calculateEnvironmentScore(
  weather
) {
  if (!weather) return 0;

  let score = 100;

  if (weather.main.temp > 35)
    score -= 20;

  if (weather.main.humidity > 85)
    score -= 15;

  if (weather.wind.speed > 12)
    score -= 15;

  if (weather.visibility < 3000)
    score -= 20;

  return Math.max(score, 0);
}