const axios = require("axios");
const apiKey = require("./config/keys");

const geocode = (address, callback) => {
	const url = `http://api.openweathermap.org/data/2.5/weather?q= ${address}&appid=${apiKey.apiKey}`;

	axios
		.get(url)
		.then(({ data }) => {
			callback(undefined, {
				latitude: data.coord.lat,
				longitude: data.coord.lon,
				location: data.name,
			});
		})
		.catch((error) => {
			callback(`unable to connect to services => ${error}`, undefined);
		});
};

module.exports = geocode;
