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
    else{
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        {
          types: ["(cities)"],
          fields: ["place_id", "geometry", "name"],
        }
      );
     //   autocomplete.addListener('place_changed', onPlaceChanged)
    }
  }

/*
  const onPlaceChanged = () => {
    var place = window.autocomplete.getPlace();
    if (!place.geometry) {
      document.getElementById("autocomplete").placeholder = "Enter a place";
    } else {
      document.getElementById("details").innerHTML = place.name;
    }
  };
*/

  function handleSubmit(e) {
    e.preventDefault();
     fetch(
       `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
     )
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
         setWeatherData(data);
       }); 
  }


  return (
    <div className="container">
      <div className="input">
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            id="autocomplete"
            placeholder="Enter Location..."
            onChange={(e) => SetCity(e.target.value)}
            onKeyPress={getWeather}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
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