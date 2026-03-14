import React from 'react';
import { motion } from 'framer-motion';

const SkeletonBase = ({ className }) => (
  <div className={`bg-white/10 animate-pulse rounded-2xl ${className}`} />
);

const WeatherSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full flex flex-col items-center mt-12 mb-16"
    >
      {/* Current Weather Skeleton */}
      <div className="flex flex-col items-center justify-center space-y-4 w-full">
        {/* Location badge */}
        <SkeletonBase className="w-48 h-10 rounded-full" />

        {/* Date */}
        <SkeletonBase className="w-32 h-4" />

        {/* Big Icon */}
        <SkeletonBase className="w-32 h-32 rounded-full mt-4" />

        {/* Big Temperature */}
        <SkeletonBase className="w-48 h-32 mt-4" />

        {/* Condition label */}
        <SkeletonBase className="w-40 h-8 mt-2" />

        {/* Feels like */}
        <SkeletonBase className="w-32 h-4 mt-2" />
      </div>

      <div className="w-full max-w-4xl mx-auto space-y-8 mt-12 px-4">
        {/* Hourly Forecast Skeleton */}
        <div>
          <SkeletonBase className="w-40 h-6 mb-4" />
          <div className="flex overflow-x-hidden space-x-4 pb-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card min-w-[80px] p-4 flex flex-col items-center space-y-4">
                <SkeletonBase className="w-12 h-4" />
                <SkeletonBase className="w-8 h-8 rounded-full" />
                <SkeletonBase className="w-10 h-6" />
              </div>
            ))}
          </div>
        </div>

        {/* Daily Forecast Skeleton */}
        <div>
          <SkeletonBase className="w-40 h-6 mb-4" />
          <div className="glass-card overflow-hidden">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-white/10 last:border-none">
                <SkeletonBase className="w-1/4 h-6" />
                <SkeletonBase className="w-8 h-8 rounded-full" />
                <div className="w-1/4 flex justify-end space-x-4">
                  <SkeletonBase className="w-8 h-6" />
                  <SkeletonBase className="w-8 h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Details Skeleton */}
        <div>
          <SkeletonBase className="w-40 h-6 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card flex flex-col items-center justify-center p-4">
                <SkeletonBase className="w-20 h-4 mb-3" />
                <SkeletonBase className="w-16 h-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherSkeleton;
