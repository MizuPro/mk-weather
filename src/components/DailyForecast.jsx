import React from 'react';
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
      <h3 className="text-lg sm:text-xl font-medium mb-4 text-white/90">Prakiraan 7 Hari</h3>
      <div className="glass-card overflow-hidden text-sm sm:text-base">
        {days.map((day, index) => {
          const condition = getWeatherCondition(day.code);
          const IconComponent = Icons[condition.icon] || Icons.HelpCircle;

          return (
            <div
              key={day.date}
              className={`flex items-center justify-between p-3 sm:p-4 ${
                index !== days.length - 1 ? 'border-b border-white/10' : ''
              } hover:bg-white/5 transition-colors animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <div className="w-2/5 sm:w-1/3 text-left font-medium truncate">
                {index === 0 ? 'Hari Ini' : formatDate(day.date)}
              </div>

              <div className="w-1/5 sm:w-1/3 flex justify-center items-center space-x-1 sm:space-x-2">
                <IconComponent size={20} className="sm:w-6 sm:h-6 text-white drop-shadow-sm" />
                {day.precip > 0 && (
                  <span className="text-[10px] sm:text-xs text-blue-300 font-semibold min-w-[20px] sm:min-w-[30px]">
                    {day.precip}%
                  </span>
                )}
              </div>

              <div className="w-2/5 sm:w-1/3 flex justify-end space-x-3 sm:space-x-4">
                <span className="font-bold">{Math.round(day.max)}°</span>
                <span className="text-white/50">{Math.round(day.min)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
