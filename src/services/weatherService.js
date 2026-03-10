import axios from 'axios';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        current: ['temperature_2m', 'relative_humidity_2m', 'apparent_temperature', 'is_day', 'precipitation', 'rain', 'showers', 'snowfall', 'weather_code', 'cloud_cover', 'pressure_msl', 'surface_pressure', 'wind_speed_10m', 'wind_direction_10m', 'wind_gusts_10m'],
        hourly: ['temperature_2m', 'relative_humidity_2m', 'apparent_temperature', 'precipitation_probability', 'precipitation', 'weather_code', 'visibility', 'wind_speed_10m', 'wind_direction_10m', 'uv_index', 'is_day'],
        daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'apparent_temperature_max', 'apparent_temperature_min', 'sunrise', 'sunset', 'uv_index_max', 'precipitation_sum', 'rain_sum', 'showers_sum', 'snowfall_sum', 'precipitation_hours', 'precipitation_probability_max', 'wind_speed_10m_max', 'wind_gusts_10m_max', 'wind_direction_10m_dominant'],
        timezone: 'auto'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const searchLocations = async (query) => {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        name: query,
        count: 5,
        language: 'id',
        format: 'json'
      }
    });
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

export const reverseGeocode = async (lat, lon) => {
  // Using a free reverse geocoding API since Open-Meteo's geocoding is mainly for forward search
  try {
     const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client`, {
        params: {
            latitude: lat,
            longitude: lon,
            localityLanguage: 'id'
        }
     });
     return response.data;
  } catch (error) {
      console.error("Error reverse geocoding:", error);
      return { city: 'Unknown Location', locality: 'Unknown' };
  }
}
