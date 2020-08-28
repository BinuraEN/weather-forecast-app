const axios = require("axios");

const geocode = (address, callback) => {
	const url = `http://api.openweathermap.org/data/2.5/weather?q= ${address}&appid=f06e419028ed6384df69f8c3953de570`;

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
