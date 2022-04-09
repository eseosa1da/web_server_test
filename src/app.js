const path = require("path");
const express = require("express");
const hbs = require("hbs");

const weatherTracker = require("./utils/weatherTracker");

const app = express();

const port = 3000;

//Define paths for Express config

const publicDir = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

// customized viewes directory

app.set("view engine", "hbs");

app.set("views", viewsPath);

hbs.registerPartials(partialsPath);
// customized viewes directory

//Setup static directory to serve
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Eseosa Otasowie",
    footer: "By Eseosa Otasowie",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Eseosa Otasowie",
    footer: "By Eseosa Otasowie",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text printing",
    footer: "By Eseosa Otasowie",
  });
});

// app.get("/about", (req, res) => {
//   res.send("<div><h1>This is About Node js</h1><p>This is the bomb</p></div>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  weatherTracker(req.query.address, (weatherData) => {
    res.send(weatherData);
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
