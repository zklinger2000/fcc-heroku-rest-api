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
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET);
    res.redirect(`${process.env.WEB_APP_URL}/login/return?token=${token}`);
  },

  me: (req, res) => {
    console.log('authorization:\n', req.get('authorization'));
    jwt.verify(req.get('authorization'), process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(400).send(err);
      console.log('decoded:\n', decoded);
      res.status(200).json({ displayName: 'Jon Doe' });
    });
  }
};

export default facebookController;
