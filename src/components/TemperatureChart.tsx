
import React from "react";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { ForecastData } from "@/services/weatherService";

interface TemperatureChartProps {
  forecast: ForecastData[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ forecast }) => {
  const data = forecast.map((item) => {
    const date = new Date(item.dt * 1000);
    return {
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
      temp: item.temp,
      feels: item.feels_like,
    };
  });

  return (
    <div className="glass-panel p-6 h-72 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Temperature Trend</h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F0C755" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F0C755" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            stroke="#8E9196" 
            fontSize={12} 
            tickLine={false}
            axisLine={{ stroke: "#8E9196", strokeOpacity: 0.2 }}
          />
          <YAxis 
            stroke="#8E9196" 
            fontSize={12} 
            tickLine={false}
            axisLine={{ stroke: "#8E9196", strokeOpacity: 0.2 }}
            tickFormatter={(value) => `${value}°`}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: "rgba(26, 31, 44, 0.8)", 
              borderColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "0.5rem",
              color: "#fff" 
            }}
            itemStyle={{ color: "#F0C755" }}
            formatter={(value: number) => [`${value}°C`]}
            labelStyle={{ color: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#F0C755"
            strokeWidth={3}
            activeDot={{ r: 6, strokeWidth: 0, fill: "#F0C755" }}
            fill="url(#tempGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
