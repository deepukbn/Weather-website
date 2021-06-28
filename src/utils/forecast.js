const request = require("request");

const forecast = (latitude, longititude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=dd5889101f6863ed74e5a9466802c405&query=" +
    latitude +
    "," +
    longititude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("unable to find the location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ".it is currently " +
          body.current.temperature +
          " it feels like " +
          body.current.feelslike +
          " degree out."
      );
    }
  });
};

module.exports = forecast;
