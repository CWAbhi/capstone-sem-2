import { useState } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { WiDaySunny, WiRain, WiStrongWind, WiCloudy } from 'react-icons/wi';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function WeatherMaps() {
  const [mapType, setMapType] = useState('temp_new');
  const apiKey = 'ea0e35a282b730fef857b1fcef36b2fa';

  const mapTypes = [
    { id: 'temp_new', name: 'Temperature', icon: WiDaySunny },
    { id: 'precipitation_new', name: 'Precipitation', icon: WiRain },
    { id: 'wind_new', name: 'Wind Speed', icon: WiStrongWind },
    { id: 'clouds_new', name: 'Clouds', icon: WiCloudy }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true
  };

  const selectedMap = mapTypes.find(type => type.id === mapType);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto text-gray-900 dark:text-white"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Weather Maps
      </motion.h1>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 flex flex-wrap justify-center gap-4"
      >
        {mapTypes.map((type) => {
          const Icon = type.icon;
          return (
            <motion.button
              key={type.id}
              onClick={() => setMapType(type.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                mapType === type.id 
                  ? 'gradient-button text-white' 
                  : 'glass-effect bg-white/30 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/20 text-gray-900 dark:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="text-2xl" />
              {type.name}
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url(${selectedMap.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }}
        />

        <div className="weather-card bg-white dark:bg-gray-900 rounded-xl overflow-hidden relative shadow-lg">
          <Slider {...settings}>
            {[2, 3, 4].map((zoom) => (
              <div key={zoom} className="p-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={`https://tile.openweathermap.org/map/${mapType}/${zoom}/2/2.png?appid=${apiKey}`}
                    alt={`Weather map - ${mapType}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 glass-effect bg-white/30 dark:bg-white/10" />
                </div>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center mt-4"
                >
                  <h3 className="text-xl font-semibold">{selectedMap.name} Map</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-300">Zoom Level: {zoom}</p>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center text-gray-700 dark:text-gray-300"
      >
        <p>Data provided by OpenWeatherMap API. Maps are updated every 3 hours.</p>
      </motion.div>
    </motion.div>
  );
}

export default WeatherMaps;
