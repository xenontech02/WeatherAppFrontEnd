
import React from "react";
import { CityInfoData } from "@/services/weatherService";

interface CityInfoProps {
  info: CityInfoData;
}

const CityInfo: React.FC<CityInfoProps> = ({ info }) => {
  const { name, country, population, sunrise, sunset, timezone } = info;
  
  // Format population with commas
  const formattedPopulation = population.toLocaleString();
  
  // Format sunrise and sunset times
  const formatTime = (timestamp: number) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC"
    });
  };

  const sunriseTime = formatTime(sunrise);
  const sunsetTime = formatTime(sunset);
  
  // Format timezone
  const formatTimezone = (seconds: number) => {
    const hours = seconds / 3600;
    const sign = hours >= 0 ? "+" : "-";
    const absHours = Math.abs(Math.floor(hours));
    const minutes = Math.abs(Math.floor((hours % 1) * 60));
    
    return `GMT${sign}${absHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };
  
  const timezoneFormatted = formatTimezone(timezone);

  return (
    <div className="glass-panel p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">About {name}</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-secondary/30 rounded-lg p-3">
          <p className="text-sm text-muted-foreground">Country</p>
          <p className="font-medium">{country}</p>
        </div>
        
        <div className="bg-secondary/30 rounded-lg p-3">
          <p className="text-sm text-muted-foreground">Population</p>
          <p className="font-medium">{formattedPopulation}</p>
        </div>
        
        <div className="bg-secondary/30 rounded-lg p-3">
          <p className="text-sm text-muted-foreground">Timezone</p>
          <p className="font-medium">{timezoneFormatted}</p>
        </div>
        
        <div className="bg-secondary/30 rounded-lg p-3">
          <p className="text-sm text-muted-foreground">Local Time</p>
          <p className="font-medium animate-pulse-gentle">
            {new Date((Date.now() / 1000 + timezone) * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZone: "UTC"
            })}
          </p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-secondary/30 rounded-lg p-3 flex items-center">
          <div className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-weather-gold">
              <path d="M12 2v8m0 0 4-4m-4 4L8 6" />
              <circle cx="12" cy="14" r="8" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Sunrise</p>
            <p className="font-medium">{sunriseTime}</p>
          </div>
        </div>
        
        <div className="bg-secondary/30 rounded-lg p-3 flex items-center">
          <div className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-weather-gold">
              <path d="M12 10v10m0-10 4 4m-4-4-4 4" />
              <circle cx="12" cy="6" r="4" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Sunset</p>
            <p className="font-medium">{sunsetTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityInfo;
