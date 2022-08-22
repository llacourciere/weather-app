const cityFormEl = document.querySelector("#search-form")
const cityInputEl = document.querySelector("#city-name")

const currentWeatherEl = document.querySelector("#curweather-container")
let tempEl = document.querySelector(".temp")
let humidityEl = document.querySelector(".humidity")
let windEl = document.querySelector(".wind")

let citySearch = document.querySelector("#city-search")
const API_Key = 'f59572c0b2843a8abecdaa750c6e1f93'

const searchCityForm = (event) => {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        cityInputEl.value = "";
        var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_Key}`;
        fetch(apiURL).then(data => data.json()).then(data => {
            let { lat, lon } = data[0];

            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_Key}`;

            fetch(url).then(response => {
                return response.json();})
                .then(data => {
                console.log(data);
                const {temperature, humidty} = data.main;
                // set DOM elements from API
                tempEl.textContent = data.main.temp
                humidityEl.textContent = data.main.humidity
                windEl.textContent = data.wind.speed

            });
        });
    } else {
        alert("Please enter a City Name")
    }
};

// var addCurrentWeatherEl = function (data) {
// var weather = data[0]
//                 var cWeatherEl = document.createElement('h3')
//                 cWeatherEl.textContent = weather.main.temp;

//                 currentWeatherEl.appendChild(cWeatherEl);

//                 var weatherEl = document.createElement('li');
//                 weatherEl.textContent = weather.weather;

//                 currentWeatherEl.appendChild(weatherEl);

//}










//save to localStorage
var saveCity = function () {
    localStorage.setItem('city', JSON.stringify(cities));
};

cityFormEl.addEventListener("submit", searchCityForm);
