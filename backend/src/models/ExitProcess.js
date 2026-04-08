const mongoose = require('mongoose');

const exitProcessSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    resignationDate: String,
    lastWorkingDate: String,
    noticePeriodDays: Number,
    settlement: {
      pendingSalary: Number,
      leaveEncashment: Number,
      deductions: Number,
      netSettlement: Number
    },
    status: { type: String, enum: ['Initiated', 'In Notice', 'Settled'], default: 'Initiated' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ExitProcess', exitProcessSchema);
