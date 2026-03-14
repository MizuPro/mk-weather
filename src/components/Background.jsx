import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <AnimatePresence mode="wait">
        <motion.div
          key={conditionColor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient(conditionColor)} transition-colors duration-1000`}
        />
      </AnimatePresence>

      {/* Ambient background elements, using CSS animations for performance instead of framer-motion and heavy blur filters */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full animate-pulse-slow origin-center will-change-transform"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)' }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full animate-pulse-slower origin-center will-change-transform"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)', animationDelay: '2s' }}
        />
      </div>
    </div>
  );
};

export default Background;
