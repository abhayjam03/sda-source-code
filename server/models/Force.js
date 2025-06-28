const mongoose = require('mongoose');

const forceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Army', 'Navy', 'Air Force', 'Paramilitary', 'Police'], required: true },
  description: String,
  headquarters: String,
  establishedYear: Number,
  strength: Number,
  isActive: { type: Boolean, default: true },
  logo: String,
  images: [String],
  requirements: {
    age: { min: Number, max: Number },
    education: [String],
    physicalStandards: [String],
    medicalStandards: [String]
  }
}, { timestamps: true, collection: 'forces' });

const Force = mongoose.model('Force', forceSchema);

module.exports = Force; 