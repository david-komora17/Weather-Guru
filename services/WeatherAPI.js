const API_KEY = 'e68a56b59ab68d4a78751891b7790e6b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const getCurrentWeather= async (city) => {
    try{
        const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`)
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`${city} not found! Check the spelling and try again later!`)

            } elseif (response.status === 401) {
                throw new Error('Invalid API keys!')
            } 
        } else{

        }
    } 
    catch(error) {
        if(error instanceof TypeError && error.message.includes("fetch")){
            throw new Error('Please check your internet connection and try again!')
        } else{}
    }
}