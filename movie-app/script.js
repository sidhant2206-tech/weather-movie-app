import { searchMovies } from "./api.js";
import { showMessage, clearMovies, renderMovies } from "./ui.js";

const form = document.getElementById("search-form");
const input = document.getElementById("movie-input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = input.value.trim();

  if (!title) {
    clearMovies();
    showMessage("Please enter a movie name.", true);
    return;
  }

  showMessage("Searching...");
  clearMovies();

  try {
    const movies = await searchMovies(title);
    renderMovies(movies);
    showMessage(`${movies.length} movies found for "${title}"`);
  } catch (error) {
    let text = error.message;
    if (error instanceof TypeError) {
      text = "Network error. Internet check karo.";
    } else if (text === "Movie not found!") {
      text = `"${title}" naam ki koi movie nahi mili.`;
    } else if (text === "Too many results.") {
      text = "Bahut zyada results. Thoda specific naam likho.";
    }
    showMessage(text, true);
  }
});