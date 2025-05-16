import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WiDaySunny } from 'react-icons/wi';
import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-effect text-white shadow-lg bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-white">
            <WiDaySunny className="text-3xl" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              WeatherApp
            </motion.span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none"
            >
              <div className="space-y-2">
                <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {['/', '/forecast', '/maps', '/about'].map((path, index) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={path} 
                  className="text-gray-800 dark:text-white hover:text-blue-500 transition-colors duration-300"
                >
                  {path === '/' ? 'Home' : 
                  path === '/maps' ? 'Weather Maps' : 
                  path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </motion.div>
            ))}
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <motion.div 
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'pb-4 pt-2' : ''}`}
        >
          <div className="flex flex-col space-y-3">
            {['/', '/forecast', '/maps', '/about'].map((path) => (
              <Link 
                key={path}
                to={path} 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 dark:text-white hover:text-blue-500 transition-colors duration-300 py-2"
              >
                {path === '/' ? 'Home' : 
                path === '/maps' ? 'Weather Maps' : 
                path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
