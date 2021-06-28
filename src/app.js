const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//DEfine paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

// Setup handlebars and view location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather APP",
    name: "Deepu K B",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Deepu K B",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    help: "i am here to help",
    title: "Help",
    name: "Deepu K B",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provid the address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longititude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longititude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    product: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("Error", {
    message: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("Error", {
    message: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port:3000");
});
