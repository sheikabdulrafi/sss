const mongoose = require('mongoose');

const payrollRunSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    month: { type: String, required: true },
    processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    entries: { type: [mongoose.Schema.Types.Mixed], default: [] },
    summary: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PayrollRun', payrollRunSchema);
