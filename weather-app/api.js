import { API_KEY } from "./config.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) => {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (response.status === 404) {
    throw new Error("City not found. Spelling check karo.");
  }
  if (response.status === 401) {
    throw new Error("Invalid API key. Key check karo ya activate hone ka wait karo.");
  }
  if (!response.ok) {
    throw new Error(`Something went wrong (${response.status})`);
  }

  return response.json();
};