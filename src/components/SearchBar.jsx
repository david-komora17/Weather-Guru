import { MapPin, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { SearchCities } from '../services/WeatherAPI';

function SearchBar(onSearch, onLocationSearch, loading) {
    const [query, setQuery] = useState('');
    const [suggestion, setSuggestion] = useState([]);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    const searchRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if(searchRef.current && !searchRef.current.contain(event.target)) {
                setShowSuggestion(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return() => document.removeEventListener('mousedown', handleClickOutside)

    }, [])

    useEffect(() => {
        const searchTimeOut = setTimeout(() => {
            if (query.length > 2) {
                setSearchLoading(true);
                try {
                    const result = await SearchCities(query);
                    setSuggestion(result)
                    setShowSuggestion(true)
                } catch(err) {
                    console.error('Search failed;', err) 
                } finally {
                    setSearchLoading(false);
                }
            } else {
                setSuggestion([]);
                setShowSuggestion(false);
            }
        }, 300)

        return() => clearTimeout(searchTimeOut)
    }, [query])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim())
            setQuery("")
            setShowSuggestion(false)
        }
    }
    const clearSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setQuery("")
            setSuggestion([])
            setShowSuggestion(false)
        }
    }
    const handleSuggestionsClick = (city) => {
        const cityName = city.name ? `${city.name}, ${city.state}`: city.name;
            onSearch(cityName);
            setQuery("");
            setShowSuggestion(false);
        }
    }

  return 
    <div className='relative w-full max-w-2xl' ref={searchRef}>
        <form className="relative">
            <div className='relative group'>
                <search className='absolute left-4 top-1/2 transform -translate-y-1/2 
                text-white/60 w-5 h-5 group-focus-within:text-white transition-all text-gray/60'/>
                
                <input type="text" 
                className="w-full pl-12 pr-24 py-4 bg-white/10
                backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 
                focus:ring-white/30 focus:border-white/40 transition-all duratino-300 hover:bg-white/15 z-10" 
                disabled = {loading}
                placeholder="search for any city worldwide...."
                onChange={(e) => setQuery(e.target.value)}
                value={query}/>
                
                {query &&(<button className='absolute right-14 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1
                rounded-full hover:bg-white/10 ' onClick={clearSearch}>
                    <X className='w-4 h-4'/>
                </button>)}

                 <button className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1
                rounded-full hover:bg-white/10 ' onClick={onLocationSearch} disabled = {loading}>
                    <MapPin className='w-5 h-5'/>
                </button>
            </div>
        </form>

        { showSuggestion && (suggestion.length > 0 || searchLoading)(<div className='absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl 
        overflow-hidden z-50 '>
            { searchLoading? (<div className='p-6 text-center text-white/70'>
                <div className='animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mx-auto '></div>
                    <p>Search cities...</p>
            </div>
            ) :  (
                suggestion.map((city, index) => {
                    <button className='w-full px-6 py-4 text-left hover:bg-white/10 transition-all duration-200 flex items-center justify-between group border-b
            border-white/10 last:border-b-0 ' key = {`${city.name}- ${city.country}- ${index}`} onClick={() => handleSuggestionsClick(city)}>
                <div className='font-medium text-white group-hover:text-white/90 '>
                {city.name}
                    {city.state && (
                        <span className='text-sm text-white/70'>,{city.state}</span> 
                    )}
                </div>
                <div className='text-sm text-white/60'>,{city.Country}</div>
                <search className='w-4 h-4 text-white/40 group-hover:text-white/60 transition-all'/>
            </button>
                })
            )}

            
        </div>)}
    </div>
  
};

export default SearchBar