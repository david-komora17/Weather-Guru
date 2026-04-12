import NoWorkResult_ from "postcss/lib/no-work-result";

export const getWeatherIcon = (weather) => {
    const iconMap = {
        Clear:'Sun',
        Clouds:'Cloud',
        Rain:'Cloudrain',
        Drizzle:'CloudDrizzle',
        Thunderstorm:'cloud lightning',
        Snow:'Cloud snow',
        Mist:'Cloud fog',
        Fog:'Cloud fog',
        Haze:'Cloud fog',
        Dust:'wind',
        Sand:'wind',
        Ash:'wind',
        Squall: 'wind',
        Tornado: 'tornado'
    }
    return iconMap[weather.main] || 'cloud'
};

export const formatTemperature = (temp, unit) => {
    if (unit === 'fahrenheit') {
        return Math.round((temp * 9)/5 + 32)
    }
    return Math.round(temp);

}

export const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en -us', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit'
    });
};
export const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en -us', {
        hour: 'short',
        minute: 'short',
        day: 'numeric'
    });
};

export const getWindDirection = (deg) => {
const directions = 
        ['N',
        'NNE',
        'NE',
        'ENE',
        'E',
        'ESE',
        'SE',
        'SSE',
        'S',
        'SSW',
        'SW',
        'WSW',
        'W',
        'WNW',
        'NW',
        'NNW',];

    return directions[Math.round(deg/22.5) % 16];
};
