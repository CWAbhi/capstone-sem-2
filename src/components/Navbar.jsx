import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WiDaySunny } from 'react-icons/wi';
import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-effect text-white shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
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
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <div className="space-y-2">
              <span className={`block w-8 h-0.5 bg-white transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`block w-8 h-0.5 bg-white transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-8 h-0.5 bg-white transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            {['/', '/forecast', '/maps', '/about'].map((path, index) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={path} 
                  className="hover:text-blue-200 transition-colors duration-300"
                >
                  {path === '/' ? 'Home' : 
                   path === '/maps' ? 'Weather Maps' : 
                   path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div 
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'pb-4' : ''}`}
        >
          <div className="flex flex-col space-y-3">
            {['/', '/forecast', '/maps', '/about'].map((path) => (
              <Link 
                key={path}
                to={path} 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-blue-200 transition-colors duration-300 py-2"
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