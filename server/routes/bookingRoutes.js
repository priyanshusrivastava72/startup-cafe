import express from 'express';
import Booking from '../models/Booking.js';
import twilio from 'twilio';
import nodemailer from 'nodemailer';

const router = express.Router();

// Initialize Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


// POST /api/book
router.post('/', async (req, res) => {
  try {
    console.log('📥 Incoming booking:', req.body);
    const { name, email, phone, plan, duration, date, people, location, message } = req.body;

    // 1. Save to MongoDB
    const newBooking = new Booking({
      name,
      email,
      phone,
      plan,
      duration,
      date,
      people: Number(people),
      location: location,
      message: message
    });

    await newBooking.save();
    console.log('✅ Booking saved successfully');

    // 2. Send WhatsApp Notification (Non-blocking)
    try {
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        const whatsappMessage = `
📌 *New Booking Received!*

👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone}
📍 *Location:* ${location}
📦 *Plan:* ${plan}
⏳ *Duration:* ${duration}
📅 *Date:* ${date}
👥 *People:* ${people}
📝 *Message:* ${message || 'N/A'}
        `.trim();

        await client.messages.create({
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
          to: `whatsapp:${process.env.YOUR_WHATSAPP_NUMBER}`,
          body: whatsappMessage
        });

        console.log('📲 WhatsApp notification sent');
      } else {
        console.log('⚠️ Twilio credentials missing, skipping WhatsApp');
      }
    } catch (waError) {
      console.error('⚠️ WhatsApp error (non-blocking):', waError.message);
    }

    // 3. Send Email Notification (Non-blocking)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // Use SSL
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
          tls: {
            // Fix for some hosting providers
            rejectUnauthorized: false
          }
        });

        const mailOptions = {
          from: `"Startup Cafe Booking" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER, // Admin Email
          subject: `🚀 New Coworking Booking: ${plan}`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 25px;">
                <h2 style="color: #6366f1; margin: 0; font-size: 24px; letter-spacing: -0.5px;">New Booking Alert</h2>
                <p style="color: #64748b; margin-top: 5px;">Startup Cafe Gorakhpur</p>
              </div>
              
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Customer Name</td>
                    <td style="padding: 10px 0; color: #1e293b; font-weight: 600; text-align: right;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Email Address</td>
                    <td style="padding: 10px 0; color: #1e293b; font-weight: 600; text-align: right;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Phone Number</td>
                    <td style="padding: 10px 0; color: #1e293b; font-weight: 600; text-align: right;">${phone}</td>
                  </tr>
                  <tr><td colspan="2" style="border-top: 1px solid #e2e8f0; padding: 10px 0;"></td></tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Plan Selected</td>
                    <td style="padding: 10px 0; color: #ec4899; font-weight: 700; text-align: right;">${plan}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Duration</td>
                    <td style="padding: 10px 0; color: #1e293b; font-weight: 600; text-align: right;">${duration}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Start Date</td>
                    <td style="padding: 10px 0; color: #1e293b; font-weight: 600; text-align: right;">${date}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Location</td>
                    <td style="padding: 10px 0; color: #6366f1; font-weight: 700; text-align: right;">${location}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-bottom: 25px;">
                <p style="color: #64748b; font-size: 14px; margin-bottom: 8px;">Customer Message:</p>
                <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; color: #475569; font-style: italic;">
                  "${message || 'No additional message provided.'}"
                </div>
              </div>

              <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; color: #94a3b8; font-size: 12px;">
                This is an automated notification from Startup Cafe Dashboard.
              </div>
            </div>
          `
        };

        // Important: Force IPv4 (family: 4) to avoid ENETUNREACH on Render
        await transporter.sendMail({ ...mailOptions, family: 4 });
        console.log('📧 Email sent successfully to:', process.env.EMAIL_USER);
      } else {
        console.warn('⚠️ Email credentials missing in process.env. Skipping email sending.');
      }
    } catch (emailError) {
      console.error('📧 Email Error Details:', {
        message: emailError.message,
        code: emailError.code,
        stack: emailError.stack
      });
    }

    // 4. Return Success
    res.status(200).json({ message: "Booking successful" });

  } catch (err) {
    console.error('❌ Mongoose Validation/Save Error:', err.errors || err);
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: err.message,
      details: err.errors ? Object.keys(err.errors).map(key => err.errors[key].message) : []
    });
  }
});

export default router;
