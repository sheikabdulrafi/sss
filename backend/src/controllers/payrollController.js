const ExcelJS = require('exceljs');
const PayrollRun = require('../models/PayrollRun');
const Employee = require('../models/Employee');
const PayrollConfig = require('../models/PayrollConfig');

const runPayroll = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.body.companyId : req.companyId;
    const { month } = req.body;
    const config = await PayrollConfig.findOne({ companyId });
    const employees = await Employee.find({ companyId, status: { $in: ['Accepted', 'Joined'] } });

    const entries = employees.map((employee) => {
      const gross = employee.salary?.monthlyGross || 0;
      const basic = (gross * (config?.salaryTemplate?.basicPercent || 40)) / 100;
      const hra = (gross * (config?.salaryTemplate?.hraPercent || 20)) / 100;
      const allowance = Math.max(gross - basic - hra, 0);
      const pf = (basic * (config?.statutoryRules?.pfPercent || 12)) / 100;
      const esi = (gross * (config?.statutoryRules?.esiPercent || 0.75)) / 100;
      const pt = config?.statutoryRules?.pt || 200;
      const lop = employee.dynamicFields?.lopDays ? (gross / 30) * employee.dynamicFields.lopDays : 0;
      const deductions = pf + esi + pt + lop;
      const netPay = gross - deductions;

      return {
        employeeId: employee._id,
        employeeCode: employee.employeeCode,
        employeeName: `${employee.personal?.firstName || ''} ${employee.personal?.lastName || ''}`.trim(),
        month,
        earnings: { basic, hra, allowance, gross },
        deductions: { pf, esi, pt, lop, total: deductions },
        netPay
      };
    });

    const summary = {
      totalEmployees: entries.length,
      totalGross: entries.reduce((a, b) => a + b.earnings.gross, 0),
      totalNet: entries.reduce((a, b) => a + b.netPay, 0)
    };

    const run = await PayrollRun.create({ companyId, month, entries, summary, processedBy: req.user._id });
    return res.status(201).json(run);
  } catch (error) {
    return next(error);
  }
};

const getPayrollRuns = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.query.companyId : req.companyId;
    const rows = await PayrollRun.find({ companyId }).sort({ createdAt: -1 });
    return res.json(rows);
  } catch (error) {
    return next(error);
  }
};

const exportPayrollExcel = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.query.companyId : req.companyId;
    const run = await PayrollRun.findOne({ _id: req.params.id, companyId });
    if (!run) return res.status(404).json({ message: 'Payroll run not found' });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Payroll');
    sheet.columns = [
      { header: 'Employee Code', key: 'employeeCode', width: 15 },
      { header: 'Employee Name', key: 'employeeName', width: 25 },
      { header: 'Gross', key: 'gross', width: 12 },
      { header: 'Deductions', key: 'deductions', width: 12 },
      { header: 'Net Pay', key: 'netPay', width: 12 }
    ];

    run.entries.forEach((entry) => {
      sheet.addRow({
        employeeCode: entry.employeeCode,
        employeeName: entry.employeeName,
        gross: entry.earnings.gross,
        deductions: entry.deductions.total,
        netPay: entry.netPay
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=payroll-${run.month}.xlsx`);
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    return next(error);
  }
};

module.exports = { runPayroll, getPayrollRuns, exportPayrollExcel };
