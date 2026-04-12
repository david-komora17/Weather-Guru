import React from 'react'

function TemperatureToggle({ unit, onToggle }) {
  return (
    <div className= 'bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 shadow-lg'>
        <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${unit === 'celsius' ? 'bg-white/20 text-blue-600 shadow-lg transform scale-105 text-white/70' 
                                               : 'hover:bg-white/10'}`} onClick={onToggle}>
            celsius
        </button>
        <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 
                          ${unit === 'fahrenheit' ? 'bg-white/20 text-blue-600 shadow-lg transform scale-105 text-white/70' 
                                               : 'hover:bg-white/10'}`}                               
                onClick={onToggle}>
            fahrenheit
        </button>
        
    </div>
  )
}

export default TemperatureToggle