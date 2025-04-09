import db from "../dbConnection.js";
import dotenv from "dotenv";
import { transporter } from "../middleware.js";

dotenv.config();



export const createCard = async (req, res) => {
  try {
    const { userid, membership_no, name, dob, degree, year } = req.body;
    const imagePath = `req.files?.image ? req.files.image[0].filename : null`;
    
    // Check if user exists and is an alumni
    const userTypeResult = await db.query(
      `SELECT user_type, email FROM users WHERE id2=$1`,
      [userid]
    );

    if (userTypeResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (userTypeResult.rows[0].user_type !== 'alumni') {
      return res.status(403).json({ message: "Only alumni can have alumni cards" });
    }
    
    const email = userTypeResult.rows[0].email;
    
    // Check if user already has an alumni card
    const existingCardResult = await db.query(
      `SELECT * FROM alumcard WHERE userid=$1`,
      [userid]
    );
    
    if (existingCardResult.rows.length > 0) {
      return res.status(400).json({ message: "User already has an alumni card" });
    }
    
    // Insert new alumni card
    const result = await db.query(
      `INSERT INTO alumcard (card_id, userid, membership_no, name, year, degree, dateofbirth, image, created_at, status)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, 'pending')
       RETURNING *`,
      [userid, membership_no, name, year, degree, dob, imagePath]
    );
    
    // Send email to user
    const userEmailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Alumni Card Application Received</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #0056b3;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666;
          }
          .button {
            display: inline-block;
            background-color: #0056b3;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 15px;
          }
          @media only screen and (max-width: 600px) {
            .container {
              width: 100%;
            }
            .header, .content, .footer {
              padding: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Alumni Card Application Received</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Thank you for applying for your Alumni Card. Your application has been received and is currently under review.</p>
            <p><strong>Application Details:</strong></p>
            <ul>
              <li>Membership Number: ${membership_no}</li>
              <li>Name: ${name}</li>
              <li>Graduation Year: ${year}</li>
              <li>Degree: ${degree}</li>
              <li>Status: Pending</li>
            </ul>
            <p>We will notify you once your application has been approved.</p>
            <p>If you have any questions, please contact our alumni office.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Alumni Association. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Send email to admin
    const adminEmail = process.env.admin_email; // Make sure this is set in your .env file
    const adminEmailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Alumni Card Application</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #004d99;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666;
          }
          .button {
            display: inline-block;
            background-color: #004d99;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 15px;
          }
          .action-buttons {
            margin-top: 20px;
            text-align: center;
          }
          .approve {
            background-color: #28a745;
          }
          .deny {
            background-color: #dc3545;
          }
          @media only screen and (max-width: 600px) {
            .container {
              width: 100%;
            }
            .header, .content, .footer {
              padding: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Alumni Card Application</h1>
          </div>
          <div class="content">
            <h2>New Application Details:</h2>
            <p>A new alumni card application has been submitted and requires your review.</p>
            <ul>
              <li><strong>Card ID:</strong> ${result.rows[0].card_id}</li>
              <li><strong>User ID:</strong> ${userid}</li>
              <li><strong>Membership Number:</strong> ${membership_no}</li>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Graduation Year:</strong> ${year}</li>
              <li><strong>Degree:</strong> ${degree}</li>
              <li><strong>Date of Birth:</strong> ${new Date(dob).toLocaleDateString()}</li>
              <li><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</li>
            </ul>
            
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Alumni Association Admin Portal</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Send emails
    try {
      // Send email to user
      await transporter.sendMail({
        from: `"Alumni Association" <${process.env.sender_email}>`,
        to: email,
        subject: "Alumni Card Application Received",
        html: userEmailTemplate
      });
      
      // Send email to admin
      await transporter.sendMail({
        from: `"Alumni Association" <${process.env.sender_email}>`,
        to: adminEmail,
        subject: "New Alumni Card Application",
        html: adminEmailTemplate
      });
      
      console.log("Notification emails sent successfully");
    } catch (emailError) {
      console.error("Error sending notification emails:", emailError);
      // Continue with the response even if email fails
    }
    
    res.status(201).json({
      success: true,
      message: "Alumni card created successfully",
      card: result.rows[0]
    });
    
  } catch (error) {
    console.error("Error creating alumni card:", error);
    res.status(500).json({
      success: false,
      message: "Error creating alumni card",
      error: error.message
    });
  }
};

export const getCardById = async (req, res) => {
    try {
      const { cardId } = req.params;
      
      const result = await db.query(
        `SELECT * FROM alumcard WHERE card_id=$1`,
        [cardId]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Alumni card not found" });
      }
      
      res.status(200).json({
        success: true,
        card: result.rows[0]
      });
      
    } catch (error) {
      console.error("Error fetching alumni card:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching alumni card",
        error: error.message
      });
    }
  };

export const getUserCard = async (req, res) => {
  try {
    const { userid } = req.params;
    
    const result = await db.query(
      `SELECT * FROM alumcard WHERE userid=$1 and card_status='approved'`,
      [userid]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Alumni card not found for this user" });
    }
    
    res.status(200).json({
      success: true,
      card: result.rows[0]
    });
    
  } catch (error) {
    console.error("Error fetching user's alumni card:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user's alumni card",
      error: error.message
    });
  }
};

export const deleteCard = async (req, res) => {
    try {
      const { cardId } = req.params;
      
      // Check if card exists
      const cardResult = await db.query(
        `SELECT * FROM alumcard WHERE card_id=$1`,
        [cardId]
      );
      
      if (cardResult.rows.length === 0) {
        return res.status(404).json({ message: "Alumni card not found" });
      }
      
      // Delete the card
      await db.query(
        `DELETE FROM alumcard WHERE card_id=$1`,
        [cardId]
      );
      
      res.status(200).json({
        success: true,
        message: "Alumni card deleted successfully"
      });
      
    } catch (error) {
      console.error("Error deleting alumni card:", error);
      res.status(500).json({
        success: false,
        message: "Error deleting alumni card",
        error: error.message
      });
    }
  };
