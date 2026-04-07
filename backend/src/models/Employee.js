const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    employeeNumber: { type: String, required: true, unique: true },
    employeeName: { type: String, required: true },
    department: String,
    designation: String,
    joiningDate: Date,
    dateOfBirth: Date,
    gender: String,
    maritalStatus: String,
    employeeStatus: String,
    leftDate: Date,
    fixedGross: Number,
    newFixedGross: Number,
    basic: Number,
    hra: Number,
    specialAllowance: Number,
    email: String,
    mobileNumber: String,
    emergencyContactNumber: String,
    panNumber: String,
    aadharNumber: String,
    pfNumber: String,
    esiNumber: String,
    bankAccountNumber: String,
    ifscCode: String,
    address: String,
    location: String,
    remarks: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
