import React from 'react';
import { useWeather } from './hooks/useWeather';
import { getWeatherCondition } from './utils/weatherHelpers';
import { motion, AnimatePresence } from 'framer-motion';

import Background from './components/Background';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherSkeleton from './components/WeatherSkeleton';

function App() {
  const { data, locationName, loading, error, fetchWeather, getLocation } = useWeather();

  const handleLocationSelect = (lat, lon, name) => {
    fetchWeather(lat, lon, name);
  };

  const getConditionColor = () => {
    if (!data || !data.current) return 'default';
    const condition = getWeatherCondition(data.current.weather_code);
    return condition.color;
  };

  return (
    <div className="min-h-screen relative font-sans text-white selection:bg-white/30">
      <Background conditionColor={getConditionColor()} />

      <main className="container mx-auto px-4 py-8 max-w-7xl relative z-10 flex flex-col items-center">
        {/* Logo at the top right */}
        <div className="absolute top-4 right-4 z-20">
          <img src="/logo.png" alt="mk-WEATHER Logo" className="w-16 h-16 object-contain rounded-2xl shadow-lg bg-white/10 backdrop-blur-sm p-1 border border-white/20" />
        </div>

        <SearchBar
          onLocationSelect={handleLocationSelect}
          onUseCurrentLocation={getLocation}
        />

        <AnimatePresence mode="wait">
          {loading ? (
            <WeatherSkeleton key="skeleton-loading" />
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center min-h-[60vh]"
            >
              <div className="bg-red-500/20 text-red-100 p-6 rounded-2xl backdrop-blur-md border border-red-500/30 shadow-2xl flex flex-col items-center">
                <svg className="w-12 h-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold mb-2">Terjadi Kesalahan</h2>
                <p className="text-center opacity-80">{error}</p>
                <button
                  onClick={getLocation}
                  className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors font-medium border border-white/20"
                >
                  Coba Lagi
                </button>
              </div>
            </motion.div>
          ) : data ? (
            <motion.div
              key={locationName}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut", staggerChildren: 0.1 }}
              className="w-full flex flex-col"
            >
              <CurrentWeather data={data} locationName={locationName} />

              <div className="w-full max-w-4xl mx-auto space-y-8">
                <HourlyForecast data={data} />
                <DailyForecast data={data} />
                <WeatherDetails data={data} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-white/40 text-sm font-light relative z-10">
        <p>Data provided by <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">Open-Meteo</a></p>
      </footer>
    </div>
  );
}

export default App;
