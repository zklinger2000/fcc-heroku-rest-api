import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

// Express App setup
const app = express();

// Middleware for logging
app.use(morgan('combined'));

// Middleware parses incoming requests into JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Pass in our app to make it available to all routes
routes(app);

export default app;
