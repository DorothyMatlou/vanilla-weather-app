let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const day = days[now.getDay()];
const am_pm = now.toLocaleTimeString();

document.getElementById("date").innerHTML = `${day} ${am_pm}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  const forecast = response;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <div class="weather-forecast-image"><img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" width="36px"></div>
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}°</span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>
      </div>
    `;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

async function getForecast(coordinates) {
  const apiKey = "597c40c39084687093b091cd48b366f8";
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  const forecastData = data.daily;
  showForecast(forecastData);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

const apiKey = "9cb72bec958f8fb02391985ed7b219d2";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");
const weatherIcon = document.querySelector("#weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".units").style.display = "none";
    document.querySelector(".weather-temp").style.display = "none";
    document.querySelector("#description").style.display = "none";
    document.querySelector("#humidity").style.display = "none";
    document.querySelector("#wind-speed").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector("#location").innerHTML = data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      data.main.temp
    );
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind-speed").innerHTML = data.wind.speed + "km/hr";
    document.querySelector("#description").innerHTML =
      data.weather[0].description;
    weatherIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );

    getForecast(data.coord);

    document.querySelector(".error").style.display = "none";
    document.querySelector(".units").style.display = "block";
    document.querySelector(".weather-temp").style.display = "block";
    document.querySelector("#description").style.display = "block";
    document.querySelector("#humidity").style.display = "block";
    document.querySelector("#wind-speed").style.display = "block";
  }
}

checkWeather("Pretoria");
showForecast();

const form = document.querySelector("#search-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkWeather(searchBox.value);
});

let geoUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&";

async function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  const response = await fetch(
    geoUrl + `lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );

  let geoData = await response.json();

  document.querySelector("#location").innerHTML = geoData.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    geoData.main.temp
  );
  document.querySelector("#humidity").innerHTML = geoData.main.humidity + "%";
  document.querySelector("#wind-speed").innerHTML =
    geoData.wind.speed + "km/hr";
  document.querySelector("#description").innerHTML =
    geoData.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${geoData.weather[0].icon}@2x.png`
  );
  console.log(geoData);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPositionBtn = document.querySelector("#current-position");
currentPositionBtn.addEventListener("click", getCurrentPosition);
