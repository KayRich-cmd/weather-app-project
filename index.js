// Getting Current Date & Time
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
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let currentDay = days[dayIndex];

  return `${currentDay} , ${currentHours}:${currentMinutes}`;
}

// Where to Display Current Date & Time
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Current Temp Display after a Standard Search
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `The current temp in ${cityName} is ${temperature}°C`;
}

// Searching for Weather after hitting Submit Button
function alertWeatherSearch(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiKey = "2e85ceac5b7aab61ec3567d2389a4fd2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

// Search Form (Start Here)
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", alertWeatherSearch);

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

let currentLocationLink = document.querySelector("#current-location-link");
currentLocationLink.addEventListener("click", getCurrentPosition);

// Convert to F° button
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

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
