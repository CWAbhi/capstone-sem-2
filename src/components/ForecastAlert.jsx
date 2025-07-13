import { motion } from 'framer-motion';
import { AlertTriangle, Umbrella, Sun, Snowflake, Wind, Calendar } from 'lucide-react';

function ForecastAlert({ forecast }) {
  if (!forecast || !forecast.list) return null;

  const getWeeklyOverview = (forecastData) => {
    const dailyData = forecastData.list.filter((item, index) => index % 8 === 0);
    
    let weeklyAlerts = [];
    let weeklyTips = [];

    // Analyze the 5-day forecast
    const temps = dailyData.map(day => day.main.temp);
    const conditions = dailyData.map(day => day.weather[0].main.toLowerCase());
    
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const tempRange = maxTemp - minTemp;

    // Temperature variation alert
    if (tempRange > 15) {
      weeklyAlerts.push({
        icon: AlertTriangle,
        message: `Significant temperature variation expected (${Math.round(minTemp)}°C to ${Math.round(maxTemp)}°C). Pack for both warm and cool weather.`,
        color: 'text-orange-600 dark:text-orange-400'
      });
      weeklyTips.push('Layered clothing', 'Light jacket', 'Versatile footwear');
    }

    // Rain frequency
    const rainyDays = conditions.filter(condition => 
      condition.includes('rain') || condition.includes('drizzle')
    ).length;
    
    if (rainyDays >= 3) {
      weeklyAlerts.push({
        icon: Umbrella,
        message: `Rain expected on ${rainyDays} out of 5 days. Pack rain gear for your trip.`,
        color: 'text-blue-600 dark:text-blue-400'
      });
      weeklyTips.push('Waterproof jacket', 'Umbrella', 'Quick-dry clothing', 'Waterproof bag');
    }

    // Cold weather preparation
    if (minTemp < 5) {
      weeklyAlerts.push({
        icon: Snowflake,
        message: 'Cold temperatures expected during your visit. Pack warm clothing.',
        color: 'text-blue-700 dark:text-blue-300'
      });
      weeklyTips.push('Warm coat', 'Gloves', 'Warm hat', 'Thermal underwear');
    }

    // Hot weather preparation
    if (maxTemp > 30) {
      weeklyAlerts.push({
        icon: Sun,
        message: 'Hot weather expected. Stay hydrated and protect yourself from the sun.',
        color: 'text-red-600 dark:text-red-400'
      });
      weeklyTips.push('Sunscreen', 'Hat', 'Sunglasses', 'Light clothing', 'Water bottle');
    }

    // Remove duplicate tips
    weeklyTips = [...new Set(weeklyTips)];

    return { weeklyAlerts, weeklyTips, dailyData };
  };

  const { weeklyAlerts, weeklyTips, dailyData } = getWeeklyOverview(forecast);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8 space-y-6"
    >
      {/* Weekly Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="text-xl text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            5-Day Travel Overview for {forecast.city.name}
          </h3>
        </div>

        {/* Weekly Alerts */}
        {weeklyAlerts.length > 0 && (
          <div className="space-y-3 mb-6">
            {weeklyAlerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border-l-4 border-current"
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

        {/* Packing Suggestions */}
        {weeklyTips.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
              Essential Items for Your Trip
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {weeklyTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-2 rounded-lg text-sm font-medium text-center shadow-md"
                >
                  {tip}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Highlights */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Daily Highlights
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {dailyData.map((day, index) => {
              const date = new Date(day.dt * 1000);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const condition = day.weather[0].main;
              
              let dayColor = 'from-blue-400 to-blue-600';
              if (condition.toLowerCase().includes('rain')) {
                dayColor = 'from-gray-400 to-gray-600';
              } else if (condition.toLowerCase().includes('sun') || condition.toLowerCase().includes('clear')) {
                dayColor = 'from-yellow-400 to-orange-500';
              } else if (condition.toLowerCase().includes('cloud')) {
                dayColor = 'from-gray-300 to-gray-500';
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-gradient-to-br ${dayColor} text-white p-3 rounded-lg text-center text-sm`}
                >
                  <p className="font-semibold">{dayName}</p>
                  <p className="text-lg font-bold">{Math.round(day.main.temp)}°C</p>
                  <p className="text-xs opacity-90">{day.weather[0].description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ForecastAlert;