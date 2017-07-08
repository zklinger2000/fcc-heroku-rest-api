"use strict";
/* eslint-disable no-console */
/* eslint-disable import/default */
const chalk = require('chalk');
const app = require('../app.js'); // This initializes the Express application
require('dotenv').config({ silent: true });

const port = process.env.PORT || 5000;
const server = app.listen(port, err => {
  if (err) {
    console.log(chalk.red(err));
  } else {
    console.log(chalk.green('Server listening on port'), chalk.blue(port));
  }
});

export default server;
