document.getElementById('cityDropdown').addEventListener('change', function () {
    const city = this.value;
    updateWeather(city);
  });
  
  function updateWeather(city) {
    const cities = {
      multan: { name: 'Multan', weather: 'Sunny', temperature: '31°C' },
      gilgit: { name: 'Gilgit Baltistan', weather: 'Snowy', temperature: '-2°C' },
      lahore: { name: 'Lahore', weather: 'Cloudy', temperature: '24°C' },
      karachi: { name: 'Karachi', weather: 'Rainy', temperature: '28°C' },
      islamabad: { name: 'Islamabad', weather: 'Foggy', temperature: '15°C' },
    };

    const selectedCity = cities[city];
    document.getElementById('cityName').textContent = selectedCity.name;
    document.getElementById('weatherStatus').textContent = selectedCity.weather;
    document.getElementById('temperature').textContent = selectedCity.temperature;
  }
  
  // Initialize with default city
  updateWeather('multan');

// Forecast data for each city
const cityForecasts = {
  multan: {
    today: {
      date: "May 3, 2025",
      temp: "33°C",
      condition: "Sunny",
      humidity: "30%",
      wind: "12 km/h"
    },
    week: [
      { day: "Sat", date: "May 3", min: "28°C", max: "34°C", condition: "Sunny" },
      { day: "Sun", date: "May 4", min: "29°C", max: "35°C", condition: "Sunny" },
      { day: "Mon", date: "May 5", min: "30°C", max: "36°C", condition: "Partly Cloudy" },
      { day: "Tue", date: "May 6", min: "27°C", max: "33°C", condition: "Cloudy" },
      { day: "Wed", date: "May 7", min: "28°C", max: "32°C", condition: "Windy" },
      { day: "Thu", date: "May 8", min: "29°C", max: "34°C", condition: "Sunny" },
      { day: "Fri", date: "May 9", min: "27°C", max: "33°C", condition: "Thunderstorm" }
    ]
  },
  gilgit: {
    today: {
      date: "May 3, 2025",
      temp: "-1°C",
      condition: "Snowy",
      humidity: "80%",
      wind: "6 km/h"
    },
    week: [
      { day: "Sat", date: "May 3", min: "-4°C", max: "1°C", condition: "Snowy" },
      { day: "Sun", date: "May 4", min: "-5°C", max: "2°C", condition: "Cloudy" },
      { day: "Mon", date: "May 5", min: "-3°C", max: "3°C", condition: "Sunny" },
      { day: "Tue", date: "May 6", min: "-2°C", max: "4°C", condition: "Snow Showers" },
      { day: "Wed", date: "May 7", min: "-1°C", max: "5°C", condition: "Snowy" },
      { day: "Thu", date: "May 8", min: "0°C", max: "6°C", condition: "Cloudy" },
      { day: "Fri", date: "May 9", min: "1°C", max: "7°C", condition: "Sunny" }
    ]
  },
  lahore: {
    today: {
      date: "May 3, 2025",
      temp: "26°C",
      condition: "Cloudy",
      humidity: "60%",
      wind: "9 km/h"
    },
    week: [
      { day: "Sat", date: "May 3", min: "22°C", max: "27°C", condition: "Cloudy" },
      { day: "Sun", date: "May 4", min: "23°C", max: "28°C", condition: "Rain" },
      { day: "Mon", date: "May 5", min: "24°C", max: "29°C", condition: "Thunderstorm" },
      { day: "Tue", date: "May 6", min: "22°C", max: "26°C", condition: "Sunny" },
      { day: "Wed", date: "May 7", min: "21°C", max: "25°C", condition: "Partly Cloudy" },
      { day: "Thu", date: "May 8", min: "23°C", max: "27°C", condition: "Cloudy" },
      { day: "Fri", date: "May 9", min: "24°C", max: "28°C", condition: "Rain" }
    ]
  },
  karachi: {
    today: {
      date: "May 3, 2025",
      temp: "29°C",
      condition: "Rainy",
      humidity: "70%",
      wind: "20 km/h"
    },
    week: [
      { day: "Sat", date: "May 3", min: "27°C", max: "31°C", condition: "Rainy" },
      { day: "Sun", date: "May 4", min: "28°C", max: "32°C", condition: "Thunderstorm" },
      { day: "Mon", date: "May 5", min: "29°C", max: "33°C", condition: "Cloudy" },
      { day: "Tue", date: "May 6", min: "28°C", max: "32°C", condition: "Sunny" },
      { day: "Wed", date: "May 7", min: "27°C", max: "31°C", condition: "Rainy" },
      { day: "Thu", date: "May 8", min: "29°C", max: "33°C", condition: "Cloudy" },
      { day: "Fri", date: "May 9", min: "30°C", max: "34°C", condition: "Sunny" }
    ]
  },
  islamabad: {
    today: {
      date: "May 3, 2025",
      temp: "18°C",
      condition: "Foggy",
      humidity: "85%",
      wind: "5 km/h"
    },
    week: [
      { day: "Sat", date: "May 3", min: "15°C", max: "19°C", condition: "Foggy" },
      { day: "Sun", date: "May 4", min: "16°C", max: "20°C", condition: "Cloudy" },
      { day: "Mon", date: "May 5", min: "17°C", max: "21°C", condition: "Rain" },
      { day: "Tue", date: "May 6", min: "18°C", max: "22°C", condition: "Sunny" },
      { day: "Wed", date: "May 7", min: "17°C", max: "21°C", condition: "Partly Cloudy" },
      { day: "Thu", date: "May 8", min: "19°C", max: "23°C", condition: "Sunny" },
      { day: "Fri", date: "May 9", min: "20°C", max: "24°C", condition: "Rain" }
    ]
  }
};

function renderTodayForecast(city) {
  const todayDiv = document.getElementById('todayForecast');
  const todayForecast = cityForecasts[city].today;
  todayDiv.innerHTML = `
    <span>${todayForecast.date}</span> <span>${todayForecast.temp}</span> <span>${todayForecast.condition}</span> <span>Humidity: ${todayForecast.humidity}</span> <span>Wind: ${todayForecast.wind}</span>
  `;
}

function renderWeeklyForecast(city) {
  const forecastList = document.getElementById('weeklyForecast');
  forecastList.innerHTML = '';
  cityForecasts[city].week.forEach(day => {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'forecast-day';
    dayDiv.innerHTML = `<strong>${day.day} (${day.date})</strong>: ${day.condition}, <span>Min: ${day.min}</span>, <span>Max: ${day.max}</span>`;
    forecastList.appendChild(dayDiv);
  });
}

// On city change, update forecasts too
function handleCityChange(city) {
  updateWeather(city);
  renderTodayForecast(city);
  renderWeeklyForecast(city);
}

document.getElementById('cityDropdown').addEventListener('change', function () {
  const city = this.value;
  handleCityChange(city);
});

// Initialize with default city
handleCityChange('multan');