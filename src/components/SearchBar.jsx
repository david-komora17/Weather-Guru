import { MapPin, X, Search } from 'lucide-react'; // Changed 'search' tag to Lucide Icon
import React, { useEffect, useState, useRef } from 'react';
import { SearchCities } from '../services/WeatherAPI';

function SearchBar({ onSearch, onLocationSearch, loading }) {
    const [query, setQuery] = useState('');
    const [suggestion, setSuggestion] = useState([]);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    const searchRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestion(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const searchTimeOut = setTimeout(async () => { // Marked this specific arrow function as async
            if (query.length > 2) {
                setSearchLoading(true);
                try {
                    const result = await SearchCities(query); // 'await' is now valid here
                    setSuggestion(result);
                    setShowSuggestion(true);
                } catch (err) {
                    console.error('Search failed:', err);
                } finally {
                    setSearchLoading(false);
                }
            } else {
                setSuggestion([]);
                setShowSuggestion(false);
            }
        }, 300);

        return () => clearTimeout(searchTimeOut);
    }, [query]);

    const handleSuggestionsClick = (city) => {
        const cityName = city.state ? `${city.name}, ${city.state}` : city.name;
        onSearch(cityName);
        setQuery("");
        setShowSuggestion(false);
    };

    return (
        <div className='relative w-full max-w-2xl' ref={searchRef}>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <div className='relative group'>
                    <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-white transition-all' />
                    
                    <input 
                        type="text" 
                        className="w-full pl-12 pr-24 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300" 
                        disabled={loading}
                        placeholder="Search for any city worldwide..."
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    
                    {query && (
                        <button className='absolute right-14 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10' onClick={() => setQuery("")}>
                            <X className='w-4 h-4'/>
                        </button>
                    )}

                    <button type="button" className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10' onClick={onLocationSearch} disabled={loading}>
                        <MapPin className='w-5 h-5'/>
                    </button>
                </div>
            </form>

            {showSuggestion && (suggestion.length > 0 || searchLoading) && (
                <div className='absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50'>
                    {searchLoading ? (
                        <div className='p-6 text-center text-white/70'>
                            <div className='animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mx-auto'></div>
                            <p className="mt-2">Searching cities...</p>
                        </div>
                    ) : (
                        suggestion.map((city, index) => (
                            <button 
                                key={`${city.name}-${index}`} 
                                className='w-full px-6 py-4 text-left hover:bg-white/10 transition-all duration-200 flex items-center justify-between group border-b border-white/10 last:border-b-0' 
                                onClick={() => handleSuggestionsClick(city)}
                            >
                                <div className='font-medium text-white'>
                                    {city.name}{city.state && <span className='text-sm text-white/70'>, {city.state}</span>}
                                </div>
                                <div className='text-sm text-white/60'>{city.country}</div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
