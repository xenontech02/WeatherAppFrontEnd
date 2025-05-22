
import React from "react";
import { formatDistanceToNow } from "date-fns";
import WeatherIcon from "./WeatherIcon";
import { WeatherData } from "@/services/weatherService";
import { MapPin, Thermometer, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { 
    city, 
    country, 
    temperature, 
    feels_like, 
    humidity, 
    wind_speed, 
    wind_direction, 
    description, 
    icon,
    dt
  } = data;

  const formattedDate = new Date(dt * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const timeAgo = formatDistanceToNow(new Date(dt * 1000), { addSuffix: true });

  return (
    <div className="glass-panel p-6 w-full animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-weather-gold" />
            <h2 className="text-2xl font-bold">
              {city}, {country}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {formattedDate} • Updated {timeAgo}
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <WeatherIcon iconCode={icon} size={48} className="mr-2" />
            <span className="text-5xl font-bold gold-text">{temperature}°</span>
          </div>
          <p className="capitalize text-center mt-1">{description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center p-3 bg-secondary/30 rounded-lg">
          <Thermometer className="h-5 w-5 text-weather-gold mr-2" />
          <div>
            <p className="text-sm text-muted-foreground">Feels Like</p>
            <p className="font-medium">{feels_like}°C</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-secondary/30 rounded-lg">
          <Wind className="h-5 w-5 text-weather-gold mr-2" />
          <div>
            <p className="text-sm text-muted-foreground">Wind</p>
            <p className="font-medium">{wind_speed} km/h ({wind_direction})</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-secondary/30 rounded-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-weather-gold mr-2"
          >
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
          </svg>
          <div>
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="font-medium">{humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
