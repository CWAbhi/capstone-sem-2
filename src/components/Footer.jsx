import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="glass-effect bg-white/30 dark:bg-white/10 backdrop-blur-md py-6 sm:py-8 mt-8 sm:mt-12 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0"
        >
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">WeatherApp</h3>
            <p className="text-sm text-white-700 dark:text-white-300">
              Powered by OpenWeatherMap API
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {['Home', 'Forecast', 'Maps', 'About'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 sm:mt-6 text-center text-sm text-white-700 dark:text-white-300"
        >
          <p>&copy; {new Date().getFullYear()} WeatherApp. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
