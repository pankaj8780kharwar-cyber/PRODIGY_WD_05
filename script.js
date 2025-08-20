const apiKey = 'd738a259eacfde9d602dc307415a568e'; // Your working API key

async function getWeatherData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById('weatherInfo').innerHTML = `<p>${data.message}</p>`;
      return;
    }

    const iconEmoji = getWeatherEmoji(data.weather[0].main);

    const weatherHTML = `
      <h2>${iconEmoji} ${data.name}, ${data.sys.country}</h2>
      <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
      <p>🌡 Temperature: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind: ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weatherInfo').innerHTML = weatherHTML;
  } catch (error) {
    document.getElementById('weatherInfo').innerHTML = `<p>Error fetching data</p>`;
  }
}

function getWeatherByCity() {
  const city = document.getElementById('cityInput').value;
  if (city.trim() === '') {
    alert('Please enter a city name');
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  getWeatherData(url);
}

function getWeatherEmoji(condition) {
  switch (condition.toLowerCase()) {
    case 'clear': return '☀️';
    case 'clouds': return '☁️';
    case 'rain': return '🌧️';
    case 'drizzle': return '🌦️';
    case 'thunderstorm': return '⛈️';
    case 'snow': return '❄️';
    case 'mist':
    case 'haze':
    case 'fog': return '🌫️';
    default: return '🌈';
  }
}
