document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById("go");
    const weatherIcon = document.getElementById('weatherIcon');
    const resultDiv = document.getElementById('result');
    const bg = document.getElementById('bgbg'); 

    searchButton.addEventListener('click', function () {
        const searchElement = document.getElementById('searching').value.trim();
        const what = document.getElementById('what');

        if (!searchElement) {
            alert("Please enter a city.");
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchElement}&appid=36395fb8b0138a124a18337684146731`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found!");
                }
                return response.json();
            })
            .then(data => {
                
                resultDiv.classList.remove('hidden');

                
                document.getElementById('degree').querySelector('h1').textContent = `${Math.round(data.main.temp - 273.15)}°C`;
                document.getElementById('place').querySelector('h1').textContent = data.name;

                const weatherDescription = data.weather[0].description;
                const capitalizedDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
                what.textContent = capitalizedDescription;

                const now = new Date();
                const options = { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric', 
                    second: 'numeric' 
                };
                const formattedDateTime = now.toLocaleString('en-US', options);
                document.getElementById('place').querySelector('p').textContent = formattedDateTime;

                document.getElementById('tempMax').textContent = `${Math.round(data.main.temp_max - 273.15)}°C`;
                document.getElementById('tempMin').textContent = `${Math.round(data.main.temp_min - 273.15)}°C`;
                document.getElementById('humidity').textContent = `${data.main.humidity}%`;
                document.getElementById('cloudiness').textContent = `${data.clouds.all}%`;
                document.getElementById('wind').textContent = `${data.wind.speed} km/h`;

                const currentTime = Math.floor(Date.now() / 1000); 
                const sunrise = data.sys.sunrise; 
                const sunset = data.sys.sunset;   
                const isDay = currentTime >= sunrise && currentTime <= sunset;

                
                const weather = data.weather[0].main.toLowerCase();
                let imageName = isDay ? 'clear-day.png' : 'clear-night.png';
                let bgImage = isDay ? "bgweather/clearday.jpeg" : "bgweather/clearnight.jpeg";

                if (weather.includes('cloud')) {
                    imageName = 'cloudy.png';
                    bgImage = "bgweather/cloudy.jpeg";
                } else if (weather.includes('rain')) {
                    imageName = 'rainy.png';
                    bgImage = "bgweather/rainy.jpeg";
                } else if (weather.includes('fog')) {
                    imageName = 'fog.png';
                    bgImage = "bgweather/fog.jpeg";
                } else if (weather.includes('thunderstorm')) {
                    imageName = 'thunder.png';
                    bgImage = "bgweather/thunder.jpeg";
                } else if (weather.includes('snow')) {
                    imageName = 'snow.png';
                    bgImage = "bgweather/snow.jpeg";
                } else if (weather.includes('clear')) {
                    imageName = isDay ? 'clear-day.png' : 'clear-night.png';
                    bgImage = isDay ? "bgweather/clearday.jpeg" : "bgweather/clearnight.jpeg";
                }

                weatherIcon.src = `images/${imageName}`;
                bg.style.backgroundImage = `url('${bgImage}')`;
                weatherIcon.style.display = 'block';
            })
            .catch(error => {
                alert(error.message || "An error occurred. Please try again later.");
                resultDiv.classList.add('hidden'); 
                weatherIcon.style.display = 'none';
                bg.style.backgroundImage = ''; 
            });
    });
});
