import { motion } from 'framer-motion';
import { AlertTriangle, Umbrella, Sun, Snowflake, Wind, Eye, Thermometer } from 'lucide-react';

function WeatherAlert({ weather }) {
  if (!weather) return null;

  const getWeatherAlert = (weatherData) => {
    const temp = weatherData.main.temp;
    const condition = weatherData.weather[0].main.toLowerCase();
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const visibility = weatherData.visibility / 1000; // Convert to km

    let alerts = [];
    let suggestions = [];

    // Temperature-based alerts and suggestions
    if (temp > 35) {
      alerts.push({
        type: 'warning',
        icon: Thermometer,
        message: 'Extreme heat warning! Stay hydrated and avoid prolonged sun exposure.',
        color: 'text-red-600 dark:text-red-400'
      });
      suggestions.push('Sunscreen (SPF 30+)', 'Water bottle', 'Hat or cap', 'Light-colored clothing', 'Sunglasses');
    } else if (temp > 25) {
      alerts.push({
        type: 'info',
        icon: Sun,
        message: 'Warm weather ahead! Perfect for outdoor activities.',
        color: 'text-orange-600 dark:text-orange-400'
      });
      suggestions.push('Sunscreen', 'Water bottle', 'Light clothing', 'Sunglasses');
    } else if (temp < 0) {
      alerts.push({
        type: 'warning',
        icon: Snowflake,
        message: 'Freezing temperatures! Dress warmly and watch for icy conditions.',
        color: 'text-blue-600 dark:text-blue-400'
      });
      suggestions.push('Heavy winter coat', 'Gloves', 'Warm hat', 'Insulated boots', 'Scarf', 'Hand warmers');
    } else if (temp < 10) {
      alerts.push({
        type: 'info',
        icon: Snowflake,
        message: 'Cold weather expected. Layer up to stay comfortable.',
        color: 'text-blue-500 dark:text-blue-300'
      });
      suggestions.push('Warm jacket', 'Long pants', 'Closed shoes', 'Light gloves');
    }

    // Weather condition-based alerts
    if (condition.includes('rain') || condition.includes('drizzle')) {
      alerts.push({
        type: 'warning',
        icon: Umbrella,
        message: 'Rain expected! Don\'t forget your umbrella.',
        color: 'text-blue-600 dark:text-blue-400'
      });
      suggestions.push('Umbrella', 'Waterproof jacket', 'Water-resistant shoes', 'Plastic bag for electronics');
    }

    if (condition.includes('snow')) {
      alerts.push({
        type: 'warning',
        icon: Snowflake,
        message: 'Snow forecast! Drive carefully and dress warmly.',
        color: 'text-blue-700 dark:text-blue-300'
      });
      suggestions.push('Snow boots', 'Warm coat', 'Gloves', 'Hat', 'Ice scraper (if driving)');
    }

    if (condition.includes('thunderstorm')) {
      alerts.push({
        type: 'danger',
        icon: AlertTriangle,
        message: 'Thunderstorm warning! Seek shelter and avoid outdoor activities.',
        color: 'text-red-600 dark:text-red-400'
      });
      suggestions.push('Stay indoors', 'Umbrella', 'Waterproof clothing', 'Portable charger');
    }

    // Wind-based alerts
    if (windSpeed > 10) {
      alerts.push({
        type: 'warning',
        icon: Wind,
        message: 'Strong winds expected! Secure loose items and be cautious.',
        color: 'text-yellow-600 dark:text-yellow-400'
      });
      suggestions.push('Windproof jacket', 'Secure hat', 'Avoid umbrellas');
    }

    // Visibility alerts
    if (visibility < 1) {
      alerts.push({
        type: 'warning',
        icon: Eye,
        message: 'Poor visibility conditions! Drive carefully and use headlights.',
        color: 'text-gray-600 dark:text-gray-400'
      });
    }

    // High humidity
    if (humidity > 80) {
      suggestions.push('Light, breathable clothing', 'Extra water', 'Deodorant');
    }

    // Remove duplicates from suggestions
    suggestions = [...new Set(suggestions)];

    return { alerts, suggestions };
  };

  const { alerts, suggestions } = getWeatherAlert(weather);

  if (alerts.length === 0 && suggestions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-6 space-y-4"
    >
      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Weather Alerts
          </h3>
          {alerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-gray-800 border-l-4 border-current shadow-md"
              >
                <Icon className={`text-xl mt-0.5 ${alert.color}`} />
                <p className={`font-medium ${alert.color}`}>
                  {alert.message}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Travel Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Recommended Items to Carry
          </h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
          >
            {suggestions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium text-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* General Travel Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 p-4 rounded-lg"
      >
        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
          💡 Travel Tip
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Always check the weather forecast before traveling and pack accordingly. 
          Consider downloading offline maps and keeping emergency contacts handy.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default WeatherAlert;