const PDFDocument = require('pdfkit');
const Company = require('../models/Company');
const Employee = require('../models/Employee');
const PayrollRun = require('../models/PayrollRun');
const DocumentTemplate = require('../models/DocumentTemplate');

const renderWithPlaceholders = (template, data) => {
  let output = template || '';
  Object.entries(data).forEach(([key, value]) => {
    output = output.replaceAll(`{{${key}}}`, value ?? '');
  });
  return output;
};

const saveTemplate = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.body.companyId : req.companyId;
    const doc = await DocumentTemplate.findOneAndUpdate(
      { companyId, type: req.body.type },
      { ...req.body, companyId },
      { new: true, upsert: true }
    );
    return res.json(doc);
  } catch (error) {
    return next(error);
  }
};

const generateEmployeeDocument = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.query.companyId : req.companyId;
    const { employeeId, type } = req.params;
    const company = await Company.findById(companyId);
    const employee = await Employee.findOne({ _id: employeeId, companyId });
    const template = await DocumentTemplate.findOne({ companyId, type });

    if (!employee || !template) {
      return res.status(404).json({ message: 'Employee/template not found' });
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${type}-${employee.employeeCode}.pdf`);
    doc.pipe(res);

    doc.fontSize(18).text(company.name || 'Company', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(renderWithPlaceholders(template.body, {
      employeeName: `${employee.personal?.firstName || ''} ${employee.personal?.lastName || ''}`.trim(),
      companyName: company.name,
      designation: employee.job?.designation,
      dateOfJoining: employee.job?.dateOfJoining ? new Date(employee.job.dateOfJoining).toDateString() : ''
    }));
    doc.end();
  } catch (error) {
    return next(error);
  }
};

const generatePayslip = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.query.companyId : req.companyId;
    const run = await PayrollRun.findOne({ _id: req.params.runId, companyId });
    const entry = run?.entries.find((row) => String(row.employeeId) === req.params.employeeId);
    if (!run || !entry) return res.status(404).json({ message: 'Payroll entry not found' });

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=payslip-${entry.employeeCode}-${run.month}.pdf`);
    doc.pipe(res);

    doc.fontSize(18).text(`Payslip - ${run.month}`);
    doc.moveDown();
    doc.fontSize(12).text(`Employee: ${entry.employeeName}`);
    doc.text(`Gross: ${entry.earnings.gross}`);
    doc.text(`Deductions: ${entry.deductions.total}`);
    doc.text(`Net Pay: ${entry.netPay}`);
    doc.end();
  } catch (error) {
    return next(error);
  }
};

module.exports = { saveTemplate, generateEmployeeDocument, generatePayslip };
