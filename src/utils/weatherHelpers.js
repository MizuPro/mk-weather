export const getWeatherCondition = (code) => {
  // WMO Weather interpretation codes
  // https://open-meteo.com/en/docs
  const codes = {
    0: { label: 'Cerah', icon: 'Sun', color: 'clear' },
    1: { label: 'Cerah Berawan', icon: 'CloudSun', color: 'clear' },
    2: { label: 'Berawan Sebagian', icon: 'Cloud', color: 'cloudy' },
    3: { label: 'Mendung', icon: 'Cloud', color: 'cloudy' },
    45: { label: 'Berkabut', icon: 'CloudFog', color: 'cloudy' },
    48: { label: 'Kabut Tebal', icon: 'CloudFog', color: 'cloudy' },
    51: { label: 'Gerimis Ringan', icon: 'CloudDrizzle', color: 'rain' },
    53: { label: 'Gerimis Sedang', icon: 'CloudDrizzle', color: 'rain' },
    55: { label: 'Gerimis Lebat', icon: 'CloudDrizzle', color: 'rain' },
    56: { label: 'Gerimis Beku Ringan', icon: 'CloudHail', color: 'rain' },
    57: { label: 'Gerimis Beku Lebat', icon: 'CloudHail', color: 'rain' },
    61: { label: 'Hujan Ringan', icon: 'CloudRain', color: 'rain' },
    63: { label: 'Hujan Sedang', icon: 'CloudRain', color: 'rain' },
    65: { label: 'Hujan Lebat', icon: 'CloudRain', color: 'rain' },
    66: { label: 'Hujan Beku Ringan', icon: 'CloudHail', color: 'rain' },
    67: { label: 'Hujan Beku Lebat', icon: 'CloudHail', color: 'rain' },
    71: { label: 'Salju Ringan', icon: 'CloudSnow', color: 'snow' },
    73: { label: 'Salju Sedang', icon: 'CloudSnow', color: 'snow' },
    75: { label: 'Salju Lebat', icon: 'CloudSnow', color: 'snow' },
    77: { label: 'Butiran Salju', icon: 'CloudSnow', color: 'snow' },
    80: { label: 'Hujan Shower Ringan', icon: 'CloudRain', color: 'rain' },
    81: { label: 'Hujan Shower Sedang', icon: 'CloudRain', color: 'rain' },
    82: { label: 'Hujan Shower Lebat', icon: 'CloudRain', color: 'rain' },
    85: { label: 'Salju Shower Ringan', icon: 'CloudSnow', color: 'snow' },
    86: { label: 'Salju Shower Lebat', icon: 'CloudSnow', color: 'snow' },
    95: { label: 'Badai Petir', icon: 'CloudLightning', color: 'storm' },
    96: { label: 'Badai Petir & Hujan Es Ringan', icon: 'CloudLightning', color: 'storm' },
    99: { label: 'Badai Petir & Hujan Es Lebat', icon: 'CloudLightning', color: 'storm' },
  };

  return codes[code] || { label: 'Tidak Diketahui', icon: 'HelpCircle', color: 'cloudy' };
};

export const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
}
