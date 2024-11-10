const API_KEY = "19ba8ab464ff4579d588462c639c781e";
const searchInput = document.querySelector(".weather-search");
const searchButton = document.querySelector(".search-btn");


const formatDate = (date) =>
  date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });


const getWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();

    if (data.cod === 200) {
      updateWeatherUI(data);
    } else {
      alert("City not found!");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Error fetching weather data!");
  }
};


const updateWeatherUI = (data) => {
  const {
    name,
    sys: { country },
    main: { temp, humidity, pressure },
    wind: { speed },
    weather: [{ main: weatherMain }],
  } = data;

 
  document.querySelector(".location-name").innerHTML = `${name}, ${country}`;
  document.querySelector(".current-date").innerHTML = `Today ${formatDate(
    new Date()
  )}`;

  
  document.querySelector(".temperature").innerHTML = `${Math.round(temp)}°C`;
  document.querySelector(".weather-condition").innerHTML = weatherMain;

 
  document.querySelector(".humidity-value").innerHTML = `${humidity}%`;
  document.querySelector(".wind-value").innerHTML = `${Math.round(
    speed
  )} km/h`;
  document.querySelector(".pressure-value").innerHTML = `${pressure}`;
};


searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) getWeatherData(city);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchInput.value.trim();
    if (city) getWeatherData(city);
  }
});


getWeatherData("alger");
