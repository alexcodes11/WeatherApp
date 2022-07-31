import React, { useState, useRef, useEffect } from "react";
import './App.css'
function App(){
  const locationRef = useRef(null)
  const [weatherData, setWeatherData] = useState([{}])
  let autocomplete;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places&callback=initAutocomplete`;
    script.async = true;
    document.body.appendChild(script);

  }, []);


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
        `/weather?q=${place.formatted_address}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        }); 
  }}


  function handleSubmit (e) {
      e.preventDefault();
     fetch(`/weather?q=${locationRef.current.value}`)
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