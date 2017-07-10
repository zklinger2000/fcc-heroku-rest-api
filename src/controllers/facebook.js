"use strict";
import jwt from 'jsonwebtoken';
const User = require('../models/User');

const facebookController = {
  webhook: (req, res) => {
    if (req.query['hub.verify_token'] === process.env.VERIFICATION_TOKEN) {
      console.log('Verified webhook');
      console.log(req.query);
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error('Verification failed. The tokens do not match.');
      res.sendStatus(403);
    }
  },

  loginCallback: (req, res) => {
    res.redirect(`${process.env.WEB_APP_URL}/login/return?token=${req.user.token}`);
  },

  me: (req, res) => {
    const token = req.get('authorization');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(500).send(err);
      // console.log('decoded:\n', decoded);
      User.findOne({ _id: decoded._id })
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
    });
  },

  requireAuth: (req, res, next) => {
    const token = req.get('authorization');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(500).send(err);
      User.findOne({ _id: decoded._id })
        .lean()
        .then(user => {
          if (user) {
            req.user = user;
            next();
          } else {
            res.status(401).send('No user found');
          }
        })
        .catch(err => {
          res.status(500).send(err);
        });
    });
  }
};

export default facebookController;
