/* eslint-disable no-console */
const chalk = require('chalk');
require('dotenv').config({ silent: true });

console.log(chalk.green('Starting app in'),
  chalk.blue(process.env.NODE_ENV),
  chalk.green('mode...'));
