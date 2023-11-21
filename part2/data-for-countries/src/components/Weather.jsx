import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		if (capital) {
			// Replace 'YOUR_API_KEY' with your actual API key
			const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
			const url = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

			axios
				.get(url)
				.then((response) => {
					setWeather(response.data);
				})
				.catch((error) => console.error("Error fetching weather data:", error));
		}
	}, [capital]);

	if (!weather) {
		return <div>Loading weather data...</div>;
	}

	return (
		<div className="weather">
			<h2>Weather in {capital}</h2>
			<p>
				<strong>Temperature:</strong> {weather.main.temp}°C
			</p>
			<p>
				<strong>Wind:</strong> {weather.wind.speed} m/s
			</p>
			<img
				src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
				alt={weather.weather[0].description}
			/>
			<p>{weather.weather[0].description}</p>
		</div>
	);
};

export default Weather;
