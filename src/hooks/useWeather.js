import { useState, useEffect } from 'react';
import { getWeatherData, reverseGeocode } from '../services/weatherService';

export const useWeather = (initialLat = -6.2088, initialLon = 106.8456) => { // Default Jakarta
  const [data, setData] = useState(null);
  const [locationName, setLocationName] = useState('Jakarta, Indonesia');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon, name = null) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherData(lat, lon);

      let locName = name;
      if (!locName) {
        const geoData = await reverseGeocode(lat, lon);
        locName = `${geoData.city || geoData.locality || 'Unknown Location'}, ${geoData.countryName || ''}`;
      }

      setData(weatherData);
      setLocationName(locName);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.warn("Geolocation error:", err.message);
          // Fallback to initial coords if geolocation fails/denied
          fetchWeather(initialLat, initialLon);
        },
        { timeout: 10000 }
      );
    } else {
      // Browser doesn't support geolocation, fallback
      fetchWeather(initialLat, initialLon);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { data, locationName, loading, error, fetchWeather, getLocation };
};
