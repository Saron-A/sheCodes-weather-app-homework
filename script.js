let searchInput = document.querySelector("#search");
let btn = document.querySelector("#search-btn");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function searchCity() {
  let city = searchInput.value.trim();
  let apiKey = "5704c3b4443b30c3afaa70c5fodbt64b";

  let response = await axios.get(
    `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
  );

  let info = response.data;
  console.log(info);
  getWeather(info);
}

function getWeather(info) {
  let city = document.querySelector("h1");
  city.textContent = info.city;

  let now = new Date();

  let day = document.querySelector("span.day");
  day.innerHTML = days[now.getDay()];

  let time = document.querySelector("span.time");
  time.innerHTML = `${now.getHours()}:${now.getMinutes()}`;

  let description = document.querySelector("span.description");
  description.innerHTML = info.condition.description;

  let humidity = document.querySelector("span.humidity");
  humidity.innerHTML = `${info.temperature.humidity}%`;

  let wind = document.querySelector("span.wind");
  wind.innerHTML = `${info.wind.speed} km/h`;

  let temp = document.querySelector("span.temp");
  temp.innerHTML = Math.round(info.temperature.current);

  let img = document.querySelector(".temp img");
  img.src = info.condition.icon_url;
}

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchCity();
    searchInput.value = "";
    searchInput.focus();
  }
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  searchCity();
  searchInput.value = "";
  searchInput.focus();
});
