import {useState} from 'react';
import { getCurrentWeather,
         getcurrentWeatherCoords, 
         getWeatherForecast,
} from './services/weatherAPI';

const API_KEY = 'e68a56b59ab68d4a78751891b7790e6b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const getCurrentWeather= async (city) => {
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`${city} not found! Check the spelling and try again later!`)

            } elseif (response.status === 401) {
                throw new Error('Invalid API keys!')
            } 
        } else{

        }
        const data = await response.json();
        if (!data.dt) {
            data.dt = Math.floor(Date.now()/1000)
        }
        return data;
    } 
    catch(error) {
        if(error instanceof TypeError && error.message.includes("fetch")){
            throw new Error('Please check your internet connection and try again!')
        } 
        throw error
    }
}

export const getCurrentWeatherByCoords= async (lat, lon) => {
    try{
        const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error(`Invalid API keys!`)

            } elseif (response.status === 401) {
                throw new Error('Invalid API keys!')
            } 
        } else{
            throw new Error('Weather service temporarily unavailable.')
        }
        const data = await response.json();
        if (!data.dt) {
            data.dt = Math.floor(Date.now()/1000)
        }
        return data;
    } 
    catch(error) {
        if(error instanceof TypeError && error.message.includes("fetch")){
            throw new Error('Please check your internet connection and try again!')
        } 
        throw error
    }
}

export const getCurrentWeatherForecast= async (lat, lon) => {
    try{
        const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`)
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error(`${city} not found! Check the spelling and try again later!`)

            } elseif (response.status === 401) {
                throw new Error('Invalid API keys!')
            } 
        } else{
            throw new Error('Weather service temporarily unavailable.')
        }
        return await response.json();
    } 
    catch(error) {
        if(error instanceof TypeError && error.message.includes("fetch")){
            throw new Error('Please check your internet connection and try again!')
        } 
        throw error
    }
}

export const SearchCities= async (lat, lon) => {
    try{
        const response = await fetch(`${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`)
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error(`Invalid API keys!`)

            } elseif (response.status === 401) {
                throw new Error('Invalid API keys!')
            } 
        } else{
            throw new Error('Weather service temporarily unavailable.')
        }
        
        const data = await response.json();
        return data.map((city) => ({
            name: city.name,
            lat: city.lat,
            lon: city.lon,
            country: city.country,
            state: city.state || ""
        }))
    } 
    catch(error) {
        if(error instanceof TypeError && error.message.includes("fetch")){
            throw new Error('Please check your internet connection and try again!')
        } 
        throw error
    }
}