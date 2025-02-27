import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Droplets, 
  Thermometer, 
  Wind, 
  BarChart, 
  Sun, 
  CloudRain,
  RefreshCw,
  Clock,
  MapPin
} from 'lucide-react';

// Types for our weather data
interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: string;
  rainfall: number;
  uvIndex: number;
  timestamp: string;
}

// Location interface
interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

// Available locations
const locations: Location[] = [
  { id: 'home', name: 'Home Station', latitude: 40.7128, longitude: -74.0060 },
  { id: 'garden', name: 'Garden', latitude: 40.7135, longitude: -74.0046 },
  { id: 'rooftop', name: 'Rooftop', latitude: 40.7120, longitude: -74.0052 },
  { id: 'backyard', name: 'Backyard', latitude: 40.7125, longitude: -74.0065 },
  { id: 'neighborhood', name: 'Neighborhood Park', latitude: 40.7140, longitude: -74.0070 },
];

// Mock data generator to simulate IoT sensor data
const generateMockData = (locationId: string): WeatherData => {
  // Add some variation based on location
  const locationIndex = locations.findIndex(loc => loc.id === locationId);
  const locationFactor = locationIndex * 0.5;
  
  return {
    temperature: parseFloat((Math.random() * 15 + 10 + locationFactor).toFixed(1)),
    humidity: parseFloat((Math.random() * 40 + 30 - locationFactor).toFixed(1)),
    pressure: parseFloat((Math.random() * 20 + 1000).toFixed(1)),
    windSpeed: parseFloat((Math.random() * 15 + locationFactor).toFixed(1)),
    windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
    rainfall: parseFloat((Math.random() * 10 + (locationIndex % 3 === 0 ? 2 : 0)).toFixed(1)),
    uvIndex: Math.floor(Math.random() * 11),
    timestamp: new Date().toISOString()
  };
};

// Component for displaying a single weather metric
const WeatherCard: React.FC<{
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, unit, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <div className={`text-${color} mb-2`}>{icon}</div>
      <h3 className="text-gray-700 font-medium text-lg">{title}</h3>
      <div className="flex items-baseline mt-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="ml-1 text-gray-500">{unit}</span>
      </div>
    </div>
  );
};

// Main weather dashboard component
const WeatherDashboard: React.FC<{ data: WeatherData }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <WeatherCard
        title="Temperature"
        value={data.temperature}
        unit="°C"
        icon={<Thermometer size={32} />}
        color="red-500"
      />
      <WeatherCard
        title="Humidity"
        value={data.humidity}
        unit="%"
        icon={<Droplets size={32} />}
        color="blue-500"
      />
      <WeatherCard
        title="Pressure"
        value={data.pressure}
        unit="hPa"
        icon={<BarChart size={32} />}
        color="purple-500"
      />
      <WeatherCard
        title="Wind"
        value={`${data.windSpeed} (${data.windDirection})`}
        unit="km/h"
        icon={<Wind size={32} />}
        color="teal-500"
      />
      <WeatherCard
        title="Rainfall"
        value={data.rainfall}
        unit="mm"
        icon={<CloudRain size={32} />}
        color="blue-700"
      />
      <WeatherCard
        title="UV Index"
        value={data.uvIndex}
        unit=""
        icon={<Sun size={32} />}
        color="yellow-500"
      />
      <WeatherCard
        title="Last Update"
        value={new Date(data.timestamp).toLocaleTimeString()}
        unit=""
        icon={<Clock size={32} />}
        color="gray-500"
      />
    </div>
  );
};

// Historical data chart (simplified)
const HistoricalChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Historical Data</h3>
      <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
        <p className="text-gray-500">
          [Chart visualization would be implemented here with a charting library]
        </p>
      </div>
    </div>
  );
};

