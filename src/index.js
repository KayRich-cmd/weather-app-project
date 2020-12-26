// Getting Current Day of the Week & Time
function formatDate(date) {
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[dayIndex];

  return `${currentDay} at ${currentHours}:${currentMinutes}`;
}

//  Display Current Day of the Week & Time
let date = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = `Last Updated On: ${formatDate(date)}`;

// Current Temp Display after a Standard Search
function showWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");

  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = temperature;

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
}

// API Call for Weather after hitting Submit Button
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiKey = "2e85ceac5b7aab61ec3567d2389a4fd2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

// Search Form Selector (Start Here)
let searchForm = document.querySelector("#search-form");
let searchButton = document.querySelector("#search-button");
searchForm.addEventListener("submit", search);
searchButton.addEventListener("click", search);

// Weather for Current Location
function showCurrentLocationWeather(response) {
  console.log(response.data.name);
  console.log(Math.round(response.data.main.temp));
  let temperature = Math.round(response.data.main.temp);
  let currentCityName = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `The current temp in ${currentCityName} is ${temperature}°C`;
}

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "2e85ceac5b7aab61ec3567d2389a4fd2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentLocationWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

// Convert to F° button
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// Convert back to C° button
function convertBackToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertBackToCelsius);
