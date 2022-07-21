import React, {useState} from "react";
import './App.css'
function App(){

  const apiKey = "67fc8d84610a4885a6e41256222107";
  const [weatherData, setWeatherData] = useState([{}])
  const [city, SetCity] = useState("")
  const getWeather = (event) =>{
    if (event.key === "Enter"){
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setWeatherData(data);
        });
    }
  }

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter Location..."
        onChange={(e) => SetCity(e.target.value)}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p>
            Welcome to my Weather app! Enter in a City to get the weather
            forcast
          </p>
        </div>
      ) : (
        <div>
          <p>{weatherData.name}</p>
          <p>{Math.round(weatherData.main.temp)}F</p>
          <p>{weatherData.weather[0].main}</p>
        </div>
      )}


    </div>
  );
}
export default App