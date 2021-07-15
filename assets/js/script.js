// weather API key
var key = "24f4583666e8faf4a5e950320d31a142";

// store searched city
var cityName ="";


var searchedCity = $("#search-city")
// current city
var currentCity = $("#current-city");
var searchButton = $("#search-button");
var currentTemp = document.getElementById("temp");
var currentHumidity = document.getElementById("humidity");
var currentWind = document.getElementById("wind");
var currentUV = document.getElementById("uv");

var sCity =[]; 

// future forecast variables
var date1 = document.getElementById("futureDate1");
var date2 = document.getElementById("futureDate2");
var date3 = document.getElementById("futureDate3");
var date4 = document.getElementById("futureDate4");
var date5 = document.getElementById("futureDate5");

var temp1 = document.getElementById("futureTemp1");
var temp2 = document.getElementById("futureTemp2");
var temp3 = document.getElementById("futureTemp3");
var temp4 = document.getElementById("futureTemp4");
var temp5 = document.getElementById("futureTemp5");

var hum1 = document.getElementById("futureHumidity1");
var hum2 = document.getElementById("futureHumidity2");
var hum3 = document.getElementById("futureHumidity3");
var hum4 = document.getElementById("futureHumidity4");
var hum5 = document.getElementById("futureHumidity5");

var wind1 = document.getElementById("futureWind1");
var wind2 = document.getElementById("futureWind2");
var wind3 = document.getElementById("futureWind3");
var wind4 = document.getElementById("futureWind4");
var wind5 = document.getElementById("futureWind5");



// searches api for city name
function find(findCity) {
    for (var i = 0; i < sCity.length; i++) {
        if(findCity.toUpperCase()===sCity[i]) {
            return -1;
        }
    } return 1;
};

function showWeather(event){
    event.preventDefault();
    if(searchedCity.val().trim()!==""){
        cityName=searchedCity.val().trim();
        cityWeather(cityName);
    }
}


function cityWeather(cityName) {
    console.log(cityName);
   
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key)
    .then(function(response) {
        return response.json() })
     .then(function(response) {
         console.log(response);
           let lt = response.coord.lat;
           let ln = response.coord.lon;
           var icon = response.weather[0].icon;
            var iconurl = "https://openweathermap.org/img/wn/"+icon +"@2x.png";
            $(currentCity).html(response.name + "<img src="+iconurl+">");


    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lt + "&lon=" +ln + "&exclude=hourly&units=imperial&appid=" + key)

    .then(response => response.json())
    .then(data => {
        currentTemp.textContent = data.daily[0].temp.day;
        currentWind.textContent = data.daily[0].wind_speed;
        currentHumidity.textContent = data.daily[0].humidity;
        currentUV.textContent = data.daily[0].uvi;
       
        

        // convert temperature to fahrenheit
        var fahrenheit = (response.main.temp - 273.15) * 1.8 + 32;
             $(currentTemp).html((fahrenheit).toFixed(2)+"&#8457");

            date1.textContent = moment.unix(data.daily[1].dt).format("MM/DD/YYYY");
            temp1.textContent = data.daily[1].temp.day;
             hum1.textContent = data.daily[1].humidity;
             wind1.textContent = data.daily[1].wind_speed;

             date2.textContent = moment.unix(data.daily[2].dt).format("MM/DD/YYYY");
             temp2.textContent = data.daily[2].temp.day;
             hum2.textContent = data.daily[2].humidity;
             wind2.textContent = data.daily[2].wind_speed;

            date3.textContent = moment.unix(data.daily[3].dt).format("MM/DD/YYYY");
             temp3.textContent = data.daily[3].temp.day;
             hum3.textContent = data.daily[3].humidity;
             wind3.textContent = data.daily[3].wind_speed;

            date4.textContent = moment.unix(data.daily[4].dt).format("MM/DD/YYYY");
             temp4.textContent = data.daily[4].temp.day;
             hum4.textContent = data.daily[4].humidity;
             wind4.textContent = data.daily[4].wind_speed;

            date5.textContent = moment.unix(data.daily[5].dt).format("MM/DD/YYYY");
             temp5.textContent = data.daily[5].temp.day;
             hum5.textContent = data.daily[5].humidity;
             wind5.textContent = data.daily[5].wind_speed;

        });
    });
}


localStorage.getItem("sCity");


// display past cities searched
function pastSearch(event) {
    var list = event.target;
    if (event.target.matches("li")) {
        cityName = list.textContent.trim();
        cityWeather(cityName);
    }
}

// search by city
$("#search-button").on("click", showWeather);
$(document).on("click", pastSearch);
$(window).on("load", lastCity);

