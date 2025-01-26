
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");


const API_KEY = 'f308d3be6ce3c8de4fb4d3ae72b7c855';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// function to get the weather! first aysnc fucntion =)

async function fetchWeather(city) {
    try {
      // Build the URL with user input
      const url = `${baseUrl}?q=${city}&units=metric&appid=${API_KEY}`;
      console.log("Fetching weather data from:", url);
        

      // getting api 
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");

        // converting to json 

        const data = await response.json();
        console.log("Weather Data", data);

        updateUi(data);
    } catch (error) {
        console.error("Error fetching data", error);
        alert(error.message);
    }
  }

  
        function updateUi(data) {

                // selecting elments to change once api has given us data

                const cityName = document.getElementById("city-name");
                const weatherDescription = document.getElementById("weather-description");
                const temperature = document.getElementById("temperature");
                const humidity = document.getElementById("humidity");
                const windSpeed = document.getElementById("wind-speed");
                 const weatherIcon = document.querySelector(".weather-icon");



            cityName.textContent = data.name;
            weatherDescription.textContent = data.weather[0].description;
            temperature.innerHTML = `${Math.round(data.main.temp)}&#8451;`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind: ${data.wind.speed} km/h`;

            const iconCode = data.weather[0].icon;
            weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${data.weather[0].description}">`;


        }



// this is to use the api to make the search for the weather

  searchButton.addEventListener("click", () => {
        const city = cityInput.value.trim();

        if (city) {
            fetchWeather(city);
        } else {
            alert("Dont Be Silly!");
        }

  });
