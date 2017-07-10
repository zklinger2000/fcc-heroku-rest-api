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
    console.log('authorization:\n', req.get('authorization'));
    const token = req.get('authorization');
    jwt.verify(req.get('authorization'), process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(400).send(err);
      console.log('decoded:\n', decoded);
      // res.status(200).json({ displayName: decoded.displayName });
      User.findOne({ _id: decoded._id })
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
          console.log(err);
          res.status(500).json({ error: err });
        });
    });

  }
};

export default facebookController;
