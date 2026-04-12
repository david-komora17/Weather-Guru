import React from 'react'
import {Calendar, Droplets} from 'lucide-react'

function Forecast() {
  return (
    <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8
    shadow-2xl'>
        <div className='flex items-center space-x-3 mb-8'>
            <div className='p-2 bg-white/10 rounded-full'>
                 <Calendar className = 'w-6 h-6 text-white/80' />
            </div>
            <h2 className='text-2xl font-bold text-white'>5 Day forecast</h2>
        </div>
        <div className='space-y-4'>
            <div className='flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm rounded-2xl 
            hover:bg-white/10 transition-all duration-300 group border border-white-10'>
                <div className='flex items-center space-x-5 flex-1'>
                    <div className='text-white/90 group-hover:text-white transition-all transform group-hover:scale-110 
                    duration'>

                    </div>
                    <div className='flex-1'>
                        <div className='text-white font-semibold text-lg'>

                        </div>
                        <div className='text-white/70 text-sm capitalize font-medium'>
                            Weather decription
                        </div>
                    </div>
                </div>
                <div className='flex items-center space-x-6'>
                    <div className='flex items-center space-x-2 text-white/60'>
                        <Droplets className='w-4 h-4 text-blue-300 '/>
                        <span className='text-sm font-medium'></span>
                    </div>

                    <div className='text-right'>
                        <div className='text-white font-bold text-xl'>Temperate</div>
                        <div className='text-white font-bold text-sm font-medium'>Main temp</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Forecast