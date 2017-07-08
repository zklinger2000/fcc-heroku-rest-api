// Environment setup
require('dotenv').config({ silent: true });
// Hold application secrets and config
module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  dbUri: process.env.MONGODB_URI,
  appSecret: process.env.APP_SECRET,
  webAppUrl: process.env.WEB_APP_URL,
  gmail: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  },
  nodemailer: {
    to: 'zack@zklinger.com'
  },
  recaptcha: {
    secretKey: process.env.RECAPTCHA
  },
  google: {
    apiKey: process.env.GOOGLE_API_KEY
  },
  blogger: {
    id: process.env.BLOGGER_ID
  }
};