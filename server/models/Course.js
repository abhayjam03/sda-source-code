const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Army', 'Paramilitary', 'Police', 'School'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  examPattern: {
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
    },
    passingMarks: Number
  },
  eligibility: {
    education: String,
    age: {
      min: Number,
      max: Number
    },
    physicalRequirements: [String]
  },
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
  collection: 'courses'
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course; 