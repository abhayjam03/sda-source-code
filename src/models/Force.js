import mongoose from 'mongoose';

const forceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Paramilitary', 'Police', 'Army'],
    required: true
  },
  established: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  responsibilities: [{
    type: String
  }],
  examPattern: {
    mode: String,
    duration: Number,
    totalQuestions: Number,
    totalMarks: Number,
    subjects: [{
      name: String,
      questions: Number
    }],
    markingScheme: {
      correct: Number,
      incorrect: Number
    }
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
  timestamps: true
});

const Force = mongoose.models.Force || mongoose.model('Force', forceSchema);

export default Force; 