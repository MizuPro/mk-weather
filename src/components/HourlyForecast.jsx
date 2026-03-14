import React, { useRef, useEffect, useState } from 'react';
import { getWeatherCondition, formatTime } from '../utils/weatherHelpers';
import * as Icons from 'lucide-react';

const HourlyForecast = ({ data }) => {
  const scrollRef = useRef(null);
  const currentHourRef = useRef(null);

  // States for mouse drag-to-scroll
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // Scroll to the current hour when component mounts
    if (currentHourRef.current && scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const targetElement = currentHourRef.current;

      // Calculate position to center the current hour item
      const containerHalfWidth = scrollContainer.clientWidth / 2;
      const targetHalfWidth = targetElement.clientWidth / 2;
      const scrollPosition = targetElement.offsetLeft - containerHalfWidth + targetHalfWidth;

      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [data]);

  if (!data || !data.hourly) return null;

  const { time, temperature_2m, weather_code, precipitation_probability } = data.hourly;

  // Get today's 24 hours (00:00 to 23:00) using local time from API to avoid UTC timezone issues
  const todayDateString = data.current.time.split('T')[0];
  const todayStartIndex = time.findIndex(t => t.startsWith(todayDateString));

  const todaysHours = Array.from({ length: 24 }).map((_, i) => {
    const idx = todayStartIndex + i;
    return {
      time: time[idx],
      temp: temperature_2m[idx],
      code: weather_code[idx],
      precipProb: precipitation_probability[idx]
    };
  }).filter(item => item.time); // filter out undefined just in case

  const currentHour = new Date().getHours();

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 mb-8 px-4">
      <h3 className="text-lg sm:text-xl font-medium mb-4 text-white/90">Prakiraan Hari Ini</h3>
      <div
        ref={scrollRef}
        className={`flex overflow-x-auto space-x-3 sm:space-x-4 pb-4 no-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} snap-x snap-mandatory`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {todaysHours.map((hour, index) => {
          const condition = getWeatherCondition(hour.code);
          const IconComponent = Icons[condition.icon] || Icons.HelpCircle;

          const isCurrentHour = index === currentHour;

          return (
            <div
              key={index}
              ref={isCurrentHour ? currentHourRef : null}
              className={`glass-card min-w-[70px] sm:min-w-[80px] p-3 sm:p-4 flex flex-col items-center justify-between space-y-3 flex-shrink-0 snap-center animate-fade-in ${isCurrentHour ? 'border-white/50 bg-white/20 scale-105' : ''}`}
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
              <div className={`text-xs sm:text-sm font-medium ${isCurrentHour ? 'text-white' : 'text-white/80'}`}>
                {isCurrentHour ? 'Sekarang' : formatTime(hour.time)}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
