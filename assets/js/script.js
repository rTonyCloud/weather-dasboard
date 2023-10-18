// Global variables
const searchHistory = [];
const apiKey = 'e76a8c755ca4d99e1a067cbf7bed9cc8';

// DOM elements
const searchHistoryContainer = $('#history');
const searchInput = $('#cityInput');

// Function to render search history
function renderHistory() {
  searchHistoryContainer.empty();
  for (let i = searchHistory.length - 1; i >= 0; i--) {
    const btn = $('<button>')
      .attr('type', 'button')
      .addClass('history-btn btn-history')
      .attr('data-search', searchHistory[i])
      .text(searchHistory[i]);
    searchHistoryContainer.append(btn);
  }
}

// Function to append a search to the history
function appendHistory(search) {
  if (!searchHistory.includes(search)) {
    searchHistory.push(search);
    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    renderHistory();
    console.log('Search history updated', searchHistory);
  }
}

// Function to initiate search history
function initiateSearchHistory() {
  const storedHistory = localStorage.getItem('search-history');
  if (storedHistory) {
    searchHistory.push(...JSON.parse(storedHistory));
    renderHistory();
    console.log('Search history loaded from local storage', searchHistory);
  }
}

// Function to fetch weather data and update the UI
function fetchWeather(cityInput) {
  // Display loading message or spinner to indicate that data is being fetched
  // Example: $('#loadingMessage').show();

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      // Extract relevant data and update the UI
      updateUI(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      // Display an error message to the user
    });
}

// Function to update the UI with weather data
function updateUI(data) {
  // Extract and display data
  const longitude = data.coord.lon;
  const latitude = data.coord.lat;
  const cityName = data.name;
  $('#cityCurrent').text(cityName);
  const countryName = data.sys.country;
  $('#country').text(`, ${countryName}`);
  const dateCurrent = data.dt;
  $('#time').text(`, ${dateCurrent}`);

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const inpTemp = Math.round(((parseInt(data.current.temp) - 273.15) * 9) / 5 + 32);
      $('#temp').text(inpTemp);

      const inpWind = Math.round(parseInt(data.current.wind_speed));
      $('#wind').text(inpWind);

      const inpHumid = Math.round(parseInt(data.current.humidity));
      $('#humid').text(inpHumid);

      const inpUVI = Math.round(parseInt(data.current.uvi));
      $('#uvIndex').text(inpUVI);
    })
    .catch((error) => {
      console.error('Error fetching one-call API:', error);
      // Display an error message to the user
    });
}

function renderHistory() {
  // Clear the previous history
  $('#search').empty();
  for (let i = searchHistory.length - 1; i >= 0; i--) {
    const btn = $('<button>')
      .attr('type', 'button')
      .addClass('history-btn btn-history')
      .attr('data-search', searchHistory[i])
      .text(searchHistory[i]);
    $('#search').append(btn);
  }
}

// Event listener for the search button
$('.search').on('click', function () {
  const cityInput = searchInput.val();
  fetchWeather(cityInput);

  // Append the search term to the history
  appendHistory(cityInput);
});

// Event listener for the search button
$('.search').on('click', function () {
  const cityInput = searchInput.val();
  fetchWeather(cityInput);

  // Append the search term to the history
  appendHistory(cityInput);
});

// Event listener for history buttons
searchHistoryContainer.on('click', '.history-btn', function () {
  const cityInput = $(this).data('search');
  searchInput.val(cityInput);
  fetchWeather(cityInput);
});

// Initialize search history
initiateSearchHistory();
