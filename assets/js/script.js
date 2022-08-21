var cityFormEl = document.querySelector("#search-form")
var cityInputEl = document.querySelector("#city-name")

var currentWeatherEl = document.querySelector("#curweather-container")
var citySearch = document.querySelector("#city-search")
const API_Key = 'f59572c0b2843a8abecdaa750c6e1f93'

var searchCityForm = (event, city) => {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        cityInputEl.value = "";
        var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_Key}`;
        fetch(apiURL).then(data => data.json()).then(data => {
            let { lat, lon } = data[0];

            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_Key}`;

            fetch(url).then(data => data.json()).then(data => {
                console.log(data);
                var weather = data[0]
                var cWeatherEl = document.createElement('h3')
                cWeatherEl.textContent = weather.name;

                var weatherEl = document.createElement('p');
                weatherEl.textContent = weather.weather;

                currentWeatherEl.appendChild(weather);

                currentWeatherEl.appendChild(cWeatherEl);
            })
        });
    } else {
        alert("Please enter a City Name")
    }
};

var displayCurrentWeather = function (data) {

}












//save to localStorage
var saveCity = function () {
    localStorage.setItem('city', JSON.stringify(cities));
};

cityFormEl.addEventListener("submit", searchCityForm);
