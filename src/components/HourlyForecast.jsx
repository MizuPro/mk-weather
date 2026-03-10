import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { getWeatherCondition, formatTime } from '../utils/weatherHelpers';
import * as Icons from 'lucide-react';

const HourlyForecast = ({ data }) => {
  const scrollRef = useRef(null);

  if (!data || !data.hourly) return null;

  const { time, temperature_2m, weather_code, precipitation_probability } = data.hourly;

  // Get next 24 hours
  const now = new Date();
  const currentHourIndex = time.findIndex(t => new Date(t) > now);
  const startIndex = currentHourIndex > 0 ? currentHourIndex - 1 : 0;
  const next24Hours = Array.from({ length: 24 }).map((_, i) => ({
    time: time[startIndex + i],
    temp: temperature_2m[startIndex + i],
    code: weather_code[startIndex + i],
    precipProb: precipitation_probability[startIndex + i]
  })).filter(item => item.time); // filter out undefined if data is short

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 mb-8 px-4">
      <h3 className="text-xl font-medium mb-4 text-white/90">Prakiraan 24 Jam</h3>
      <motion.div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={scrollRef}
        whileTap={{ cursor: "grabbing" }}
      >
        {next24Hours.map((hour, index) => {
          const condition = getWeatherCondition(hour.code);
          const IconComponent = Icons[condition.icon] || Icons.HelpCircle;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="glass-card min-w-[80px] p-4 flex flex-col items-center justify-between space-y-3 flex-shrink-0"
            >
              <div className="text-sm font-medium text-white/80">
                {index === 0 ? 'Sekarang' : formatTime(hour.time)}
              </div>

              <div className="relative group">
                <IconComponent size={28} className="text-white drop-shadow-md" />
                {hour.precipProb > 0 && (
                   <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-blue-200 font-bold">
                     {hour.precipProb}%
                   </div>
                )}
              </div>

              <div className="text-lg font-bold">
                {Math.round(hour.temp)}°
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HourlyForecast;
