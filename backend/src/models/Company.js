const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logoUrl: String,
    address: String,
    industry: String,
    hrPolicies: { type: mongoose.Schema.Types.Mixed, default: {} },
    branding: {
      primaryColor: { type: String, default: '#2563eb' },
      secondaryColor: { type: String, default: '#0f172a' },
      emailTemplates: { type: mongoose.Schema.Types.Mixed, default: {} }
    },
    hrSettings: {
      workingDays: { type: String, default: 'Mon-Fri' },
      shiftStart: { type: String, default: '09:00' },
      shiftEnd: { type: String, default: '18:00' },
      leavePolicy: { type: mongoose.Schema.Types.Mixed, default: {} },
      holidayCalendar: { type: [mongoose.Schema.Types.Mixed], default: [] }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', companySchema);
