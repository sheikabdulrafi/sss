const Employee = require('../models/Employee');
const PayrollRun = require('../models/PayrollRun');
const Attendance = require('../models/Attendance');

const getDashboard = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.query.companyId : req.companyId;
    const [totalEmployees, latestPayroll, attendanceRows] = await Promise.all([
      Employee.countDocuments({ companyId }),
      PayrollRun.findOne({ companyId }).sort({ createdAt: -1 }),
      Attendance.find({ companyId }).sort({ createdAt: -1 }).limit(100)
    ]);

    const present = attendanceRows.filter((a) => a.status === 'Present').length;
    const attendanceRate = attendanceRows.length ? Math.round((present / attendanceRows.length) * 100) : 0;

    return res.json({
      totalEmployees,
      payrollSummary: latestPayroll?.summary || { totalEmployees: 0, totalGross: 0, totalNet: 0 },
      attendance: { recentRecords: attendanceRows.length, attendanceRate }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getDashboard };
