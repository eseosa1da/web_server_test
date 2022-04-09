const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const weatherTracker = (city) => {
  geoCode(city, (error, locationData) => {
    if (error) {
      return console.log("Error: ", error);
    }

    const { latitude, longitude, location } = locationData;

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log("Error: ", error);
      }

      const output = {
        location: location,
        weather: forecastData,
      };
      return output;
    });
  });
};


