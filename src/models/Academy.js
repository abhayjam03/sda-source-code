import mongoose from 'mongoose';

const academySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  specialConcessions: [{
    type: String
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Academy = mongoose.models.Academy || mongoose.model('Academy', academySchema);

export default Academy; 