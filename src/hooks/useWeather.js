import {useEffect, useState} from 'react';
import { getCurrentWeather,
         getCurrentWeatherByCoords, 
         getCurrentWeatherForecast,
} from '../services/WeatherAPI.js';

export const useWeather = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForeCast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [unit, setUnits] = useState('C');

    const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);

    try {
            // 1. Matched names to your imports
            const weatherData = await getCurrentWeather(city);
            
            // 2. OpenWeather Forecast usually needs lat/lon
            const forecastData = await getCurrentWeatherForecast(
                weatherData.coord.lat, 
                weatherData.coord.lon
            );

            setCurrentWeather(weatherData);
            setForeCast(forecastData); // 3. Matched your state setter 'setForeCast'
        } catch(err) {
            setError(err instanceof Error ? err.message : "Failed to fetch weather data.");
        } finally {
            setLoading(false);
        }
    };


    const fetchWeatherByLocation = () => {
        if(!navigator.geolocation) {
            setError('Geolocation isnot supported in this browser');
        }
        setLoading(true)
        setError(null)

        navigator.geolocation.getCurrentPosition( async(position) => {
            try{
                const {latitude, longitude} = position.coords;
                const weatherData = await getCurrentWeatherByCoords(latitude, longitude);
                setCurrentWeather(weatherData)

                const forecastData = await getCurrentWeatherForecast(weatherData.name);
                setForecast(forecastData)
            } catch(err){
                setError(err instanceof Error ? err.message : "Failed to fetch weather data.")
            }
            finally {
                setLoading(false)
            }
        }, (error) => {
            setError('Unable to retrieve your location.');
            setLoading(false)
        }

     )
    }
    const toggleUnit = () => {
        setUnits(unit === 'C' ? 'F' : 'C')
    }
    useEffect(() => {
        fetchWeatherByCity('New york');
    }, []);

    return{currentWeather, 
            forecast, 
            loading, 
            error, 
            unit, 
            fetchWeatherByCity, 
            fetchWeatherByLocation, 
            toggleUnit
        };
};