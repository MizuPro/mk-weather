import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { getWeatherCondition, formatDate } from '../utils/weatherHelpers';
import * as Icons from 'lucide-react';

const CurrentWeather = ({ data, locationName }) => {
  if (!data || !data.current) return null;

  const current = data.current;
  const condition = getWeatherCondition(current.weather_code);
  const IconComponent = Icons[condition.icon] || Icons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="flex flex-col items-center justify-center mt-12 mb-16 space-y-4"
    >
      <div className="flex items-center space-x-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
        <MapPin size={18} className="text-white/80" />
        <h2 className="text-lg md:text-xl font-medium tracking-wide">{locationName}</h2>
      </div>

      <div className="text-sm font-light text-white/80 tracking-widest uppercase">
        {formatDate(current.time)}
      </div>

      <div className="relative">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <IconComponent size={120} strokeWidth={1} className="drop-shadow-2xl text-white" />
        </motion.div>
      </div>

      <div className="flex flex-col items-center text-center px-4">
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter drop-shadow-lg flex items-start">
          {Math.round(current.temperature_2m)}
          <span className="text-3xl sm:text-4xl md:text-5xl font-normal mt-2">°</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-light mt-2 tracking-wide text-white/90">
          {condition.label}
        </p>
        <p className="text-sm sm:text-md text-white/70 mt-1">
          Terasa seperti {Math.round(current.apparent_temperature)}°
        </p>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;
