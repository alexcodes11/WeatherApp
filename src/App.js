import React, { useState, useRef, useEffect } from "react";
import './App.css'
function App(){
  const locationRef = useRef(null)
  const [weatherData, setWeatherData] = useState([{}])
  const script = document.createElement("script");
  let autocomplete;
  

  useEffect(() => {
     fetch("/weather/google")
       .then((response) => response.text())
       .then((data) => {
         script.src = data;
       });
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
    <div className="vh-100" style={{ backgroundColor: "#4B515D" }}>
      <h1>Weather Forecast</h1>

      <div className="Letstry">
        <div className="col-md-5 mx-auto">
          <form className="input-group"  onSubmit={handleSubmit}>
              <input
                className="form-control border-end-0 border rounded-pill"
                id="autocomplete"
                placeholder="Search for a City..."
                ref={locationRef}
                onKeyPress={initAutocomplete}
              />
              <span className="input-group-append">
                <button
                  className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                >
                  <i className="fa fa-search"></i>
                </button>
              </span>
          </form>
        </div>
      </div>

      {typeof weatherData.location === "undefined" ? (
        <div></div>
      ) : (
        <div>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-8 col-lg-6 col-xl-6">
                <div
                  className="card"
                  // style="color: #4B515D; border-radius: 35px;"
                  style={{ color: "#4B515D", borderRadius: 35 }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex">
                      <h6 className="flex-grow-1">
                        {weatherData.location.name},{" "}
                        {weatherData.location.region},{" "}
                        {weatherData.location.country}
                      </h6>
                    </div>

                    <div className="d-flex flex-column text-center mt-5 mb-4">
                      <h6
                        className="display-4 mb-0 font-weight-bold"
                        style={{ color: "#1C2331" }}
                      >
                        {Math.round(weatherData.current.temp_f)}°F
                      </h6>
                      <span className="medium" style={{ color: "#868B94" }}>
                        {weatherData.current.condition.text}
                      </span>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1" style={{ fontSize: 16 }}>
                        <div>
                          <i
                            className="fas fa-fw"
                            style={{ color: "#868B94" }}
                          ></i>
                          <span className="ms-1">
                            Wind: {weatherData.current.wind_mph} mph
                          </span>
                        </div>
                        <div>
                          <i
                            className="fas fa-fw"
                            style={{ color: "#868B94" }}
                          ></i>
                          <span className="ms-1">
                            Humidity: {weatherData.current.humidity}%
                          </span>
                        </div>
                        <div>
                          <i
                            className="fas fa-fw"
                            style={{ color: "#868B94" }}
                          ></i>
                          <span className="ms-1">
                            Feels Like:{" "}
                            {Math.round(weatherData.current.feelslike_f)}°F
                          </span>
                        </div>
                      </div>
                      <div>
                        <img
                          src={weatherData.current.condition.icon}
                          alt="Weather"
                          className="iconwidth"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App