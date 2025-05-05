import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { WiHumidity, WiStrongWind, WiThermometer } from 'react-icons/wi';

function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const addToRecentSearches = (cityName) => {
    const updated = [cityName, ...recentSearches.filter(c => c !== cityName)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const fetchWeather = async (searchCity) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=1234567890abcdef1234567890abcdef&units=metric`);
      setWeather(response.data);
      setError('');
      addToRecentSearches(searchCity);
    } catch (err) {
      setError('City not found or error fetching weather data');
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-white"
      >
        Check Current Weather
      </motion.h1>
      
      <motion.form 
        onSubmit={handleSubmit} 
        className="mb-6 sm:mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 p-3 rounded-lg input-glass focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="gradient-button px-6 py-3 rounded-lg font-semibold w-full sm:w-auto">
            Search
          </button>
        </div>
      </motion.form>

      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-300 text-center mb-4"
        >
          {error}
        </motion.div>
      )}

      {weather && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="weather-card rounded-xl p-4 sm:p-6 md:p-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{weather.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <WiThermometer className="text-4xl sm:text-5xl" />
                <p className="text-4xl sm:text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
              </div>
              <p className="text-lg sm:text-xl mt-2 capitalize text-center sm:text-left">{weather.weather[0].description}</p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <WiHumidity className="text-xl sm:text-2xl" />
                <p>Humidity: {weather.main.humidity}%</p>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <WiStrongWind className="text-xl sm:text-2xl" />
                <p>Wind: {weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {recentSearches.length > 0 && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 sm:mt-8"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center sm:text-left">Recent Searches</h3>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {recentSearches.map((searchCity, index) => (
              <motion.button
                key={index}
                onClick={() => fetchWeather(searchCity)}
                className="glass-effect px-3 sm:px-4 py-2 rounded-lg hover:bg-white/20 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {searchCity}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Home;