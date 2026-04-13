 # SkyCast: Modern Weather Dashboard
A high-performance, responsive weather application built with React and Tailwind CSS. SkyCast provides real-time meteorological data and a 5-day forecast using the OpenWeather API, featuring a sleek, frosted-glass interface.

## Key Features
Real-Time Insights: Instant access to temperature, "feels like" conditions, humidity, wind speed, and visibility.
Smart 5-Day Forecast: Condenses 40+ data points from the API into a clean, daily 5-day outlook using custom logic.
Auto-Suggest City Search: Intelligent type-ahead search fetching city names, states, and countries as you type.
Geolocation Integration: One-click weather updates for your exact location using the browser's Native Geolocation API.
Dynamic Visuals: Weather-aware icon mapping (icons change automatically for Sun, Clouds, Rain, etc.).
Unit Toggle: Seamless switching between Celsius (°C) and Fahrenheit (°F) with real-world conversion.
## Tech Stack
Framework: React (Hooks & Custom Hooks)
Styling: Tailwind CSS (Glassmorphism & Responsive Design)
Icons: Lucide React
API: OpenWeatherMap
Build Tool: Vite
## Project Architecture
text
<code>
src/
├── components/          # UI Components (SearchBar, WeatherCard, Forecast)
├── hooks/               # Custom Logic (useWeather hook for API state)
├── services/            # API Service layer (WeatherAPI.js)
├── utils/               # Helper functions (Formatting & Temp conversion)
└── App.jsx              # Main Application Entry Point
Use code with caution.
</code>

## Technical Highlights
1. Daily Data Reduction
The OpenWeather API returns 40 forecast points (one every 3 hours). To show a clean 5-day view, I implemented a .reduce() function to group these into unique days and .slice(0, 5) to display exactly five.
2. Debounced Search
To prevent excessive API calls, the SearchBar uses a setTimeout inside a useEffect. This ensures city suggestions are only fetched after the user stops typing for 300ms.
3. Coordinate-First Accuracy
The app fetches current weather first to get exact GPS coordinates (lat, lon), which are then used to fetch the hyper-local 5-day forecast.
 ### Installation
1 **Clone the Repo**
bash
<code   >
git clone https://github.com
Use code with caution.
</code>

2 **Install Packages**
bash
<code>
npm install
Use code with caution.
</code>

3 **Run Development Server**
bash
<code>
npm run dev
Use code with caution.
</code>


* **Developed for educational purposes using React & Tailwind CSS.** *