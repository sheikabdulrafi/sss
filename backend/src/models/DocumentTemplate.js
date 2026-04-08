const mongoose = require('mongoose');

const documentTemplateSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    type: { type: String, enum: ['Offer Letter', 'Appointment Letter', 'Payslip', 'Experience Letter', 'Relieving Letter'], required: true },
    title: String,
    body: String
  },
  { timestamps: true }
);

documentTemplateSchema.index({ companyId: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('DocumentTemplate', documentTemplateSchema);
