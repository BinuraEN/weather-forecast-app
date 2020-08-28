const path = require("path");
const express = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const hbs = require("hbs");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

//define public directory
const publicDirectoryPath = path.join(__dirname, "../public");

//define views path
const viewsPath = path.join(__dirname, "../templates/views");

//define partials path
const partialsPath = path.join(__dirname, "../templates/partials");

//set template engine- handlebars and views path
app.set("view engine", "hbs");
app.set("views", viewsPath);
//setting partials path
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather Info Portal",
		name: "Binura Nugara",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "about page",
		name: "Binura Nugara",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page",
		helpMessage: "Hi! How can we help you",
		name: "Binura Nugara",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			errorMessage: "Please provide an address to fetch weather data",
		});
	}
	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			//pass default object if undefined is passed
			if (error) {
				return res.send({ error });
			}
			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}
				res.send({
					location: location,
					currentWeather: forecastData.current,
					currentTemp: forecastData.current_temp + " degrees",
					weatherTommorow: forecastData.tomorrow,
				});
			});
		}
	);
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		errorMessage: "Help Article Not Found :(",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		errorMessage: "Page Not Found :(",
	});
});

//listen to port
app.listen(3000, () => {
	console.log(`server started on port: 3000`);
});
