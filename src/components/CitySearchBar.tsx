
import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CitySearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const CitySearchBar: React.FC<CitySearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    // Focus input on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for any city..."
          className="pl-10 pr-10 h-12 bg-secondary/50 border-secondary/50 focus-visible:ring-weather-gold focus-visible:ring-opacity-50 transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-16 p-1 rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <Button 
          type="submit" 
          className="absolute right-0 bg-weather-gold text-weather-dark-blue hover:bg-weather-gold/90"
          disabled={!query.trim() || isLoading}
        >
          {isLoading ? "Loading..." : "Search"}
        </Button>
      </div>
    </form>
  );
};

export default CitySearchBar;
