import nodemailer from 'nodemailer';

/**
 * Robust Email Service for Startup Cafe
 * Forces IPv4 to fix Render's ENETUNREACH issues.
 * Handles timeouts and errors gracefully without blocking the API.
 */
export const sendBookingEmail = async (bookingData) => {
    try {
        const { name, email, phone, plan, duration, date, people, location, message } = bookingData;

        // Skip if credentials are missing
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('⚠️ Skipping email: EMAIL_USER or EMAIL_PASS not set in environment.');
            return false;
        }

        console.log(`📧 Initiating email for: ${name} (${plan})`);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                // Helps prevent handshake failures on some cloud environments
                rejectUnauthorized: false 
            },
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 5000,
            socketTimeout: 10000
        });

        const mailOptions = {
            from: `"Startup Cafe Dashboard" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Sending to admin
            subject: `🚀 New Workspace Booking: ${name}`,
            family: 4, // CRITICAL: Forces IPv4 to fix ENETUNREACH on Render
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h2 style="color: #6366f1; margin: 0; font-size: 24px;">New Booking Alert</h2>
                        <p style="color: #64748b; margin-top: 5px;">Startup Cafe Dashboard</p>
                    </div>
                    
                    <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; color: #64748b;">Customer</td>
                                <td style="padding: 10px 0; color: #1e293b; font-weight: 600; text-align: right;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #64748b;">Phone</td>
                                <td style="padding: 10px 0; color: #1e293b; font-weight: 600; text-align: right;">${phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #64748b;">Plan</td>
                                <td style="padding: 10px 0; color: #ec4899; font-weight: 700; text-align: right;">${plan}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #64748b;">Location</td>
                                <td style="padding: 10px 0; color: #6366f1; font-weight: 700; text-align: right;">${location}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="margin-bottom: 10px;">
                        <p style="color: #64748b; font-size: 14px; margin-bottom: 8px;">Message:</p>
                        <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; color: #475569; font-style: italic;">
                            "${message || 'No additional message.'}"
                        </div>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);
        return true;

    } catch (error) {
        console.error('❌ Email Error:', error.message);
        // Non-blocking, so we just return false
        return false;
    }
};
