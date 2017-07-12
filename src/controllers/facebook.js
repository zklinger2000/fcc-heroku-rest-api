"use strict";
import jwt from 'jsonwebtoken';
const User = require('../models/User');

const facebookController = {

  loginCallback: (req, res) => {
    res.redirect(`${process.env.WEB_APP_URL}/login/return?token=${req.user.token}`);
  },

  requireAuth: (req, res, next) => {
    const token = req.get('authorization');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err && err.name === 'TokenExpiredError') {
        res.status(401).send('Expired session');
      } else if (err) {
        res.status(500).send(err);
      } else {
        User.findOne({ _id: decoded._id })
          .lean()
          .exec()
          .then(user => {
            if (user) {
              req.user = user;
              req.token = token;
              next();
              return null;
            } else {
              res.status(401).send('No user found');
            }
          })
          .catch(err => {
            res.status(500).send(err);
          });
      }
    });
  },

  me: (req, res) => {
    const authUser = req.user;
    const token = req.token;

    User.findOne({ _id: authUser._id })
      .lean()
      .then(user => {
        // If a user DOES exist, return token and whitelisted user info
        if (user) {
          res.status(200).json({
            token,
            displayName: user.facebook.displayName
          });
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  webhook: (req, res) => {
    if (req.query['hub.verify_token'] === process.env.VERIFICATION_TOKEN) {
      console.log('Verified webhook');
      console.log(req.query);
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error('Verification failed. The tokens do not match.');
      res.sendStatus(403);
    }
  }
};

export default facebookController;
