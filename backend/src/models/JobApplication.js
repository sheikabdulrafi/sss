const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    position: String,
    experience: String,
    message: String,
    resumePath: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
