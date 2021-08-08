// global variable
var searchHistory = []
var apiKey = 'e76a8c755ca4d99e1a067cbf7bed9cc8'


// create a bootstrap card in js - with same ID for weather results

document.getElementById('temp')
document.getElementById('wind')
document.getElementById('humid')
document.getElementById('uv')
document.getElementById('row')


// create a bootstrap card in js - with same ID for 5 day forcaste
document.getElementById('forecast cards')


// // city elements, name and datte
// var cityName = $()
// var currentDate = $()
// var weatherImg  = $()
// var currentCountry = $()

// dom elements
var searchHistoryContainer = document.querySelector('#history')
var searchInput = document.querySelector('#cityInput')



// api functions starst here

// fetching the api and city weather information
function renderHistory() {
    searchHistoryContainer.innerhtml = ''
    for (let index = searchHistory.length - 1; index >= 0; i--) {
        var btn = document.createElement('button')
        btn.setAttribute('type', 'button')
        btn.classList.add('history-btn', 'btn-history')
        btn.setAttribute('data-search', searchHistory[i])
        btn.textContent = searchHistory[i];
        searchHistoryContainer.append('btn');
    }
}

function appendHistory(search) {
    if (searchHistory.indexOf(search) != -1) {
        return
    }
    searchHistory.push(search)
    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    renderHistory();
}

function initiateSearchHistory() {
    let storeHistory = localStorage.getItem('search-history')
    if (storeHistory) {
        searchHistory = JSON.parse(storeHistory)
    }

    renderHistory()
}

// 



// appending the forecast to the html prowage dynamically  
let displayForecast = $("<div class= 'col-1 border border-primary temp wind humidity uvIndex' 'style='width: 14rem; height: 14rem'>" + 2 + 2 + "</div>")
let displayForecast2 = $("<div class='col-1 border border-primary temp wind humidity uvIndex' 'style='width: 14rem; height: 14rem'>" + 2 + 2 + "</div>")
let displayForecast3 = $("<div class='col-1 border border-primary temp wind humidity uvIndex' 'style='width: 14rem; height: 14rem'>" + 2 + 2 + "</div>")
let displayForecast4 = $("<div class='col-1 border border-primary temp wind humidity uvIndex' 'style='width: 14rem; height: 14rem'>" + 2 + 2 + "</div>")
let displayForecast5 = $("<div class='col-1 border border-primary temp wind humidity uvIndex' 'style='width: 14rem; height: 14rem'>" + 2 + 2 + "</div>")

let fiveDayForecast = [];

fiveDayForecast.push(displayForecast);
fiveDayForecast.push(displayForecast2);
fiveDayForecast.push(displayForecast3);
fiveDayForecast.push(displayForecast4);
fiveDayForecast.push(displayForecast5);

fiveDayForecast.forEach(foreCastCard => {
    $('#cardfc').append(foreCastCard);

});



// integrating the api for two weather forecast 

// geosearch api for cities
$('.search-city').on('click', function () {
            var cityInput = $('#cityInput').val()
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=e76a8c755ca4d99e1a067cbf7bed9cc8')
                .then(response => response.json())
                .then(data => {
                    var longitude = data.coord.lon;
                    console.log(data)
                    console.log(data.name);
                    var latitude = data.coord.lat;

                    console.log(latitude)
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=e76a8c755ca4d99e1a067cbf7bed9cc8`)
                        .then(response => response.json())
                        .then(data => {
                            var calcTemp = Math.round(((parseInt(.temp) - 273.15) * 9) / 5 + 32);
                            $('#temp').text(calcTemp)
                            console.log(data);
                            

                        })
                })
            });

            // one call api 
            // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latCurrent}&lon=${lonCurrent}&appid=e76a8c755ca4d99e1a067cbf7bed9cc8`)
            //     .then(response => response.json())
            //     .then(data => console.log(data))