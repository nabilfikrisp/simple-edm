const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
});

const html = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");

const mailOptions = {
  from: '"Sender" <sender@example.com>',
  to: "recipient@example.com",
  subject: "Hello from Mailpit!",
  html,
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error("Error sending email:", err);
    process.exit(1);
  }
  console.log("Email sent:", info.messageId);
  console.log("View it at http://localhost:8025");
});
