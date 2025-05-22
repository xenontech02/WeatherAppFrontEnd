
import React from "react";
import { WeatherData } from "@/services/weatherService";
import WeatherIcon from "./WeatherIcon";

interface CityComparisonProps {
  cities: WeatherData[];
}

const CityComparison: React.FC<CityComparisonProps> = ({ cities }) => {
  if (!cities.length) return null;

  return (
    <div className="glass-panel p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Cities Around the World</h3>
      
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full pb-2">
          <div className="flex space-x-4">
            {cities.map((city, index) => (
              <div
                key={`${city.city}-${index}`}
                className="w-36 shrink-0 bg-secondary/30 rounded-lg p-3 flex flex-col items-center"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: "scale-in 0.3s ease-out forwards",
                  opacity: 0
                }}
              >
                <div className="flex items-center mb-1">
                  <span className="text-xs bg-weather-gold/20 text-weather-gold px-2 py-0.5 rounded-full">
                    {city.country}
                  </span>
                </div>
                <h4 className="font-medium text-sm text-center">{city.city}</h4>
                
                <div className="my-2">
                  <WeatherIcon iconCode={city.icon} size={28} />
                </div>
                
                <p className="text-2xl font-bold gold-text">{city.temperature}°</p>
                <p className="text-xs text-muted-foreground capitalize mt-1">
                  {city.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="relative mt-2">
        <div className="absolute left-0 right-0 bottom-0 h-0.5 overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-r from-weather-gold/0 via-weather-gold to-weather-gold/0 animate-wave"></div>
        </div>
      </div>
    </div>
  );
};

export default CityComparison;
