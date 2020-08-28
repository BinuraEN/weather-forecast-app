const axios = require("axios");

const forecast = (lat, lon, callback) => {
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=f06e419028ed6384df69f8c3953de570`;

	axios
		.get(url)
		.then(({ data }) => {
			callback(undefined, {
				location: data.timezone,
				current: data.current.weather[0].description,
				current_temp: data.current.temp,
				tomorrow: data.daily[0].weather[0].description,
			});
		})
		.catch((error) => {
			callback(`unable to connect to fetch data => ${error}`, undefined);
		});
};

module.exports = forecast;
