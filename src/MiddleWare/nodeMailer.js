import nodemailer from 'nodemailer';

// Middleware to send email using nodemailer
const sendEmailMiddleware = (req, res, next) => {
    // Assuming you have req.body.email from your Express request
    const senderEmail = req.body.email;
  
    // Creating a transporter using your email service's SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'codingninjas2k16@gmail.com',
        pass: 'slwvvlczduktvhdj',
      },
    });
  
    // Email content
    const mailOptions = {
      from: 'codingninjas2k16@gmail.com',
      to: senderEmail,
      subject: 'Test Email',
      text: `Hello ${req.body.name}, this is an auto generated confirmation mail from "EASILY". We have received you Resume!`,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Email sent:', info.response);
        // Optionally, you can attach the info object to the request for further processing in downstream middleware/routes
        req.emailInfo = info;
        next(); // Continue to the next middleware/route
      }
    });
  };
  

export default sendEmailMiddleware;
