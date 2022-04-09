const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const URL =
    "http://api.weatherstack.com/current?access_key=d8742c1800e0cb659e3e4dab628c0701&query=" +
    latitude +
    "," +
    longitude;

  //   console.log(URL);

  request({ url: URL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        weather: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
      });
    }
  });
};

module.exports = forecast;
