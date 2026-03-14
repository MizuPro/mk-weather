import React, { useState, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { searchLocations } from '../services/weatherService';

const SearchBar = ({ onLocationSelect, onUseCurrentLocation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length > 2) {
        try {
          const res = await searchLocations(query);
          setResults(res);
          setShowDropdown(true);
        } catch (error) {
          console.error("Search error", error);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 500); // Debounce

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (loc) => {
    const name = `${loc.name}, ${loc.country}`;
    onLocationSelect(loc.latitude, loc.longitude, name);
    setQuery('');
    setShowDropdown(false);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
  }

  return (
    <div className="relative w-full max-w-md mx-auto z-50">
      <div
        className="glass-card flex items-center p-2 mt-6 animate-fade-up"
      >
        <Search size={20} className="text-white/70 ml-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari kota..."
          className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder-white/50"
          onFocus={() => query.length > 2 && setShowDropdown(true)}
        />
        {query && (
          <button onClick={handleClear} className="p-2 hover:bg-white/10 rounded-full transition-colors mr-1">
            <X size={16} className="text-white/70" />
          </button>
        )}
        <button
          onClick={onUseCurrentLocation}
          className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all flex items-center justify-center space-x-2 group whitespace-nowrap"
          title="Kembali ke Lokasi Sendiri"
        >
          <MapPin size={18} className="text-white group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-white hidden sm:block">Lokasi Saya</span>
        </button>
      </div>

      {showDropdown && results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden max-h-60 overflow-y-auto no-scrollbar animate-fade-up"
        >
          {results.map((loc, index) => (
            <button
                key={`${loc.id}-${index}`}
                onClick={() => handleSelect(loc)}
                className="w-full text-left px-4 py-3 hover:bg-white/20 transition-colors border-b border-white/10 last:border-none flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{loc.name}</div>
                <div className="text-sm text-white/70">{loc.admin1 ? `${loc.admin1}, ` : ''}{loc.country}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
