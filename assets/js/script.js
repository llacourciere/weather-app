var cityFormEl = document.querySelector("#search-form")
var cityInputEl = document.querySelector("#city-name")

var currentWeatherEl = document.querySelector("#curweather-container")
var citySearch = document.querySelector("#city-search")
const API_Key = 'f59572c0b2843a8abecdaa750c6e1f93'

var searchCityForm = (event) => {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        cityInputEl.value = "";
        var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_Key}`;
    fetch(apiURL).then(data => data.json()).then(data => {
        let { lat, lon } = data[0];

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_Key}`;

        fetch(url).then(data => data.json()).then(console.log)
    });
    } else {
        alert("Please enter a City Name")
    }
    console.log(event);
};

var displayCurrentWeather = function () { 
   var city = name[i];
   var cWeatherEl = document.createElement('a')
    cWeatherEl.classList = 'list-item flex-row align-center'

    var titleEl = document.createElement('span');
    titleEl.textContent = city;

    cWeatherEl.appendChild(titleEl);

 }












//save to localStorage
var saveCity = function () {
    localStorage.setItem('city', JSON.stringify(cities));
};

cityFormEl.addEventListener("submit", searchCityForm);
