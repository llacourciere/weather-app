const cityFormEl = document.querySelector("#search-form")
const cityInputEl = document.querySelector("#city-name")

const currentWeatherEl = document.querySelector("#curweather-container")
const currentCity = document.querySelector('.current-city')

let tempEl = document.querySelector(".temp")
let humidityEl = document.querySelector(".humidity")
let windEl = document.querySelector(".wind")
let iconEl = document.querySelector('.icon')
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
                displayCurrentWeather(data);
            });
        });
    } else {
        alert("Please enter a City Name")
    }
};

let displayCurrentWeather = (data) => {
    const {temp, humidity} = data.main;
    // set DOM elements from API
    currentCity.textContent = data.name
    tempEl.textContent = temp
    humidityEl.textContent = humidity
    windEl.textContent = data.wind.speed
}



//save to localStorage
let saveCity = () => {
    localStorage.setItem('city', JSON.stringify(cities));
};

cityFormEl.addEventListener("submit", searchCityForm);
