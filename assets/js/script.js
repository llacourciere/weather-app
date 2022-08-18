var cityFormEl = document.querySelector("#search-form")
var cityInputEl = document.querySelector("#city-name")
var apiKey = 'f59572c0b2843a8abecdaa750c6e1f93'

var searchCity = function () {
    eventpreventDefault();
var apiURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}"
    fetch(apiURL).then(function(response){
        console.log(response);
    })

}