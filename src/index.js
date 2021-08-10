function formatDate() {
  let now = new Date();
  let minutes = now.getMinutes();
  let hours = now.getHours();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let number = now.getDate();

  let date = `${day}, ${month} ${number}, ${hours}:${minutes} `;

  let dateHeading = document.querySelector(".date-time");
  {
    dateHeading.innerHTML = date;
  }
}

formatDate();

function displayWeatherCondition(response) {
  console.log(response.data.name);
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("h1").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector(
    "#feels-like-temp"
  ).innerHTML = `Feels Like ${Math.round(response.data.main.feels_like)}°`;
  document.querySelector("#high").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#low").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("h3").innerHTML = response.data.weather[0].description;
}

function search(city) {
  let apiKey = "f3e9b7fb8cbac59f9b2f8b3d635b8d32";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

search("White Rock");

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f3e9b7fb8cbac59f9b2f8b3d635b8d32";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(displayWeatherCondition);
  console.log(position);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let button = document.querySelector("#submit-current-city-button");
button.addEventListener("click", findCurrentLocation);
