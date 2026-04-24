import express from 'express';
import Booking from '../models/Booking.js';
import twilio from 'twilio';
import nodemailer from 'nodemailer';

const router = express.Router();

// Initialize Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Initialize Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST /api/book
router.post('/', async (req, res) => {
  try {
    console.log('📥 Incoming booking:', req.body);
    const { name, email, phone, plan, duration, date, people, message } = req.body;

    // 1. Save to MongoDB
    const newBooking = new Booking({
      name,
      email,
      phone,
      plan,
      duration,
      date,
      people: Number(people),
      message
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
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER, // Admin Email
          subject: `New Coworking Booking: ${plan}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
              <h2 style="color: #6366f1; text-align: center; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Booking Alert</h2>
              <p>You have received a new booking from <strong>Startup Cafe Gorakhpur</strong>.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #e0e0e0;"><strong>Full Name</strong></td>
                  <td style="padding: 10px; border: 1px solid #e0e0e0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e0e0e0;"><strong>Email</strong></td>
                  <td style="padding: 10px; border: 1px solid #e0e0e0;">${email}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #e0e0e0;"><strong>Phone</strong></td>
                  <td style="padding: 10px; border: 1px solid #e0e0e0;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e0e0e0;"><strong>Plan Type</strong></td>
                  <td style="padding: 10px; border: 1px solid #e0e0e0; color: #ec4899; font-weight: bold;">${plan}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #e0e0e0;"><strong>Duration</strong></td>
                  <td style="padding: 10px; border: 1px solid #e0e0e0;">${duration}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e0e0e0;"><strong>Start Date</strong></td>
                  <td style="padding: 10px; border: 1px solid #e0e0e0;">${date}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #e0e0e0;"><strong>People</strong></td>
                  <td style="padding: 10px; border: 1px solid #e0e0e0;">${people}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e0e0e0;"><strong>Message</strong></td>
                  <td style="padding: 10px; border: 1px solid #e0e0e0;">${message || 'No additional message'}</td>
                </tr>
              </table>
              <div style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
                Sent from Startup Cafe Backend
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('📧 Email sent successfully');
      } else {
        console.log('⚠️ Email credentials missing, skipping email');
      }
    } catch (emailError) {
      console.error('📧 Email error (non-blocking):', emailError.message);
    }

    // 4. Return Success
    res.status(200).json({ message: "Booking successful" });

  } catch (err) {
    console.error('❌ Booking error:', err);
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: err.message 
    });
  }
});

export default router;
