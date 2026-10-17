import { API_KEY } from "./config.js";

const BASE_URL = "https://www.omdbapi.com/";

const request = async (params) => {
  const query = new URLSearchParams({ apikey: API_KEY, ...params });
  const response = await fetch(`${BASE_URL}?${query}`);

  if (response.status === 401) {
    throw new Error("Invalid API key. Key check karo ya email se activate karo.");
  }
  if (!response.ok) {
    throw new Error(`Something went wrong (${response.status})`);
  }

  const data = await response.json();
  if (data.Response === "False") {
    throw new Error(data.Error);
  }
  return data;
};

export const searchMovies = async (title) => {
  const { Search } = await request({ s: title, type: "movie" });

  // Har movie ki poori detail (rating, release date) mangwao
  const details = await Promise.all(
    Search.map(({ imdbID }) => request({ i: imdbID }))
  );
  return details;
};