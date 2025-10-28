import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ✅ Existing function for admin alert
export const sendBookingEmail = async (bookingData: any) => {
  const { vehicleDetails, customer, rental, vehicleType } = bookingData;

  const mailOptions = {
    from: `EasyDrivez <sandeepnayak1017@gmail.com>`, // ✅ Use verified sender
    to: process.env.ADMIN_EMAIL,
    subject: `🚗 New ${vehicleType.toUpperCase()} Booking - ${vehicleDetails.brand} ${vehicleDetails.model}`,
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 20px;">
      <div style="max-width: 600px; background: white; margin: auto; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(90deg, #007bff, #00c4ff); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px;">New Booking Received</h1>
        </div>


        <!-- Booking Details -->
        <div style="padding: 10px; color: #333;">
          <h2 style="margin-bottom: 10px; color: #007bff;">Booking Summary</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Customer Name:</td>
              <td>${customer.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Customer Email:</td>
              <td>${customer.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Customer Phone:</td>
              <td>${customer.mobile}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Vehicle:</td>
              <td>${vehicleDetails.brand} ${vehicleDetails.model}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Type:</td>
              <td>${vehicleType.toUpperCase()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Pickup:</td>
              <td>${rental.pickupDate} at ${rental.pickupTime}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Return:</td>
              <td>${rental.dropoffDate} at ${rental.dropoffTime}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Total Price:</td>
              <td style="color: green; font-weight: bold;">${rental.totalPrice}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; text-align: center;">
            <a href="https://easydrivez.com/admin/bookings"
              style="background: #007bff; color: white; padding: 10px 18px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
              View Booking
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f0f3f5; text-align: center; padding: 15px; font-size: 12px; color: #555;">
          <p style="margin: 0;">You are receiving this email because you are an EasyDrivez admin.</p>
          <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} EasyDrivez | <a href="https://easydrivez.com" style="color: #007bff; text-decoration: none;">Visit Dashboard</a></p>
        </div>
      </div>
    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Beautiful admin email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};


// ✅ NEW: Send approval email
export const sendBookingApprovalEmail = async (booking: any) => {
  const mailOptions = {
    from: `eazydrivez<sandeepnayak1017@gmail.com>`,
    to: booking.customer.email,
    subject: `✅ Your ${booking.vehicleDetails.brand} ${booking.vehicleDetails.model} booking is Approved!`,
    html: `
      <h2 style="color: green;">Booking Approved</h2>
      <p>Dear ${booking.customer.name},</p>
      <p>Your booking for <b>${booking.vehicleDetails.brand} ${booking.vehicleDetails.model}</b> has been <b>approved</b> 🎉.</p>
      <p><b>Pickup:</b> ${booking.rental.pickupDate} at ${booking.rental.pickupTime}</p>
      <p><b>Dropoff:</b> ${booking.rental.dropoffDate} at ${booking.rental.dropoffTime}</p>
      <p><b>Total Price:</b> ${booking.rental.totalPrice}</p>
      <p>Thank you for choosing EasyDrivez 🚗</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// ✅ NEW: Send rejection email
export const sendBookingRejectionEmail = async (booking: any) => {
  const mailOptions = {
    from: `eazydrivez<sandeepnayak1017@gmail.com>`,
    to: booking.customer.email,
    subject: `❌ Your ${booking.vehicleDetails.brand} ${booking.vehicleDetails.model} booking was Rejected`,
    html: `
      <h2 style="color: red;">Booking Rejected</h2>
      <p>Dear ${booking.customer.name},</p>
      <p>Unfortunately, your booking for <b>${booking.vehicleDetails.brand} ${booking.vehicleDetails.model}</b> has been <b>rejected</b>.</p>
      <p>You may contact our support for more details.</p>
      <p>Thank you for understanding.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
