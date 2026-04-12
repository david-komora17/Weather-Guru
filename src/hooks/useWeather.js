import {useEffect, useState} from 'react';
import { getCurrentWeather,
         getcurrentWeatherCoords, 
         getWeatherForecast,
} from '/services/weatherAPI';

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
            const [weatherData, forecast] = await Promise.all([
                getCurrentWeather(city),
                getWeatherForecast(city)
            ]);
            setCurrentWeather(weatherData)
            setForecast(forecast)
        } catch(err) {
            setError(err instanceof Error ? error.message : "Failed to fetch weather data.")
        } finally {
            setLoading(false)
        }
    }

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

                const forecastData = await getWeatherForecast(weatherData.name);
                setForeCast(forecastData)
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