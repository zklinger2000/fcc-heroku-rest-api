const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Express App setup
const app = express();

// Middleware for logging
app.use(morgan('combined'));

// Middleware parses incoming requests into JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.listen((process.env.PORT || 5000));

// Server index page
app.get("/", function (req, res) {
  res.send("Deployed!");
});

// Facebook Webhook
// Used for verification
app.get("/webhook", function (req, res) {
  if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
    console.log("Verified webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Verification failed. The tokens do not match.");
    res.sendStatus(403);
  }
});

module.exports = app;
