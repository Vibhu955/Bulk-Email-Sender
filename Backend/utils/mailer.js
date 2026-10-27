const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({ //creates SMTP server connection
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  }
});

module.exports = transporter;
