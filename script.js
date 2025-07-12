const apiKey = "62fffd951cded58b2e10cc95749d5f48";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const body = document.querySelector("body");

async function getWeather(city) {
  const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";

    const weather = data.weather[0].main;
    updateIcon(weather);
    updateBackground(weather);

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

function updateIcon(weather) {
  const icons = {
    Clouds: "clouds.png",
    Clear: "clear.png",
    Rain: "rain.png",
    Drizzle: "drizzle.png",
    Mist: "mist.png",
    Snow: "snow.png",
  };
  weatherIcon.src = `images/${icons[weather] || "default.png"}`;
}

function updateBackground(weather) {
  const backgrounds = {
    Clouds: "url('images/cloudy.jpg')",
    Clear: "url('images/clear-sky.jpg')",
    Rain: "url('images/rainy.jpg')",
    Drizzle: "url('images/drizzle.jpg')",
    Mist: "url('images/misty.jpg')",
    Snow: "url('images/snowy.jpg')",
  };
  body.style.backgroundImage =
    backgrounds[weather] || "url('images/default.jpg')";
  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "center center";
}

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});

// Smoky cursor effect
document.addEventListener("mousemove", function (e) {
  const smoke = document.createElement("div");
  smoke.className = "cursor-smoke";
  smoke.style.left = `${e.clientX}px`;
  smoke.style.top = `${e.clientY}px`;
  document.body.appendChild(smoke);
  setTimeout(() => smoke.remove(), 1000);
});
