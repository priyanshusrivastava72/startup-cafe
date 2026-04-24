import mongoose from 'mongoose';

const franchiseSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  status: {
    type: String,
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Franchise = mongoose.model('Franchise', franchiseSchema);
export default Franchise;
