import React, { useState, useRef } from "react";
import './App.css'
function App(){
  const locationRef = useRef(null)
  const apiKey = "67fc8d84610a4885a6e41256222107";
  const [weatherData, setWeatherData] = useState([{}])
  let autocomplete;

  function initAutocomplete(){
      autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        {
          types: ["(cities)"],
          fields: ["place_id", "geometry", "name", "formatted_address"],
        }
      );
          autocomplete.addListener('place_changed', onPlaceChanged)
    }

  function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      document.getElementById("autocomplete").placeholder = "Enter a City";
    } else {
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${place.formatted_address}&aqi=no`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        }); 
  }}


  function handleSubmit (e) {
      e.preventDefault();
     fetch(
       `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationRef.current.value}&aqi=no`
     )
       .then((response) => response.json())
       .then((data) => {
         setWeatherData(data);
       }); 
  }


  return (
    <div className="container">
      <div className="input">
        <form id="form" onSubmit={handleSubmit}>
          <input
            className="input"
            id="autocomplete"
            placeholder="Enter a City..."
            ref={locationRef}
            onKeyPress={initAutocomplete}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      {typeof weatherData.location === "undefined" ? (
        <div>
          <p>
            Welcome to my Weather app! Enter in a City to get the weather
            forcast
          </p>
        </div>
      ) : (
        <div>
          <p>{weatherData.location.name}</p>
          <p>{Math.round(weatherData.current.temp_f)}F</p>
        </div>
      )}


    </div>
  );
}
export default App