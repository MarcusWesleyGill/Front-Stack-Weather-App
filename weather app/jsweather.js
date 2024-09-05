// WEATHER APP

const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "e362bb6ac810ae4545d5908cf720778c";

weatherForm.addEventListener("submit" , async event => {

    event.preventDefault();

    const city = cityInput.value; 
    if(city)
    {

        try
        {
            const weatherData = await getWeatherData(city);
        
            displayWeatherInfo(weatherData);

        }
    catch(error){
        console.error(error);
        displayError(error);
    }
    }

    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // api from open weather source

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data)
{
    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]}= data;
    card.textContent="";
    card.style.displau = "flex";
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city
    tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`; // Math to convert temp to F
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji")
  
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
 
}

function getWeatherEmoji(weatherId)
{
    if (weatherId >= 200 && weatherId < 300) {
        return "🌩️"; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
        return "🌦️"; // Drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
        return "🌧️"; // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄️"; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫️"; // Fog
    } else if (weatherId === 800) {
        return "☀️"; 
    } else if (weatherId >= 801 && weatherId <= 804) {
        return "☁️"; 
    }
    return "❓"; 
}

function displayError(message)
{

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}