import mongoose from 'mongoose';

const academySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: String,
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  facilities: [String],
  capacity: Number,
  establishedYear: Number,
  isActive: { type: Boolean, default: true },
  images: [String],
  rating: { type: Number, min: 0, max: 5, default: 0 }
}, { timestamps: true, collection: 'academies' });

const Academy = mongoose.models.Academy || mongoose.model('Academy', academySchema);

export default Academy; 