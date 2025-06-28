const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Army', 'Navy', 'Air Force', 'Paramilitary', 'Police', 'School'], required: true },
  category: { type: String, enum: ['Foundation', 'Intermediate', 'Advanced', 'Specialized'], required: true },
  description: { type: String, required: true },
  duration: {
    months: Number,
    hours: Number
  },
  fee: {
    amount: Number,
    currency: { type: String, default: 'INR' },
    installment: Boolean,
    discount: Number
  },
  examPattern: {
    mode: String,
    duration: Number,
    totalQuestions: Number,
    totalMarks: Number,
    subjects: [{ 
      name: String, 
      questions: Number, 
      marks: Number,
      topics: [String]
    }],
    markingScheme: { correct: Number, incorrect: Number },
    passingMarks: Number,
    negativeMarking: Boolean
  },
  eligibility: {
    education: String,
    age: { min: Number, max: Number },
    physicalRequirements: [String],
    medicalRequirements: [String],
    nationality: [String]
  },
  syllabus: [{
    subject: String,
    topics: [String],
    weightage: Number
  }],
  features: [String],
  highlights: [String],
  careerProspects: [String],
  successRate: Number,
  isActive: { type: Boolean, default: true },
  isPopular: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  images: [String],
  brochure: String,
  lastUpdated: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true, collection: 'courses' });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course; 