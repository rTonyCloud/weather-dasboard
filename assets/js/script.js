// global variable
var searchHistory = []
var apiKey = 'e76a8c755ca4d99e1a067cbf7bed9cc8'


 // create a bootstrap card in js - with same ID for weather results

 document.getElementById('temp')
 document.getElementById('wind')
 document.getElementById('humid')
 document.getElementById('uv')


// create a bootstrap card in js - with same ID for 5 day forcaste
document.getElementById('forecast cards')

// dom elements
var searchHistoryContainer = document.querySelector('#history')
var searchInput = document.querySelector('#cityInput')


function renderHistory() {
    searchHistoryContainer.innerhtml=''
    for (let index = searchHistory.length -1; index >= 0; i--) {
            var btn = document.createElement('button')
            btn.setAttribute('type', 'button')
            btn.classList.add('history-btn', 'btn-history')
            btn.setAttribute('data-search', searchHistory[i])
            btn.textContent = searchHistory[i];
            searchHistoryContainer.append('btn');
    }
}

function appendHistory(search) {
    if (searchHistory.indexOf(search) != -1 ) {
        return
    }
    searchHistory.push(search)
    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    renderHistory();
}
    function initiateSearchHistory(){
        let storeHistory = localStorage.getItem('search-history')
        if (storeHistory) {
            searchHistory = JSON.parse(storeHistory)    
        }
        
        renderHistory()
    }


    // create a dom to generate the days on the div 
    // dom create element div
    // dom create element 

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

