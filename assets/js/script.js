
// create a bootstrap card in js - with same ID for weather results

document.getElementById('temp')
document.getElementById('wind')
document.getElementById('humid')
document.getElementById('uv')

// create a bootstrap card in js - with same ID for 5 day forcaste
document.getElementById('forecast cards')

// will loop each forecast 
// array.forEach(element => {
    
// });

// create a variable for cities searches
var searchHistory = []



// integrating the api for two weather forecast 

// one call api 
fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=e76a8c755ca4d99e1a067cbf7bed9cc8')     
.then(response => response.json())
.then(data => console.log(data))


// geosearch api for cities
$('.search-city').on('click', function() {
   var cityInput = $('.cityInput').val()
   fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityInput+'&appid=e76a8c755ca4d99e1a067cbf7bed9cc8')
    .then(response => response.json())
    .then(data => console.log(data))
})

// fetch() forcast for 5 days 

// // add local storage
// localStorage.setItem()

// // have a function that will search 
//     search function()

// // append to history 
// append. to search history
