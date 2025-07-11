function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">About WeatherApp</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            WeatherApp provides real-time weather information and forecasts for locations worldwide.
            With features like current weather conditions, 5-day forecasts, and interactive weather maps,
            we help you stay informed about weather conditions anywhere on the globe.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Features</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Real-time weather data</li>
            <li>5-day weather forecasts</li>
            <li>Interactive weather maps</li>
            <li>Recent search history</li>
            <li>Responsive design for all devices</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Our Vision</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            To empower individuals with accurate, real-time, and hyperlocal weather information through a simple, intuitive,
            and visually engaging platform — enabling smarter daily decisions and increased weather awareness.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Powered By</h2>
          <p className="text-gray-700 dark:text-gray-300">
            This application uses the OpenWeatherMap API for weather data and forecasts.
            We're grateful for their comprehensive weather data services that make this application possible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Contact</h2>
          <p className="text-gray-700 dark:text-gray-300">
            For support or inquiries, please reach out to us at:
            <br />
            Email: support@weatherapp.com
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
