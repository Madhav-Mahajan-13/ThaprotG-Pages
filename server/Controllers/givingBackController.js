import db from "../dbConnection.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: process.env.sender_email,
        pass: process.env.sender_pass,
    },
});

export const email_notification = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, date, reason } = req.body;
    console.log(req.body);
    
    if (!name || !email || !date || !reason) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, date, and reason are required"
      });
    }
    
    // Format date for display
    const formattedDate = new Date(date).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Send email with responsive HTML template
    const info = await transporter.sendMail({
      from: process.env.sender_email, // Match the case in your .env file
      to: email,
      subject: "Visit Confirmation",
      text: `Hello ${name}, this is a confirmation that you have scheduled a visit to our institute on ${formattedDate}. Reason for visit: ${reason}.`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Visit Confirmation</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
            }
            .header {
              background-color: #4a6fdc;
              padding: 20px;
              text-align: center;
              color: white;
              border-radius: 5px 5px 0 0;
            }
            .content {
              padding: 30px;
              line-height: 1.6;
            }
            .footer {
              background-color: #f5f5f5;
              padding: 15px;
              text-align: center;
              font-size: 14px;
              color: #666;
              border-radius: 0 0 5px 5px;
            }
            .highlight {
              background-color: #f0f7ff;
              padding: 15px;
              border-left: 4px solid #4a6fdc;
              margin: 20px 0;
              border-radius: 0 5px 5px 0;
            }
            @media only screen and (max-width: 600px) {
              .container {
                width: 100%;
                padding: 10px;
              }
              .content {
                padding: 15px;
              }
            }
            .button {
              display: inline-block;
              background-color: #4a6fdc;
              color: white;
              text-decoration: none;
              padding: 12px 25px;
              border-radius: 5px;
              margin: 15px 0;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Visit Confirmation</h1>
            </div>
            <div class="content">
              <p>Hello <strong>${name}</strong>,</p>
              <p>Your visit to our institute has been successfully scheduled.</p>
              
              <div class="highlight">
                <p><strong>Date and Time:</strong> ${formattedDate}</p>
                <p><strong>Reason for Visit:</strong> ${reason}</p>
              </div>
              
              <p>Please arrive 10 minutes before your scheduled time and bring any necessary identification.</p>
              
              
              
              <p>If you need to reschedule or cancel your visit, please contact us at least 24 hours in advance.</p>
              
              <p>We look forward to seeing you!</p>
              
              <p>Best regards,<br>Institute Administration</p>
            </div>
            <div class="footer">
              <p>© 2025 Our Institute. All rights reserved.</p>
              <p>This is an automated message, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    // Log email sent confirmation
    console.log("Email sent successfully:", info.messageId);
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: "Visit confirmation email sent successfully"
    });
    
  } catch (error) {
    console.error("Error sending email:", error);
    
    // Return appropriate error response
    return res.status(500).json({
      success: false,
      message: "Failed to send confirmation email",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};