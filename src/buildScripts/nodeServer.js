"use strict";
/* eslint-disable no-console */
/* eslint-disable import/default */
var chalk = require('chalk');
var app = require('../app'); // This initializes the Express application
var config = require('../../config');

var port = config.port || 5000;
var server = app.listen(port, err => {
  if (err) {
    console.log(chalk.red(err));
  } else {
    console.log(chalk.green('Server listening on port'), chalk.blue(port));
  }
});

module.exports = server;
