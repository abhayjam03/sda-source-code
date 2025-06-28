const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Army', 'Navy', 'Air Force', 'Paramilitary', 'Police'], required: true },
  description: String,
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  establishedYear: Number,
  isActive: { type: Boolean, default: true },
  images: [String]
}, { timestamps: true, collection: 'schools' });

const School = mongoose.model('School', schoolSchema);

module.exports = School; 