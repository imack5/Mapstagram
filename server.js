"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource

const knexRoutes = require("./routes/knexqueries");
const usersRoutes = require("./routes/users");
const apikey = require('./apikey.js');
const createMap = require("./routes/newMap")(knex, apikey);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// endpoint for retreiving an individual maps data (map title, map user map pins etc)
app.use("/", knexRoutes(knex))

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

// --------------------
// endpoints for server
// --------------------

//  endpoint for home page
app.get("/", (req, res) => {
  res.render("index")
}

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/maps", createMap);

// Home page
app.get("/viewmap", (req, res) => {
  console.log(apikey.key);
  res.render("viewmap", {
    apiKey: apikey.key
  });

});

// endpoint to view a specific map
app.get("/maps/:mapid", (req, res) => {
  res.render("viewmap", {apiKey: apikey.key,
                         mapid: req.params.mapid
                       })
});
