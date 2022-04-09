const geoCode = require("./geocode");
const forecast = require("./forecast");

const weatherTracker = (city, callback) => {
  geoCode(city, (error, locationData) => {
    if (error) {
      callback({
        error,
      });
      return console.log("Error: ", error);
    }

    const { latitude, longitude, location } = locationData;

    forecast(latitude, longitude, (error, { temperature, weather }) => {
      if (error) {
        callback({
          error,
        });
        return console.log("Error: ", error);
      }

      callback({
        location,
        weather,
        temperature,
        error: error,
      });
    });
  });
};

module.exports = weatherTracker;
