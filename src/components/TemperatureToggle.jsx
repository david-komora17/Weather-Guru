import React from 'react'

function TemperatureToggle() {
  return (
    <div className= 'bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 shadow-lg'>
        <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300`}>
            celsius
        </button>
        <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300`}>
            fahrenheit
        </button>
        
    </div>
  )
}

export default TemperatureToggle