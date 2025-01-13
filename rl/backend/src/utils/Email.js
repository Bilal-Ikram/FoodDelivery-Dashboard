// utils/Email.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    console.log("Creating email..."); // Log email creation
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    console.log("Sending email..."); // Log email sending
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response); // Log email response
    return info;
  } catch (error) {
    console.error("Error sending email:", error); // Log email error
    throw error;
  }
};

export default sendEmail;