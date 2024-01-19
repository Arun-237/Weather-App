const apiKey = '26041174f291c643584290fae03cbded';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const body = document.body; // Reference to the body element

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;

            // Set background image based on temperature
            setBackgroundBasedOnTemperature(data.main.temp);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function setBackgroundBasedOnTemperature(temperature) {
    if (temperature < 10) {
        // Cold temperature background image
        body.style.backgroundImage = 'url("images/cold.jpg")';
    } else if (temperature < 20) {
        // Mild temperature background image
        body.style.backgroundImage = 'url("images/mild.jpg")';
    } else {
        // Warm temperature background image
        body.style.backgroundImage = 'url("images/warm.jpg")';
    }
}
