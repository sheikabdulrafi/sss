const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'Leave'], default: 'Present' },
    inTime: String,
    outTime: String
  },
  { timestamps: true }
);

attendanceSchema.index({ companyId: 1, employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
