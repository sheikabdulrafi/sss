const PDFDocument = require('pdfkit');
const Employee = require('../models/Employee');
const { getLetterContent } = require('../templates/letterTemplate');

const generateLetter = async (req, res) => {
  const { employeeId, type, reason } = req.body;
  const employee = await Employee.findById(employeeId);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });

  const { title, body } = getLetterContent({ employee, type, reason });

  const doc = new PDFDocument({ margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${type}-${employee.employeeNumber}.pdf`);

  doc.pipe(res);
  doc.fontSize(16).text('Staffex Staffing Solutions', { align: 'center' });
  doc.moveDown().fontSize(14).text(title, { align: 'center', underline: true });
  doc.moveDown().fontSize(12).text(body, { lineGap: 5 });
  doc.end();
};

module.exports = { generateLetter };
