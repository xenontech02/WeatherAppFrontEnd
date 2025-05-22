
import { toast } from "@/hooks/use-toast";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_direction: string;
  description: string;
  main: string;
  icon: string;
  dt: number;
}

export interface ForecastData {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: string;         // Main weather condition (e.g., 'Clouds')
  description: string;  // Description (e.g., 'broken clouds')
  icon: string;         // Weather icon code
  wind_speed: number;
  pop: number; // Probability of precipitation
}

export interface CityInfoData {
  name: string;
  country: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const fetchWeather = async (city: string): Promise<{ current: WeatherData, forecast: ForecastData[], cityInfo: CityInfoData } | null> => {
  try {
    // Step 1: Geocode city name to get coordinates
    const geoRes = await fetch(`${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    if (!geoRes.ok) {
      throw new Error("City not found");
    }
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found");
    }
    const loc = geoData.results[0];
    const lat = loc.latitude;
    const lon = loc.longitude;

    // Step 2: Fetch weather and forecast data
    // Open-Meteo provides both current and forecast data in one call
    const weatherParams = [
      `latitude=${lat}`,
      `longitude=${lon}`,
      "current_weather=true",
      "hourly=temperature_2m,apparent_temperature,relative_humidity_2m,weathercode,wind_speed_10m,wind_direction_10m,precipitation_probability",
      "forecast_days=5",
      "timezone=auto"
    ].join("&");
    const weatherRes = await fetch(`${WEATHER_URL}?${weatherParams}`);
    if (!weatherRes.ok) {
      throw new Error("Weather data not available");
    }
    const weatherData = await weatherRes.json();

    // Step 3: Map Open-Meteo data to your interfaces
    // Mapping current weather
    const current = weatherData.current_weather;
    const cityInfo: CityInfoData = {
      name: loc.name,
      country: loc.country,
      population: loc.population || 0,
      sunrise: weatherData.daily?.sunrise?.[0] ? new Date(weatherData.daily.sunrise[0]).getTime() / 1000 : 0,
      sunset: weatherData.daily?.sunset?.[0] ? new Date(weatherData.daily.sunset[0]).getTime() / 1000 : 0,
      timezone: weatherData.utc_offset_seconds || 0,
    };
    const weatherCodeMap: Record<number, { main: string; description: string; icon: string }> = {
      0: { main: "Clear", description: "Clear sky", icon: "01d" },
      1: { main: "Mainly clear", description: "Mainly clear", icon: "02d" },
      2: { main: "Partly cloudy", description: "Partly cloudy", icon: "03d" },
      3: { main: "Overcast", description: "Overcast", icon: "04d" },
      45: { main: "Fog", description: "Fog", icon: "50d" },
      48: { main: "Depositing rime fog", description: "Rime fog", icon: "50d" },
      51: { main: "Drizzle", description: "Light drizzle", icon: "09d" },
      53: { main: "Drizzle", description: "Drizzle", icon: "09d" },
      55: { main: "Drizzle", description: "Dense drizzle", icon: "09d" },
      56: { main: "Freezing Drizzle", description: "Light freezing drizzle", icon: "13d" },
      57: { main: "Freezing Drizzle", description: "Dense freezing drizzle", icon: "13d" },
      61: { main: "Rain", description: "Slight rain", icon: "10d" },
      63: { main: "Rain", description: "Moderate rain", icon: "10d" },
      65: { main: "Rain", description: "Heavy rain", icon: "10d" },
      66: { main: "Freezing Rain", description: "Light freezing rain", icon: "13d" },
      67: { main: "Freezing Rain", description: "Heavy freezing rain", icon: "13d" },
      71: { main: "Snow", description: "Slight snow", icon: "13d" },
      73: { main: "Snow", description: "Moderate snow", icon: "13d" },
      75: { main: "Snow", description: "Heavy snow", icon: "13d" },
      77: { main: "Snow grains", description: "Snow grains", icon: "13d" },
      80: { main: "Rain showers", description: "Slight rain showers", icon: "09d" },
      81: { main: "Rain showers", description: "Moderate rain showers", icon: "09d" },
      82: { main: "Rain showers", description: "Violent rain showers", icon: "09d" },
      85: { main: "Snow showers", description: "Slight snow showers", icon: "13d" },
      86: { main: "Snow showers", description: "Heavy snow showers", icon: "13d" },
      95: { main: "Thunderstorm", description: "Thunderstorm", icon: "11d" },
      96: { main: "Thunderstorm", description: "Thunderstorm with hail", icon: "11d" },
      99: { main: "Thunderstorm", description: "Thunderstorm with hail", icon: "11d" },
    };
    const weatherCode = weatherCodeMap[current.weathercode] || { main: "Unknown", description: "Unknown", icon: "01d" };
    const currentWeather: WeatherData = {
      city: loc.name,
      country: loc.country,
      temperature: current.temperature,
      feels_like: weatherData.hourly?.apparent_temperature?.[0] ?? current.temperature,
      humidity: weatherData.hourly?.relative_humidity_2m?.[0] ?? 0,
      wind_speed: current.windspeed,
      wind_direction: getWindDirection(current.winddirection),
      description: weatherCode.description,
      main: weatherCode.main,
      icon: weatherCode.icon,
      dt: new Date(current.time).getTime() / 1000,
    };
    // Mapping forecast (next 5 days, 1 per day at noon)
    const forecast: ForecastData[] = [];
    if (weatherData.hourly && weatherData.hourly.time) {
      const times = weatherData.hourly.time;
      for (let i = 0; i < times.length; i++) {
        // Pick one forecast per day at 12:00
        const date = new Date(times[i]);
        if (date.getHours() === 12) {
          const code = weatherData.hourly.weathercode[i];
          const map = weatherCodeMap[code] || { main: "Unknown", description: "Unknown", icon: "01d" };
          forecast.push({
            dt: date.getTime() / 1000,
            temp: weatherData.hourly.temperature_2m[i],
            feels_like: weatherData.hourly.apparent_temperature[i],
            humidity: weatherData.hourly.relative_humidity_2m[i],
            weather: [{ main: map.main, description: map.description, icon: map.icon }],
            main: map.main,
            description: map.description,
            icon: map.icon,
            wind_speed: weatherData.hourly.wind_speed_10m[i],
            pop: weatherData.hourly.precipitation_probability?.[i] ?? 0,
          });
        }
      }
    }
    return { current: currentWeather, forecast, cityInfo };
  } catch (error: any) {
    toast({
      title: "Error fetching weather data",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

// Example cities for comparison feature
export const popularCities = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Dubai",
  "Sydney",
  "Singapore",
  "Rio de Janeiro",
  "Cape Town",
  "Moscow"
];

// Fetch multiple cities' weather in parallel using Open-Meteo-based fetchWeather
export const fetchMultipleCitiesWeather = async (cities: string[]): Promise<WeatherData[]> => {
  const results = await Promise.all(
    cities.map(async (city) => {
      const data = await fetchWeather(city);
      return data ? data.current : null;
    })
  );
  return results.filter(Boolean) as WeatherData[];
};
