import { env } from "./env.js";
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: env("SMTP_HOST"),
  port: Number(env('SMTP_PORT')),
  auth: {
    user: env('SMTP_USER'),
    pass: env('SMTP_PASSWORD'),
  },
});

const sendMail = async data => {
  const email = {...data , from: env('SMTP_FROM')};
  return await transporter.sendMail(email);
};

export default sendMail;


// const data = {
//   from: env('SMTP_FROM'),
//   to: "dobiyir690@sgatra.com",
//   subject: 'test email',
//   html: "<strong>goga</strong>"
// };

// transporter.sendMail(email)
// .then(() => console.log('sucssesful'))
// .catch(() => console.log('problem'));


