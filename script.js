// ==================== OpenWeatherMap API Configuration ====================
// Get your free API key from: https://openweathermap.org/api
const API_KEY = 'dbc58f7ea880d54cd2af92e36c04e7a7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather icon mapping - Unique emoji icons
const weatherIcons = {
    '01d': '☀️', // clear sky day
    '01n': '🌙', // clear sky night
    '02d': '⛅', // few clouds day
    '02n': '☁️', // few clouds night
    '03d': '☁️', // scattered clouds day
    '03n': '☁️', // scattered clouds night
    '04d': '☁️', // broken clouds day
    '04n': '☁️', // broken clouds night
    '09d': '🌧️', // shower rain day
    '09n': '🌧️', // shower rain night
    '10d': '🌦️', // rain day
    '10n': '🌧️', // rain night
    '11d': '⛈️', // thunderstorm day
    '11n': '⛈️', // thunderstorm night
    '13d': '❄️', // snow day
    '13n': '❄️', // snow night
    '50d': '🌫️', // mist day
    '50n': '🌫️'  // mist night
};

// ==================== DOM Elements ====================
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const currentWeatherDiv = document.getElementById('currentWeather');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const forecastContainer = document.getElementById('forecastContainer');
const suggestionsDiv = document.getElementById('suggestions');

// ==================== Event Listeners ====================
searchBtn.addEventListener('click', () => handleSearch());
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// City suggestions on input
cityInput.addEventListener('input', debounce(handleSuggestions, 300));

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (e.target !== cityInput && e.target !== suggestionsDiv) {
        suggestionsDiv.classList.remove('active');
    }
});

// ==================== Search Handling ====================
function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    fetchWeatherData(city);
}

async function handleSuggestions(e) {
    const query = e.target.value.trim();
    if (query.length < 2) {
        suggestionsDiv.classList.remove('active');
        return;
    }

    try {
        const response = await fetch(
            `${BASE_URL}/find?q=${encodeURIComponent(query)}&type=like&sort=population&limit=5&appid=${API_KEY}`
        );
        const data = await response.json();

        if (data.list && data.list.length > 0) {
            suggestionsDiv.innerHTML = data.list
                .map(city => `
                    <div class="suggestion-item" onclick="selectCity('${city.name}', ${city.coord.lat}, ${city.coord.lon})">
                        ${city.name}, ${city.sys.country}
                    </div>
                `)
                .join('');
            suggestionsDiv.classList.add('active');
        } else {
            suggestionsDiv.classList.remove('active');
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}

function selectCity(city, lat, lon) {
    cityInput.value = city;
    suggestionsDiv.classList.remove('active');
    fetchWeatherData(city);
}

// ==================== Fetch Weather Data ====================
async function fetchWeatherData(city) {
    showLoading(true);
    clearError();

    try {
        // Fetch current weather
        const weatherUrl = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
        const currentResponse = await fetch(weatherUrl);
        const currentData = await currentResponse.json();

        if (currentData.cod !== 200 && currentData.cod !== "200") {
            throw new Error(currentData.message || 'City not found');
        }

        // Fetch 5-day forecast
        const forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Display data
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        showLoading(false);
    } catch (error) {
        showLoading(false);
        showError(error.message || 'Failed to fetch weather data. Please try again.');
        console.error('Error:', error);
    }
}

// ==================== Display Current Weather ====================
function displayCurrentWeather(data) {
    const {
        name,
        sys,
        main,
        weather,
        wind
    } = data;

    const weatherIcon = weatherIcons[weather[0].icon] || '🌡️';
    const date = new Date();
    const dateString = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    document.getElementById('cityName').textContent = `${name}, ${sys.country}`;
    document.getElementById('date').textContent = dateString;
    document.getElementById('weatherIcon').textContent = weatherIcon;
    document.getElementById('temperature').textContent = Math.round(main.temp) + '°C';
    document.getElementById('weatherDesc').textContent = weather[0].main;
    document.getElementById('humidity').textContent = main.humidity + '%';
    document.getElementById('feelsLike').textContent = Math.round(main.feels_like) + '°C';
    document.getElementById('windSpeed').textContent = (wind.speed * 3.6).toFixed(1) + ' km/h';
    document.getElementById('pressure').textContent = main.pressure + ' mb';

    currentWeatherDiv.classList.remove('hidden');
}

// ==================== Display 5-Day Forecast ====================
function displayForecast(data) {
    // Group forecast by day (every 8th item is next day at same time)
    const dailyForecasts = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        if (!dailyForecasts[day]) {
            dailyForecasts[day] = {
                temps: [],
                weather: item.weather[0],
                date: date,
                conditions: []
            };
        }

        dailyForecasts[day].temps.push(item.main.temp);
        dailyForecasts[day].conditions.push(item.weather[0].main);
    });

    // Create forecast cards
    forecastContainer.innerHTML = Object.entries(dailyForecasts)
        .slice(0, 5) // Get only 5 days
        .map(([day, forecast]) => {
            const maxTemp = Math.round(Math.max(...forecast.temps));
            const minTemp = Math.round(Math.min(...forecast.temps));
            const icon = weatherIcons[forecast.weather.icon] || '🌡️';
            const dayName = forecast.date.toLocaleDateString('en-US', { weekday: 'short' });

            return `
                <div class="forecast-card">
                    <div class="forecast-date">${day}</div>
                    <div class="forecast-day">${dayName}</div>
                    <div class="forecast-icon">${icon}</div>
                    <div class="forecast-temps">
                        <div class="forecast-temp">
                            <span class="temp-max">${maxTemp}°</span>
                            <span class="temp-min">${minTemp}°</span>
                        </div>
                    </div>
                    <div class="forecast-condition">${forecast.weather.main}</div>
                </div>
            `;
        })
        .join('');
}

// ==================== UI Helpers ====================
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
        currentWeatherDiv.classList.add('hidden');
        forecastContainer.innerHTML = '';
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    currentWeatherDiv.classList.add('hidden');
    forecastContainer.innerHTML = '';

    // Auto-hide error after 5 seconds
    setTimeout(clearError, 5000);
}

function clearError() {
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
}

// ==================== Utility Functions ====================
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ==================== Initialize ====================
window.addEventListener('load', () => {
    // Load weather for user's current location or default city
    fetchWeatherData('London');
});