// Weather status component
const WeatherStatus: React.FC<{ data: WeatherData; location: Location }> = ({ data, location }) => {
  // Determine weather status based on data
  let status = "Sunny";
  let icon = <Sun size={48} className="text-yellow-500" />;
  
  if (data.rainfall > 5) {
    status = "Heavy Rain";
    icon = <CloudRain size={48} className="text-blue-700" />;
  } else if (data.rainfall > 0) {
    status = "Light Rain";
    icon = <CloudRain size={48} className="text-blue-500" />;
  } else if (data.humidity > 60) {
    status = "Cloudy";
    icon = <Cloud size={48} className="text-gray-500" />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">{icon}</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{status}</h2>
            <p className="text-gray-600">
              {data.temperature}°C, feels like {(data.temperature - 2 + Math.random() * 4).toFixed(1)}°C
            </p>
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin size={18} className="mr-1" />
          <span>{location.name}</span>
        </div>
      </div>
    </div>
  );
};

// Location selector component
const LocationSelector: React.FC<{
  locations: Location[];
  selectedLocation: string;
  onLocationChange: (locationId: string) => void;
}> = ({ locations, selectedLocation, onLocationChange }) => {
  return (
    <div className="flex items-center mb-4">
      <label htmlFor="location-select" className="mr-2 text-gray-700 font-medium">
        <MapPin size={18} className="inline mr-1" /> Location:
      </label>
      <select
        id="location-select"
        value={selectedLocation}
        onChange={(e) => onLocationChange(e.target.value)}
        className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
};

function App() {
  const [selectedLocation, setSelectedLocation] = useState<string>(locations[0].id);
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [historicalData, setHistoricalData] = useState<Record<string, WeatherData[]>>({});

  const currentLocation = locations.find(loc => loc.id === selectedLocation) || locations[0];
  const currentWeatherData = weatherData[selectedLocation] || generateMockData(selectedLocation);

  // Simulate fetching data from IoT sensors
  const fetchData = (locationId?: string) => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      if (locationId) {
        // Fetch for a specific location
        const newData = generateMockData(locationId);
        setWeatherData(prev => ({
          ...prev,
          [locationId]: newData
        }));
        setHistoricalData(prev => ({
          ...prev,
          [locationId]: [...(prev[locationId] || []), newData].slice(-24) // Keep last 24 readings
        }));
      } else {
        // Fetch for all locations
        const newDataForAllLocations: Record<string, WeatherData> = {};
        const newHistoricalData = { ...historicalData };
        
        locations.forEach(location => {
          const newData = generateMockData(location.id);
          newDataForAllLocations[location.id] = newData;
          
          newHistoricalData[location.id] = [
            ...(newHistoricalData[location.id] || []),
            newData
          ].slice(-24); // Keep last 24 readings
        });
        
        setWeatherData(newDataForAllLocations);
        setHistoricalData(newHistoricalData);
      }
      setLoading(false);
    }, 1000);
  };

  // Handle location change
  const handleLocationChange = (locationId: string) => {
    setSelectedLocation(locationId);
    
    // If we don't have data for this location yet, fetch it
    if (!weatherData[locationId]) {
      fetchData(locationId);
    }
  };

  // Initial data load and periodic updates
  useEffect(() => {
    fetchData(); // Fetch data for all locations initially
    
    const interval = setInterval(() => {
      fetchData(); // Update all locations periodically
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold flex items-center">
            <Cloud className="mr-2" /> IoT Weather Station
          </h1>
          <p className="mt-2 opacity-80">Real-time weather monitoring dashboard</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Current Conditions</h2>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <LocationSelector 
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationChange={handleLocationChange}
            />
            <button 
              onClick={() => fetchData(selectedLocation)}
              disabled={loading}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>

        <WeatherStatus data={currentWeatherData} location={currentLocation} />
        <WeatherDashboard data={currentWeatherData} />
        <HistoricalChart />

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">About This Station</h3>
          <p className="text-gray-600 mb-4">
            This IoT Weather Station dashboard displays real-time weather data collected from various sensors
            at different locations. In a real implementation, this would connect to actual IoT devices via MQTT, 
            WebSockets, or REST APIs.
          </p>
          <p className="text-gray-600">
            Currently showing simulated data for demonstration purposes. The dashboard automatically refreshes every minute,
            or you can manually refresh using the button above. You can also switch between different sensor locations
            to view weather data from multiple points.
          </p>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-6 mt-8">
        <div className="container mx-auto">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} IoT Weather Station Dashboard | Created with React & TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;