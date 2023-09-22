//Week4Homework challenge 1
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

let day = days[now.getDay()];
let am_pm = now.toLocaleTimeString();

document.getElementById("date").innerHTML = `${day} ${am_pm}`;

//Week4Homework challenge 2

function search() {
  let searchInput = document.querySelector("#search-text-input");
  document.getElementById("location").innerHTML = `${searchInput.value}`;
}

let searchForm = document.querySelector("#search-button");
searchForm.addEventListener("click", search);

//Week4Homework Challenge 3

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemp = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//week5 Challenge

const apiKey = "9cb72bec958f8fb02391985ed7b219d2";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector("#search-text-input");
const searchBtn = document.querySelector("#search-button");
const weatherIcon = document.querySelector("#weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);

  document.querySelector("#location").innerHTML = data.name;
  document.querySelector("#temperature").innerHTML = Math.round(data.main.temp);
  document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
  document.querySelector("#wind-speed").innerHTML = data.wind.speed + "km/hr";
  document.querySelector("#description").innerHTML =
    data.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
}
searchBtn.addEventListener("click", () => {
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
  console.log(geoData);

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
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPositionBtn = document.querySelector("#current-position");
currentPositionBtn.addEventListener("click", getCurrentPosition);
