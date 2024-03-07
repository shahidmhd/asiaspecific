const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  vecancy: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  workingday: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  Skills: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  selectedSkills: {
    type: [String],
    required: true
  },
  selectedEducations: {
    type: [String],
    required: true
  }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
