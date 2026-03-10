import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Sun, Eye, Gauge, CloudRain } from 'lucide-react';

const DetailCard = ({ icon: Icon, label, value, unit, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className="glass-card flex flex-col items-center justify-center p-4 hover:-translate-y-1 transition-transform"
  >
    <div className="flex items-center space-x-2 text-white/70 mb-2">
      <Icon size={16} />
      <span className="text-sm font-medium uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-2xl font-bold flex items-baseline">
      {value} <span className="text-sm font-normal ml-1 text-white/80">{unit}</span>
    </div>
  </motion.div>
);

const WeatherDetails = ({ data }) => {
  if (!data || !data.current) return null;

  const { current } = data;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-8">
      <h3 className="text-xl font-medium mb-4 px-4 text-white/90">Detail Cuaca</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
        <DetailCard
          icon={Droplets}
          label="Kelembapan"
          value={current.relative_humidity_2m}
          unit="%"
          delay={0.1}
        />
        <DetailCard
          icon={Wind}
          label="Angin"
          value={current.wind_speed_10m}
          unit="km/h"
          delay={0.2}
        />
        <DetailCard
          icon={Sun}
          label="UV Index"
          value={data.hourly?.uv_index?.[0] || '0'}
          unit=""
          delay={0.3}
        />
        <DetailCard
          icon={Gauge}
          label="Tekanan"
          value={current.pressure_msl}
          unit="hPa"
          delay={0.4}
        />
        <DetailCard
          icon={CloudRain}
          label="Curah Hujan"
          value={current.precipitation}
          unit="mm"
          delay={0.5}
        />
        <DetailCard
          icon={Eye}
          label="Jarak Pandang"
          value={(data.hourly?.visibility?.[0] / 1000).toFixed(1) || '0'}
          unit="km"
          delay={0.6}
        />
      </div>
    </div>
  );
};

export default WeatherDetails;
