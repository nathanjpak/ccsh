import { emailPassword } from "./dotenvConfig";

const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "onlyforcodingchallenges@gmail.com",
    pass: emailPassword,
  },
});

export const messageOptions = {
  from: "onlyforcodingchallenges@gmail.com",
  to: "coding-challenges+alerts@sprinterhealth.com",
};
