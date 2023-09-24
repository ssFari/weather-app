const apiKey = "6b4a0d11932d50d3dde190689da5c73c";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "assets/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "assets/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "assets/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "assets/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "assets/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchButton.addEventListener("click", () => {
  if (searchBox.value == "") {
    document.querySelector(".weather").style.display = "none";
  } else {
    checkWeather(searchBox.value);
  }
});

searchBox.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    if (searchBox.value == "") {
      document.querySelector(".weather").style.display = "none";
      document.querySelector(".error").style.display = "none";
    } else {
      checkWeather(searchBox.value);
    }
  }
});
