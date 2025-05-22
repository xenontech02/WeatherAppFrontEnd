
import React from "react";
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Moon, 
  CloudSnow, 
  CloudFog, 
  CloudLightning, 
  Cloud
} from "lucide-react";

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, size = 24, className = "" }) => {
  // OpenWeatherMap icon codes: https://openweathermap.org/weather-conditions
  // Map icon codes to Lucide icons
  const getIcon = () => {
    switch (iconCode) {
      case "01d": // clear sky day
        return <Sun size={size} className={`text-weather-gold ${className}`} />;
      case "01n": // clear sky night
        return <Moon size={size} className={`text-weather-gold ${className}`} />;
      case "02d": // few clouds day
      case "03d": // scattered clouds day
      case "04d": // broken clouds day
        return <CloudSun size={size} className={className} />;
      case "02n": // few clouds night
      case "03n": // scattered clouds night
      case "04n": // broken clouds night
        return <Cloud size={size} className={className} />;
      case "09d": // shower rain day
      case "09n": // shower rain night
      case "10d": // rain day
      case "10n": // rain night
        return <CloudRain size={size} className={className} />;
      case "11d": // thunderstorm day
      case "11n": // thunderstorm night
        return <CloudLightning size={size} className={className} />;
      case "13d": // snow day
      case "13n": // snow night
        return <CloudSnow size={size} className={className} />;
      case "50d": // mist day
      case "50n": // mist night
        return <CloudFog size={size} className={className} />;
      default:
        return <Sun size={size} className={`text-weather-gold ${className}`} />;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;
