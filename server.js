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
const cookieSession = require('cookie-session');

// Seperated Routes for each Resource
const knexRoutes = require("./routes/knexqueries");
const apikey = require('./apikey.js');
const createMap = require("./routes/newMap")(knex, apikey);
const appendUserFeed = require("./routes/appendUserFeedRoutes")


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// Mount all resource routes


// endpoint for retreiving an individual maps data (map title, map user map pins etc)
app.use("/", knexRoutes(knex))

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['session']
}));


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);

});

// Mount all resource routes
app.use("/maps", createMap);

// --------------------
// endpoints for server
// --------------------


// endpoint for home page
app.get("/", (req, res) => {
    res.render("index", {
      apiKey: apikey.key,
    });
})

app.post("/", (req, res) => {
  res.cookie('username', req.body.username)
  res.render("index", {
    apiKey: apikey.key
  });
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.use("/maps", createMap);

app.get("/users/posts/:id", (req, res) => {
  //console.log("sup")
    knex('maps')
      .where('user_id', req.params.id)
      .select('*')
      .then(result => {
        //console.log("result", result);
        res.json(result);
   })

});


app.get("/users/:id", (req, res) => {
  res.render("user_profiles", {userid: req.params.id});
})

app.get("/users/info/:id", (req, res) => {
  console.log("sup")
  knex('users')
  .where('id', req.params.id)
  .select('*')
  .then( result => {
       // console.log("result", result);
        res.json(result);
  })
});


// Home page
app.get("/viewmap", (req, res) => {

});

// endpoint to view a specific map
app.get("/maps/:mapid", (req, res) => {
  res.render("viewmap", {apiKey: apikey.key,
                         mapid: req.params.mapid})

app.post("/maps", (req, res) => {
  console.log(res.body);
});



