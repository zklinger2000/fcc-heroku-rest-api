"use strict";

const routes = (app) => {
  //================
  // Sample Routes
  //================

  // This is a GET route that is open to the world
  app.get('/noauth', function(req, res) {
    res.send({ message: 'no authorization required' });
  });

  // Server index page
  app.get('/', function (req, res) {
    res.send('Deployed!');
  });

  //===================
  // Facebook Webhook
  //===================
  app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === process.env.VERIFICATION_TOKEN) {
      console.log('Verified webhook');
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error('Verification failed. The tokens do not match.');
      res.sendStatus(403);
    }
  });
};

export default routes;
