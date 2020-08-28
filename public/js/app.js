console.log("Client side javascript file is loaded");

// fetch("http://localhost:3000/weather?address=colombo").then((response) => {
// 	response.json().then((data) => {
// 		if (data.error) {
// 			console.log(data.error);
// 		} else {
// 			console.log(data.location);
// 			console.log(data.weatherTommorow);
// 		}
// 	});
// });

const weatherForm = document.querySelector("form");
const search = document.getElementById("address");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const location = search.value;

	if (location == "") {
		document.getElementById("weatherdata").innerHTML =
			"Please enter a location";
	} else {
		fetch(`/weather?address=${location}`).then((response) => {
			response.json().then((data) => {
				if (data.error) {
					console.log("error", data.error);
					document.getElementById("weatherdata").innerHTML =
						"Please Add a valid location";
				} else {
					console.log(data.location);
					console.log(`${data.weatherTommorow} is to be expected tommorrow`);

					document.getElementById(
						"weatherdata"
					).innerHTML = `${data.weatherTommorow} is to be expected tomorrow in ${data.location}`;
				}
			});
		});
	}
});
