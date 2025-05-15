import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Forecast() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const fetchForecast = async (searchCity) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=ea0e35a282b730fef857b1fcef36b2fa&units=metric`);
      setForecast(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching forecast data');
      setForecast(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchForecast(city);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">5-Day Weather Forecast</h1>
      
      <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 p-3 rounded-lg input-glass focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="gradient-button px-6 py-3 rounded-lg font-semibold w-full sm:w-auto">
            Get Forecast
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-300 text-center mb-4">{error}</div>
      )}

      {forecast && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {forecast.list.filter((item, index) => index % 8 === 0).map((day, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="weather-card p-4 rounded-lg"
            >
              <div className="text-center">
                <p className="font-bold">{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p className="text-xl sm:text-2xl font-bold my-2">{Math.round(day.main.temp)}°C</p>
                <p className="text-gray-200">{day.weather[0].description}</p>
                <div className="mt-2 text-sm">
                  <p>Humidity: {day.main.humidity}%</p>
                  <p>Wind: {day.wind.speed} m/s</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Forecast;