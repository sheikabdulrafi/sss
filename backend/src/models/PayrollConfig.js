const mongoose = require('mongoose');

const payrollConfigSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, unique: true },
    salaryTemplate: {
      basicPercent: { type: Number, default: 40 },
      hraPercent: { type: Number, default: 20 },
      allowances: { type: [mongoose.Schema.Types.Mixed], default: [] }
    },
    statutoryRules: {
      pfPercent: { type: Number, default: 12 },
      esiPercent: { type: Number, default: 0.75 },
      pt: { type: Number, default: 200 }
    },
    taxSlabs: { type: [mongoose.Schema.Types.Mixed], default: [] },
    customDeductions: { type: [mongoose.Schema.Types.Mixed], default: [] },
    formulas: {
      earnings: { type: mongoose.Schema.Types.Mixed, default: {} },
      deductions: { type: mongoose.Schema.Types.Mixed, default: {} }
    },
    dynamicEmployeeFields: { type: [mongoose.Schema.Types.Mixed], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PayrollConfig', payrollConfigSchema);
