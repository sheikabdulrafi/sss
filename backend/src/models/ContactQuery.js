const mongoose = require('mongoose');

const contactQuerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: String,
    message: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactQuery', contactQuerySchema);
