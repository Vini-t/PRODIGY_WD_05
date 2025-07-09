const apiKey = "46527ac705a84762e2aec1ba5f752052"; // Replace with your OpenWeatherMap API Key

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name.");
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      fetchWeather(url);
    }, () => {
      alert("Location access denied.");
    });
  } else {
    alert("Geolocation not supported.");
  }
}

function fetchWeather(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        alert(data.message || "Failed to fetch weather.");
        return;
      }

      document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
      document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °C`;
      document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`;

      const iconCode = data.weather[0].icon;
      const icon = document.getElementById("weatherIcon");
      icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      icon.style.display = "inline-block";
    })
    .catch(err => {
      alert("Error fetching data");
      console.error(err);
    });
}
