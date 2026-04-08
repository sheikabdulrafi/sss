const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    employeeCode: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Offer Sent', 'Accepted', 'Joined', 'Resigned'], default: 'Offer Sent' },
    personal: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      dob: Date
    },
    job: {
      designation: String,
      department: String,
      dateOfJoining: Date,
      manager: String
    },
    salary: {
      ctc: Number,
      monthlyGross: Number,
      structure: { type: mongoose.Schema.Types.Mixed, default: {} }
    },
    bank: { bankName: String, accountNumber: String, ifsc: String },
    govtIds: { pan: String, aadhaar: String, uan: String },
    documents: [{ type: mongoose.Schema.Types.Mixed }],
    dynamicFields: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

employeeSchema.index({ companyId: 1, employeeCode: 1 }, { unique: true });

module.exports = mongoose.model('Employee', employeeSchema);
