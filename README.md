# Weather Application

A real-time weather information application that provides current weather conditions, forecasts, and detailed meteorological data. Get accurate weather updates for any location worldwide using the OpenWeatherMap API.

## Features

### Current Weather Information
- **Real-time Conditions**: Get current weather status for any location
- **Temperature Display**: Shows current temperature with "feels like" temperature
- **Humidity Levels**: Know the humidity percentage
- **Wind Speed**: View wind speed and direction
- **Pressure**: Atmospheric pressure information
- **Visibility**: Current visibility distance
- **UV Index**: UV radiation levels (when available)
- **Weather Icon**: Visual representation of weather conditions

### Location Search
- **Search by City**: Find weather for any city worldwide
- **Location Suggestions**: Autocomplete suggestions as you type
- **Multi-language Support**: Search works in multiple languages
- **Coordinates**: Option to search by latitude and longitude

### Weather Data
- **Condition Description**: Detailed weather condition (e.g., "Light Rain", "Clear Sky")
- **Sunrise/Sunset Times**: Daily sun timing information
- **Dew Point**: Temperature at which dew forms
- **Cloud Coverage**: Percentage of cloud cover
- **Precipitation**: Rain or snow amount when applicable

### User Interface
- **Clean Design**: Modern, intuitive interface
- **Weather Icons**: Visual indicators for different weather conditions
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Color-Coded Display**: Different colors for different weather conditions
- **Recent Searches**: Quick access to previously searched locations

### Additional Features
- **Unit Conversion**: Switch between Celsius/Fahrenheit and km/h/mph
- **Background Themes**: Interface adapts based on weather (sunny, rainy, snowy, etc.)
- **Loading Indicators**: Visual feedback while fetching data
- **Error Handling**: Clear messages if location cannot be found

## How to Use

### Searching for Weather
1. Open `index.html` in your web browser
2. Enter a city name in the search bar (e.g., "Tokyo", "New York", "London")
3. Press Enter or click the Search button
4. Weather information loads automatically for that location

### Reading the Weather Display
- **Temperature**: Large number showing current temperature
- **Condition**: Text description of weather (e.g., "Mostly Cloudy")
- **Details**: Additional information like humidity, wind, and pressure
- **Forecast**: Look for any forecast section (if available in your version)

### Using Location Services
1. Grant location permission when prompted
2. Click the location button (if available)
3. The app automatically shows weather for your current location

### Changing Units
1. Look for a settings or units button
2. Toggle between:
   - **Temperature**: Celsius (°C) vs Fahrenheit (°F)
   - **Wind Speed**: Kilometers per hour (km/h) vs Miles per hour (mph)

### Viewing Recent Searches
1. Recent searches appear in a list (if enabled)
2. Click a previous location to quickly view its weather

## Weather Information Explained

### Temperature
- **Current**: Real-time temperature
- **Feels Like**: Perceived temperature considering wind and humidity
- **Min/Max**: Daily minimum and maximum temperatures

### Humidity
- **0-30%**: Dry conditions
- **30-60%**: Comfortable
- **60-100%**: Humid

### Wind
- **Speed**: How fast the wind is blowing
- **Direction**: Where the wind is coming from (N, S, E, W, etc.)
- **Gusts**: Maximum wind speed (if available)

### Pressure
- **Millibars (mb)**: Standard measurement unit
- **Normal**: Around 1013 mb
- **High**: Often indicates clear weather
- **Low**: May indicate stormy weather

### UV Index
- **0-2**: Low
- **3-5**: Moderate
- **6-7**: High
- **8-10**: Very High
- **11+**: Extreme

### Cloud Coverage
- **0%**: Clear sky
- **50%**: Partly cloudy
- **100%**: Overcast

## API Integration

This application uses the **OpenWeatherMap API** - a reliable source for weather data worldwide.

- **Free Tier**: Available (limited to current weather)
- **Data Updates**: Real-time updates every few minutes
- **Coverage**: Works for cities worldwide
- **Accuracy**: Powered by weather stations and satellite data

## Files

- `index.html` - HTML structure and layout
- `styles.css` - Styling, responsive design, and weather themes
- `script.js` - API integration, search functionality, and data processing
- `README.md` - This file

## Browser Compatibility

Works on all modern browsers:
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

Requires JavaScript to be enabled.

## Use Cases

- **Daily Planning**: Check weather before planning activities
- **Travel**: Research weather at travel destinations
- **Outdoor Activities**: Plan sports and recreation based on conditions
- **Packing**: Know what clothes to pack based on forecasts
- **Health**: Monitor UV index for sun protection
- **Aviation & Sailing**: Access detailed meteorological data

## Tips

1. **Accurate City Names**: Use full city names for best results (e.g., "San Francisco" instead of "SF")
2. **International Cities**: Include country if there are duplicate city names
3. **Timezone Awareness**: Times shown are in local timezone of the searched location
4. **Cache Recent**: Save frequently checked locations for quick access
5. **Refresh Data**: Click refresh or search again for the latest data

## Troubleshooting

### Weather Not Loading
- Check your internet connection
- Ensure the OpenWeatherMap API is accessible in your region
- Try searching for a different city
- Refresh the page

### Location Not Found
- Try searching with a different spelling
- Include the country name (e.g., "Paris, France")
- Check for typos in the city name
- Some small towns may not be in the database

### Temperature Shows Wrong Unit
- Check the unit settings
- Ensure you've selected your preferred temperature scale
- The API may default to Celsius

### No Location Permission
- Check browser settings for location access
- Grant permission when prompted
- Try manually searching for a location instead

### Display Issues on Mobile
- Try rotating your device
- Check if zoom level is correct
- Clear browser cache and reload
- Try a different browser

## Weather Condition Icons

Common weather symbols:
- ☀️ Clear/Sunny
- ⛅ Partly Cloudy
- ☁️ Overcast
- 🌧️ Light Rain
- ⛈️ Thunderstorm
- ❄️ Snow
- 🌫️ Fog/Mist

## Privacy & Data

- **Location Data**: Only used to fetch weather information
- **No Tracking**: This application doesn't track user activity
- **API Data**: Uses OpenWeatherMap's public API
- **Cookies**: May use minimal cookies for preferences (optional)

## Credits

Weather data provided by [OpenWeatherMap](https://openweathermap.org/) - A comprehensive weather information service.

This is an independent application using the public OpenWeatherMap API for educational and personal use.
