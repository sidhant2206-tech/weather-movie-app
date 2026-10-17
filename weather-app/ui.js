const $ = (id) => document.getElementById(id);

export const showMessage = (text, isError = false) => {
  const message = $("message");
  message.textContent = text;
  message.classList.toggle("error", isError);
};

export const hideWeather = () => {
  $("weather-result").classList.add("hidden");
};

export const renderWeather = (data) => {
  const {
    name,
    sys: { country },
    main: { temp, humidity },
    wind: { speed },
    weather: [{ description, icon }],
  } = data;

  $("city-name").textContent = `${name}, ${country}`;
  $("weather-icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  $("temperature").textContent = `${Math.round(temp)}°C`;
  $("condition").textContent = description;
  $("humidity").textContent = `${humidity}%`;
  $("wind").textContent = `${(speed * 3.6).toFixed(1)} km/h`;

  $("weather-result").classList.remove("hidden");
};