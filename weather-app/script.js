import { fetchWeather } from "./api.js";
import { showMessage, hideWeather, renderWeather } from "./ui.js";

const form = document.getElementById("search-form");
const input = document.getElementById("city-input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = input.value.trim();

  if (!city) {
    hideWeather();
    showMessage("Please enter a city name.", true);
    return;
  }

  showMessage("Loading...");
  hideWeather();

  try {
    const data = await fetchWeather(city);
    renderWeather(data);
    showMessage("");
  } catch (error) {
    const text = error instanceof TypeError
      ? "Network error. Internet check karo."
      : error.message;
    showMessage(text, true);
  }
});