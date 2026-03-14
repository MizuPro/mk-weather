import React from 'react';

const Background = ({ conditionColor }) => {
  const getBackgroundGradient = (color) => {
    switch (color) {
      case 'clear':
        return 'from-blue-400 to-blue-600';
      case 'cloudy':
        return 'from-gray-400 to-gray-600';
      case 'rain':
        return 'from-slate-700 to-slate-900';
      case 'storm':
        return 'from-gray-900 to-black';
      case 'snow':
        return 'from-blue-100 to-blue-300';
      default:
        return 'from-blue-500 to-indigo-700'; // Default
    }
  };

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div
        key={conditionColor}
        className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient(conditionColor)} transition-colors duration-1000`}
      />

      {/* Animated ambient background elements using CSS instead of framer-motion to reduce GPU/CPU load */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse-slow will-change-transform"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse-slower will-change-transform"
          style={{ animationDelay: '2s' }}
        />
      </div>
    </div>
  );
};

export default Background;
