
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import CitySearchBar from "@/components/CitySearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherForecast from "@/components/WeatherForecast";
import CityComparison from "@/components/CityComparison";
import TemperatureChart from "@/components/TemperatureChart";
import CityInfo from "@/components/CityInfo";
import { 
  fetchWeather, 
  fetchMultipleCitiesWeather, 
  popularCities, 
  WeatherData, 
  ForecastData, 
  CityInfoData 
} from "@/services/weatherService";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [cityInfo, setCityInfo] = useState<CityInfoData | null>(null);
  const [comparisonCities, setComparisonCities] = useState<WeatherData[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const { toast } = useToast();

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    
    try {
      const data = await fetchWeather(city);
      
      if (data) {
        setCurrentWeather(data.current);
        setForecast(data.forecast);
        setCityInfo(data.cityInfo);
        
        // Load comparison cities after main city is loaded
        loadComparisonCities();
        
        if (initialLoad) {
          setInitialLoad(false);
        }
      }
    } catch (error) {
      console.error("Error in search handler:", error);
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try another city.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadComparisonCities = async () => {
    // Get 5 random cities from the popular cities array
    const randomCities = [...popularCities]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    
    const citiesData = await fetchMultipleCitiesWeather(randomCities);
    setComparisonCities(citiesData);
  };

  // Load default city on first render
  useEffect(() => {
    if (initialLoad) {
      handleSearch("Lahore");
      handleSearch("Karachi");
      handleSearch("Islamabad");
      handleSearch("Peshawar");
      handleSearch("Quetta");
      handleSearch("Faisalabad");
      handleSearch("Rawalpindi");
      handleSearch("Madina");
      handleSearch("Yanbu");
    }
  }, [initialLoad]);

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold gold-text">WeatherApp</h1>
            <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString("en-US", { year: "numeric" })}</span>
          </div>
          
          <CitySearchBar onSearch={handleSearch} isLoading={isLoading} />
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="h-12 w-12 border-4 border-weather-gold border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Fetching weather data...</p>
          </div>
        ) : currentWeather ? (
          <main className="space-y-6">
            <CurrentWeather data={currentWeather} />
            
            {cityInfo && <CityInfo info={cityInfo} />}
            
            {forecast.length > 0 && (
              <>
                <WeatherForecast forecast={forecast} />
                <TemperatureChart forecast={forecast} />
              </>
            )}
            
            {comparisonCities.length > 0 && (
              <CityComparison cities={comparisonCities} />
            )}
          </main>
        ) : (
          <div className="glass-panel p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Welcome to XeWeathers</h2>
            <p className="text-muted-foreground mb-6">
              Search for any city to see detailed weather information and forecasts.
            </p>
          </div>
        )}
        
        <footer className="mt-12 text-center text-muted-foreground text-sm">
          <p>WeatherApp Made by Xenon © 2025 | Weather data provided by OnlineFreeAPI</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
