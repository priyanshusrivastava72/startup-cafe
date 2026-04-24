import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seatType: { type: String, enum: ['dedicated-desk', 'private-cabin', 'meeting-room'], required: true },
  date: { type: Date, required: true },
  planType: { type: String, enum: ['daily', 'monthly'], required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
