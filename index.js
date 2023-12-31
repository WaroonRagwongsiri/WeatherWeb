const weatherForm = document.querySelector('.weather-form');
const cityInput = document.querySelector('.city-input');
const card = document.querySelector('.card');
const apiKeys = "54fe7d9cf49e903965e3dd9dd598d6a4";

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = cityInput.value;

    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeys}&units=metric`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error('Could not fetch weather data');
    }

    return await response.json();
}


function displayWeatherData(data) {
    const {name : city,
            main: {temp,humidity},
            weather: [{description, id}]
            } = data;
    card.textContent = '';
    card.style.display = 'flex';

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmojiDisplay = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature: ${ temp }°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmojiDisplay.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add('city-display');
    tempDisplay.classList.add('temp-display');
    humidityDisplay.classList.add('humidity-display');
    descDisplay.classList.add('desc-display');
    weatherEmojiDisplay.classList.add('weather-emoji-display');

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmojiDisplay);
}

function getWeatherEmoji(weatherID) {
    switch(true){
        case(weatherID >= 200 && weatherID <= 232):
            return '⛈️';
        case(weatherID >= 300 && weatherID <= 321):
            return '🌦️';
        case(weatherID >= 500 && weatherID <= 531):
            return '🌧️';
        case(weatherID >= 600 && weatherID <= 622):
            return '❄️';
        case(weatherID >= 701 && weatherID <= 781):
            return '🌫️';
        case(weatherID === 800):
            return '☀️';
        case(weatherID >= 801 && weatherID <= 804):
            return '☁️';

        default:
            return '❓';
    }
}

function displayError(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('error-display');

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}