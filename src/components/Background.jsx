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

      {/* Animated ambient background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-white rounded-full mix-blend-overlay filter blur-3xl"
        />
      </div>
    </div>
  );
};

export default Background;
