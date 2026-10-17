const $ = (id) => document.getElementById(id);

const escapeHTML = (text) =>
  String(text).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));

export const showMessage = (text, isError = false) => {
  const message = $("message");
  message.textContent = text;
  message.classList.toggle("error", isError);
};

export const clearMovies = () => {
  $("movie-grid").innerHTML = "";
};

const createCard = ({ Title, Year, Released, imdbRating, Genre, Poster }) => {
  const posterHTML =
    Poster && Poster !== "N/A"
      ? `<img src="${escapeHTML(Poster)}" alt="${escapeHTML(Title)} poster">`
      : `<div class="no-poster">No Poster</div>`;

  return `
    <article class="movie-card">
      ${posterHTML}
      <div class="movie-info">
        <h3>${escapeHTML(Title)} (${escapeHTML(Year)})</h3>
        <p>📅 ${escapeHTML(Released)}</p>
        <p>🎭 ${escapeHTML(Genre)}</p>
        <p class="rating">⭐ ${escapeHTML(imdbRating)} / 10</p>
      </div>
    </article>`;
};

export const renderMovies = (movies) => {
  const grid = $("movie-grid");
  grid.innerHTML = movies.map(createCard).join("");

  grid.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      const fallback = document.createElement("div");
      fallback.className = "no-poster";
      fallback.textContent = "No Poster";
      img.replaceWith(fallback);
    });
  });
};