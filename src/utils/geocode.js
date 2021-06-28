const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZGVlcHU0NzE5OTkiLCJhIjoiY2txZGU5dWZkMDQzYjJ3bWxxamxtM2Q5MyJ9.IY6kHaDHCS9KB6BSKsQ8EQ&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.length === 0) {
      callback("unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longititude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
