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
// var cityName = $(cityName)
// var currentDate = $()
// var weatherImg  = $()
// var countryName = $()

// dom elements
var searchHistoryContainer = document.querySelector('#history')
var searchInput = document.querySelector('#cityInput')





// fetching the api and city weather information
function renderHistory() {
    searchHistoryContainer.innerHTML = ''
    for (let index = searchHistory.length - 1; index >= 0; i--) {
        var btn = document.createElement('button')
        btn.setAttribute('type', 'button')
        btn.classList.add('history-btn', 'btn-history')
        btn.setAttribute('data-search', searchHistory[i])
        btn.textContent = searchHistory[i];
        searchHistoryContainer.append('btn');
    }
    console.log("searchHistory", searchHistory)
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
// let displayForecast1 = $("<div class='col-1 border border-primary' id='dayOne'> <p id='temp'>temperature</p>")




// integrating the api for two weather forecast 

// geosearch api for cities
$('.search').on('click', function () {
            var cityInput = $('#cityInput').val()
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=e76a8c755ca4d99e1a067cbf7bed9cc8')
                .then(response => response.json())
                .then(data => {
                    // longitude here
                    let longitude = data.coord.lon;
                    // console.log(data)
                    console.log(data.name);
                    // latitude code below
                    let latitude = data.coord.lat;

                    // city's name 
                    let cityName = data.name;
                    $('#cityCurrent').text(cityName)
                    console.log(data.name)
                    // country's name when user search
                    let countryName =  data.sys.country;
                    $('#country').text(`, ${countryName}`)
                    console.log(data.country)
                    // current date and time when user searches for individual cities.
                    let dateCurrent =  data.dt
                    $('#time').text(`, ${dateCurrent}`)
                    console.log(data.dt)

                    console.log(latitude)
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=e76a8c755ca4d99e1a067cbf7bed9cc8`)
                        .then(response => response.json())
                        .then(data => {
                            let inpTemp= Math.round(((parseInt(data.current.temp) - 273.15) * 9) / 5 + 32);
                            $('#temp').text(inpTemp)
                            
                            let inpWind = Math.round(((parseInt(data.current.wind_speed))));
                            $('#wind').text(inpWind)

                            let inpHumid = Math.round(((parseInt(data.current.humidity))));
                            $('#humid').text(inpHumid)

                            let inpUVI = Math.round(((parseInt(data.current.uvi))));
                            $('#uvIndex').text(inpUVI)
                            console.log(data);
                            

                        })

                        // Dynamically create 
                })
            });

            // one call api 
            // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latCurrent}&lon=${lonCurrent}&appid=e76a8c755ca4d99e1a067cbf7bed9cc8`)
            //     .then(response => response.json())
            //     .then(data => console.log(data))