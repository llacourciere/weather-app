const cityFormEl = document.querySelector("#search-form")
const cityInputEl = document.querySelector("#city-name")
let citySearch = document.querySelector("#city-search")

const currentWeatherEl = document.querySelector("#curweather-container")
const currentCity = document.querySelector('.current-city')

let tempEl = document.querySelector(".temp")
let humidityEl = document.querySelector(".humidity")
let windEl = document.querySelector(".wind")
let iconEl = document.querySelector('.icon')

const forecastEl = document.querySelector('.forecast')

const API_Key = 'f59572c0b2843a8abecdaa750c6e1f93'



const searchCityForm = (event) => {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        cityInputEl.value = "";
        var apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_Key}`;
        fetch(apiURL).then(data => data.json()).then(data => {
            let { lat, lon } = data[0];

            let url = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&units=imperial&appid=${API_Key}`;

            fetch(url).then(response => {
                return response.json();
            })
                .then(data => {
                    let forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_Key}`;
                    fetch(forecast).then(response => {
                        return response.json();
                    })
                        .then(data => {
                            d = data;
                            displayCurrentWeather(data);
                            displayFutureWeather(data);
                         
                        })
                    
                });

        });
    } else {
        alert("Please enter a City Name")
    }
};

let displayCurrentWeather = (data) => {
    const { temp, humidity } = data.list[0].main;
    // set DOM elements from API
    currentCity.textContent = `${data.city.name} (${new Date(data.list[0].dt*1000).toDateString()})`;
    currentCity.innerHTML += `<img src="http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png">`;
    tempEl.textContent = temp;
    humidityEl.textContent = humidity;
    windEl.textContent = data.list[0].wind.speed;
}

let displayFutureWeather = (data) => {

    for (let i = 7; i < data.list.length; i=i+7) {
        const {temp, humidity} = data.list[i].main;
       $('.temp-forecast').textContent = temp;
       $('.humidity-forecast').textContent = humidity;
       $('.wind-forecast').textContent = data.list[i].wind.speed;
    }

};

//save to localStorage
let saveCity = () => {
    localStorage.setItem('city', JSON.stringify(cities));
};

cityFormEl.addEventListener("submit", searchCityForm);
