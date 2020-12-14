require('dotenv').config();
const nodemailer = require("nodemailer");

exports.sendEmail = async (email,subject,message)=> {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD_EMAIL, 
    },
  });
  let info = await transporter.sendMail({
    from: 'naoresponda.doacao@gmail.com', // sender address
    to: email, 
    subject:subject, 
    text: message
  });
}