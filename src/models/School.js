import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Military School', 'Sainik School'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  examPatterns: [{
    class: {
      type: Number,
      required: true
    },
    mode: String,
    duration: Number,
    totalQuestions: Number,
    totalMarks: Number,
    subjects: [{
      name: String,
      questions: Number,
      marks: Number
    }],
    markingScheme: {
      correct: Number,
      incorrect: Number
    }
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
  timestamps: true,
  collection: 'schools'
});

const School = mongoose.models.School || mongoose.model('School', schoolSchema);

export default School; 