
import React from "react";
import { ForecastData } from "@/services/weatherService";
import WeatherIcon from "./WeatherIcon";

interface WeatherForecastProps {
  forecast: ForecastData[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  return (
    <div className="glass-panel p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">7-Day Forecast</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {forecast.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
          const dayDate = date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
          
          return (
            <div 
              key={day.dt} 
              className="bg-secondary/30 rounded-lg p-3 flex flex-col items-center hover:bg-secondary/50 transition-colors"
              style={{ 
                animationDelay: `${index * 50}ms`,
                animation: "fade-in 0.5s ease-out forwards",
                opacity: 0 
              }}
            >
              <p className="font-medium text-sm">{dayName}</p>
              <p className="text-xs text-muted-foreground mb-2">{dayDate}</p>
              
              <WeatherIcon iconCode={day.weather[0].icon} size={32} className="my-2" />
              
              <p className="text-xl font-bold gold-text">{day.temp}°</p>
              <p className="text-xs capitalize text-center mt-1">{day.weather[0].description}</p>
              
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Humidity: {day.humidity}%</p>
                <p>Precipitation: {day.pop}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;
