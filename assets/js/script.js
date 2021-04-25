// function test() {
//     fetch("http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e228b78ea3e006fb5e65400423f51c5f")
//     .then(response => response.json())
//     .then(function(data) {
//         console.log(data);
//     });
// }

// test();


// var cityID = ("6167865")
// var searchCity = ("London");

// placeholderse
var currentTemp = ("80");
var currentHumidity = ("50");
var currentWind = ("15");
var currentUV = ("15");

// end placeholders

// store searched city
var city ="";

var currentCity = $("#current-city");
var searchButton = $("search-button");
var sCity =[]; 

// searches api for city name
function find(findCity) {
    for (var i = 0; i < sCity.length; i++) {
        if(findCity.toUpperCase()===sCity[i]) {
            return -1;
        }
    } return 1;
}

function showWeather(event){
    event.preventDefault();
    if(currentCity.val().trim()!==""){
        cityName=currentCity.val().trim();
        cityWeather(cityName);
    }
}

var key = "24f4583666e8faf4a5e950320d31a142";


function cityWeather(cityName) {
    // var key = "e228b78ea3e006fb5e65400423f51c5f";
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + key)
    .then(function(response) {
       return response.json() })
    .then(function(response) {
        console.log(response);
    
// for myself, check next 2 lines to see if they are needed
    var icon = response.weather[0].icon;
    var iconurl = "https://openweathermap.org/img/wn/"+icon +"@2x.png";

    var date = new Date(response.dt*1000).toLocaleDateString();
    $(currentCity).html(response.name + "("+date+")" + "<img src="+iconurl+">");

    // convert temperature to fahrenheit
    var fahrenheit = (response.main.temp - 273.15) * 1.8 + 32;
        $(currentTemp).html((fahrenheit).toFixed(2)+"&8457");
        // display humidity
        $(currentHumidity).html(response.main.humidity+"%");
        // disdplay windspeed (in mph)
        var wind = response.wind.speed;
        var windmph = (wind*2.237).toFixed(1);
        $(currentWind).html(windmph+"MPH");

        // display uv index
        UVIndex(response.coord.lon,response.coord.lat);
        future(response.id);
        if(response.cod==200) {
            sCity=JSON.parse(localStorage.getItem("cityname"));
            console.log(sCity);
            if (sCity==null) {
                sCity=[];
                sCity.push(cityName.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(sCity));
                addToList(cityName);
            } else {
                if(find(cityName)>0) {
                    sCity.push(cityName.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(sCity));
                    addToList(cityName);
                }
            }
        }
    
   });
}

// return uv index response
function UVIndex(ln, lt) {
    fetch("https://api.openweathermap.org/data/2.5/uvi?appid=" + key+"&lat="+lt+"&lon="+ln)
        .then(function(response) {
            $(currentUV).html(response.value);
            // for me, check if this works
            console.log(response);
        });
}

function future(cityid) {
    
    fetch("https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+key)
        .then(function(response) {
            for (i = 0; i < 5; i++) {
                var date = new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
                var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
                var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";    
                var temp = response.list[((i+1)*8)-1].main.temp;
                var fahrenheit = (((temp - 273.15)*1.8)+ 32).toFixed(2);
                var humidity = response.list[((i+1)*8)-1].main.humidity;

                $("#futureDate"+i).html(date);
                $("#futureTemp"+i).html(fahrenheit+"&#8457");
                $("#futureHumidity"+i).html(humidity+"%");
            }
        });
}

// add city to search history
function addToList(c) {
    var listEl = $("<li>" + c.toUpperCase()+"<li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value", c.toUpperCase());
    $(".list-group").append(listEl);
}


// display past cities searched
function pastSearch(event) {
    var list = event.target;
    if (event.target.matches("li")) {
        cityName = list.textContent.trim();
        cityWeather(cityName);
    }
}

function lastCity() {
    $("ul").empty();
    var sCity = JSON.parse(localStorage.getItem("cityname"));
    if (sCity!==null) {
        sCity = JSON.parse(localStorage.getItem("cityname"));
        for (i = 0; i < sCity.length; i++) {
            addtoList(sCity[i]);
        }
        cityName = sCity[i-1];
        cityWeather(cityName);
    }
}

$("#search-button").on("click", showWeather);
$(document).on("click", pastSearch);
$(window).on("load", lastCity);

// function showWeather(d) {
//     var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);

//     document.getElemendbyID("description").innerHTML = d.weather[0].description;
//     document.getElementById("temp").innerHTML = fahrenheit + "&deg;";
//     document.getElementById("location").innerHTML = d.name;


// };

