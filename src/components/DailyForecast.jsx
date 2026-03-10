import React from 'react';
import { motion } from 'framer-motion';
import { getWeatherCondition, formatDate } from '../utils/weatherHelpers';
import * as Icons from 'lucide-react';

const DailyForecast = ({ data }) => {
  if (!data || !data.daily) return null;

  const {
    time,
    weather_code,
    temperature_2m_max,
    temperature_2m_min,
    precipitation_probability_max,
  } = data.daily;

  const days = time.slice(0, 7).map((t, index) => ({
    date: t,
    code: weather_code[index],
    max: temperature_2m_max[index],
    min: temperature_2m_min[index],
    precip: precipitation_probability_max?.[index] || 0,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 mb-16 px-4">
      <h3 className="text-xl font-medium mb-4 text-white/90">Prakiraan 7 Hari</h3>
      <div className="glass-card overflow-hidden">
        {days.map((day, index) => {
          const condition = getWeatherCondition(day.code);
          const IconComponent = Icons[condition.icon] || Icons.HelpCircle;

          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`flex items-center justify-between p-4 ${
                index !== days.length - 1 ? 'border-b border-white/10' : ''
              } hover:bg-white/5 transition-colors`}
            >
              <div className="w-1/3 text-left font-medium">
                {index === 0 ? 'Hari Ini' : formatDate(day.date)}
              </div>

              <div className="w-1/3 flex justify-center items-center space-x-2">
                <IconComponent size={24} className="text-white drop-shadow-sm" />
                {day.precip > 0 && (
                  <span className="text-xs text-blue-300 font-semibold min-w-[30px]">
                    {day.precip}%
                  </span>
                )}
              </div>

              <div className="w-1/3 flex justify-end space-x-4">
                <span className="font-bold">{Math.round(day.max)}°</span>
                <span className="text-white/50">{Math.round(day.min)}°</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
