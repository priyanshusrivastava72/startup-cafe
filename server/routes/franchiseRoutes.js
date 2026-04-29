import express from 'express';
import Franchise from '../models/Franchise.js';
import twilio from 'twilio';
import nodemailer from 'nodemailer';

const router = express.Router();

// Initialize Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


// POST /api/franchise
router.post('/', async (req, res) => {
  try {
    console.log('📬 Incoming Franchise Inquiry:', req.body);
    const { fullName, email, phone, city, budget, message } = req.body;

    // 1. Save to MongoDB
    const newInquiry = new Franchise({
      fullName,
      email,
      phone,
      city,
      budget,
      message
    });

    await newInquiry.save();
    console.log('✅ Franchise Inquiry saved to DB');

    // 2. Send WhatsApp Notification (Non-blocking)
    try {
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        const whatsappMessage = `
🤝 *New Franchise Inquiry!*

👤 *Name:* ${fullName}
📧 *Email:* ${email}
📞 *Phone:* ${phone}
📍 *City:* ${city}
💰 *Budget:* ${budget}
📝 *Message:* ${message || 'N/A'}
        `.trim();

        await client.messages.create({
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
          to: `whatsapp:${process.env.YOUR_WHATSAPP_NUMBER}`,
          body: whatsappMessage
        });
        console.log('📲 WhatsApp notification sent');
      }
    } catch (waError) {
      console.error('⚠️ WhatsApp error:', waError.message);
    }

    // 3. Send Email Notification (Non-blocking)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER, // Admin Email
          subject: `Franchise Application: ${fullName} (${city})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
              <div style="text-align: center; padding-bottom: 20px;">
                <h2 style="color: #4f46e5; margin: 0;">New Franchise Application</h2>
                <p style="color: #6b7280; margin-top: 5px;">A potential partner has submitted an inquiry.</p>
              </div>
              
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #f3f4f6;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #374151;"><strong>Full Name:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #374151;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #374151;"><strong>Phone:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #374151;"><strong>City:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">${city}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #374151;"><strong>Budget:</strong></td>
                    <td style="padding: 8px 0; color: #ec4899; font-weight: bold;">${budget}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-top: 20px; padding: 15px; background-color: #fdf2f8; border-radius: 8px; border-left: 4px solid #ec4899;">
                <p style="margin: 0; color: #9d174d;"><strong>Message/Vision:</strong></p>
                <p style="margin-top: 5px; color: #be185d;">${message || 'No specific requirements mentioned.'}</p>
              </div>

              <div style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 30px;">
                © Startup Cafe Franchise Portal
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('📧 Admin email sent successfully');
      }
    } catch (emailError) {
      console.error('📧 Email error:', emailError.message);
    }

    res.status(200).json({ success: true, message: "Inquiry submitted successfully" });

  } catch (err) {
    console.error('❌ Franchise inquiry error:', err);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
});

export default router;
